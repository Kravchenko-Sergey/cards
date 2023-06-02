import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { createAppAsyncThunk } from 'common/utils/create-app-async-thunk'
import { authApi } from './auth.api'
import { ArgLoginType, ArgRegisterType, ProfileType } from './auth.api.types'

const register = createAppAsyncThunk('auth/register', async (arg: ArgRegisterType, thunkAPI) => {
	const res = await authApi.register(arg)
	if (res.status === 201) {
		thunkAPI.dispatch(authActions.setIsRegisteredIn({ isRegisteredIn: true }))
	}
})

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

export const changeUserName = createAppAsyncThunk('auth/changeName', async (arg: { name: string }, thunkAPI) => {
	const res = await authApi.updateProfile(arg)
	if (res.status === 200) {
		thunkAPI.dispatch(authActions.setChangeName({ name: res.data.updatedUser.name }))
	}
})

export const forgotPassword = createAppAsyncThunk(
	'auth/forgotPassword',
	async (arg: { email: string; message: string }, thunkAPI) => {
		const res = await authApi.forgotPassword(arg)
	}
)

export const setNewPassword = createAppAsyncThunk('auth/setNewPassword', async (arg, thunkAPI) => {
	const res = await authApi.setNewPassword(arg)
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
export const authThunks: any = { register, login, logout, changeUserName, forgotPassword, setNewPassword }
