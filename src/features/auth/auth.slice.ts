import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ArgLoginType, ArgRegisterType, authApi, ProfileType } from 'features/auth/auth.api'

const register = createAsyncThunk(
	// 1 - prefix
	'auth/register',
	// 2 - callback (условно наша старая санка), в которую:
	// - первым параметром (arg) мы передаем аргументы необходимые для санки
	// (если параметров больше чем один упаковываем их в объект)
	// - вторым параметром thunkAPI, обратившись к которому получим dispatch и др. свойства
	// https://redux-toolkit.js.org/usage/usage-with-typescript#typing-the-thunkapi-object
	async (arg: ArgRegisterType, thunkAPI) => {
		const res = await authApi.register(arg)
		if (res.status === 200) {
			thunkAPI.dispatch(setIsLoggedIn({ isLoggedIn: true }))
		}
	}
)

const login = createAsyncThunk<{ profile: ProfileType }, ArgLoginType>('auth/login', async (arg, thunkAPI) => {
	const res = await authApi.login(arg)
	if (res.status === 200) {
		thunkAPI.dispatch(setIsLoggedIn({ isLoggedIn: true }))
	}
	return { profile: res.data }
})

const slice = createSlice({
	name: 'auth',
	initialState: {
		profile: null as ProfileType | null,
		isLoggedIn: false
	},
	reducers: {
		setIsLoggedIn: (state, action: any) => {
			state.isLoggedIn = action.payload.isLoggedIn
		}
	},
	extraReducers: builder => {
		builder.addCase(login.fulfilled, (state, action) => {
			state.profile = action.payload.profile
		})
	}
})

export const authReducer = slice.reducer

export const setIsLoggedIn: any = slice.actions.setIsLoggedIn
// Санки давайте упакуем в объект, нам это пригодится в дальнейшем
export const authThunks = { register, login }
