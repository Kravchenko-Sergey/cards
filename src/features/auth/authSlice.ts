import { createSlice } from '@reduxjs/toolkit'
import { createAppAsyncThunk } from 'common/utils/createAppAsyncThunk'
import { authAPI } from 'features/auth/authAPI'
import {
	ArgForgotPasswordType,
	ArgLoginType,
	ArgRegisterType,
	ArgSetNewPassword,
	ArgsUpdateProfile,
	UserProfileResType
} from 'features/auth/authTypes'
import { isAxiosError } from 'axios'
import { thunkTryCatch } from 'common/utils/thunkTryCatch'

const THUNK_PREFIXES = {
	REGISTER: 'auth/register',
	LOGIN: 'auth/login',
	LOGOUT: 'auth/logout',
	CHANGE_USER_NAME: 'auth/changeName',
	FORGOT_PASSWORD: 'auth/forgotPassword',
	SET_NEW_PASSWORD: 'auth/setNewPassword'
}

const register = createAppAsyncThunk<{ isRegisteredIn: boolean }, ArgRegisterType>(
	THUNK_PREFIXES.REGISTER,
	async (arg, thunkAPI) => {
		return thunkTryCatch(thunkAPI, async () => {
			await authAPI.register(arg)
			return { isRegisteredIn: true }
		})
	}
)

const login = createAppAsyncThunk<{ profile: UserProfileResType; isLoggedIn: boolean }, ArgLoginType>(
	THUNK_PREFIXES.LOGIN,
	async (arg, thunkAPI) => {
		return thunkTryCatch(
			thunkAPI,
			async () => {
				const res = await authAPI.login(arg)
				return { profile: res.data, isLoggedIn: true }
			},
			{ showGlobalError: false }
		)
	}
)

export const logout = createAppAsyncThunk<{ isLoggedIn: boolean }, {}>(THUNK_PREFIXES.LOGOUT, async (arg, thunkAPI) => {
	console.log(arg)
	try {
		await authAPI.logout()
		return { isLoggedIn: false }
	} catch (e) {
		return thunkAPI.rejectWithValue(e)
	}
})

export const changeUser = createAppAsyncThunk<{ name: string; avatar: any }, ArgsUpdateProfile>(
	THUNK_PREFIXES.CHANGE_USER_NAME,
	async (arg, thunkAPI) => {
		try {
			const res = await authAPI.updateProfile(arg)
			return { name: res.data.updatedUser.name, avatar: res.data.updatedUser.avatar }
		} catch (e) {
			return thunkAPI.rejectWithValue(e)
		}
	}
)

export const forgotPassword = createAppAsyncThunk<any, ArgForgotPasswordType>(
	THUNK_PREFIXES.FORGOT_PASSWORD,
	async (arg, thunkAPI) => {
		try {
			await authAPI.forgotPassword(arg)
		} catch (e) {
			return thunkAPI.rejectWithValue(e)
		}
	}
)

export const setNewPassword = createAppAsyncThunk<any, ArgSetNewPassword>(
	THUNK_PREFIXES.SET_NEW_PASSWORD,
	async (arg, thunkAPI) => {
		try {
			await authAPI.setNewPassword(arg)
		} catch (e) {
			return thunkAPI.rejectWithValue(e)
		}
	}
)

const slice = createSlice({
	name: 'auth',
	initialState: {
		profile: null as UserProfileResType | null,
		isLoggedIn: false,
		isRegisteredIn: false,
		error: null as null | string
	},
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(register.fulfilled, (state, action) => {
				state.isRegisteredIn = action.payload.isRegisteredIn
			})
			.addCase(register.rejected, (state, action) => {
				if (!isAxiosError(action.payload)) {
					state.error = 'an error has occurred'
					return
				}
				state.error = action.payload?.response?.data?.error
			})
			.addCase(login.fulfilled, (state, action) => {
				state.profile = action.payload.profile
				state.isLoggedIn = action.payload.isLoggedIn
			})
			.addCase(login.rejected, (state, action) => {
				if (!isAxiosError(action.payload)) {
					state.error = 'an error has occurred'
					return
				}
				state.error = action.payload?.response?.data?.error
			})
			.addCase(logout.fulfilled, (state, action) => {
				state.isLoggedIn = action.payload.isLoggedIn
			})
			.addCase(changeUser.fulfilled, (state, action) => {
				if (action.payload?.name) {
					state!.profile!.name = action.payload.name
					state!.profile!.avatar = action.payload.avatar
				}
			})
	}
})

export const authReducer = slice.reducer
export const authActions = slice.actions
export const authThunks = { register, login, logout, changeUser, forgotPassword, setNewPassword }
