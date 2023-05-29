import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ArgLoginType, ArgRegisterType, authApi, ProfileType } from 'features/auth/auth.api'
import { createAppAsyncThunk } from 'common/utils/create-app-async-thunk'

const register = createAppAsyncThunk(
	// 1 - prefix
	'auth/register',
	// 2 - callback (условно наша старая санка), в которую:
	// - первым параметром (arg) мы передаем аргументы необходимые для санки
	// (если параметров больше чем один упаковываем их в объект)
	// - вторым параметром thunkAPI, обратившись к которому получим dispatch и др. свойства
	// https://redux-toolkit.js.org/usage/usage-with-typescript#typing-the-thunkapi-object
	async (arg: ArgRegisterType, thunkAPI) => {
		const res = await authApi.register(arg)
		if (res.status === 201) {
			thunkAPI.dispatch(authActions.setIsRegisteredIn({ isRegisteredIn: true }))
		}
	}
)

const login = createAppAsyncThunk<{ profile: ProfileType }, ArgLoginType>('auth/login', async (arg, thunkAPI) => {
	const res = await authApi.login(arg)
	if (res.status === 200) {
		thunkAPI.dispatch(authActions.setIsLoggedIn({ isLoggedIn: true }))
	}
	return { profile: res.data }
})

export const logout = createAppAsyncThunk('auth/logout', async (arg, thunkAPI) => {
	const res = await authApi.logout()
	if (res.status === 200) {
		thunkAPI.dispatch(authActions.setIsLoggedIn({ isLoggedIn: false }))
	}
})

export const changeName = createAppAsyncThunk('auth/changeName', async (arg, thunkAPI) => {
	const res = await authApi.changeName(arg)
	console.log(arg)
	if (res.status === 200) {
		thunkAPI.dispatch(authActions.setChangeName({ name: res.data.updatedUser.name }))
	}
})

const slice = createSlice({
	name: 'auth',
	initialState: {
		profile: null as ProfileType | null,
		isLoggedIn: false,
		isRegisteredIn: false
	},
	reducers: {
		setIsLoggedIn: (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
			state.isLoggedIn = action.payload.isLoggedIn
		},
		setIsRegisteredIn: (state, action: PayloadAction<{ isRegisteredIn: boolean }>) => {
			state.isRegisteredIn = action.payload.isRegisteredIn
		},
		setChangeName: (state, action: PayloadAction<any>) => {
			state!.profile!.name = action.payload.name
		}
	},
	extraReducers: builder => {
		builder.addCase(login.fulfilled, (state, action) => {
			state.profile = action.payload.profile
		})
	}
})

export const authReducer = slice.reducer
export const authActions = slice.actions
export const authThunks = { register, login, logout, changeName }
