import { createSlice } from '@reduxjs/toolkit'
import { createAppAsyncThunk } from 'common/utils/create-app-async-thunk'
import { authAPI } from 'features/auth/authAPI'
import {
	ArgsForgotPasswordType,
	ArgsLoginType,
	ArgsRegisterType,
	ArgsSetNewPassword,
	ArgsUpdateProfile,
	UserProfileType
} from 'features/auth/authTypes'
import { isAxiosError } from 'axios'
import { thunkTryCatch } from 'common/utils/thunk-try-catch'

const THUNK_PREFIXES = {
	REGISTER: 'auth/register',
	LOGIN: 'auth/login',
	LOGOUT: 'auth/logout',
	CHANGE_USER_NAME: 'auth/changeName',
	FORGOT_PASSWORD: 'auth/forgotPassword',
	SET_NEW_PASSWORD: 'auth/setNewPassword'
}

const register = createAppAsyncThunk(THUNK_PREFIXES.REGISTER, async (arg: ArgsRegisterType, thunkAPI) => {
	return thunkTryCatch(
		thunkAPI,
		async () => {
			const res = await authAPI.register(arg)
			return { isRegisteredIn: true }
		},
		false
	)
})

const login = createAppAsyncThunk(THUNK_PREFIXES.LOGIN, async (arg: ArgsLoginType, thunkAPI) => {
	return thunkTryCatch(thunkAPI, async () => {
		const res = await authAPI.login(arg)
		return { profile: res.data, isLoggedIn: true }
	})
})

export const logout = createAppAsyncThunk(THUNK_PREFIXES.LOGOUT, async (arg, thunkAPI) => {
	try {
		const res = await authAPI.logout()
		return { isLoggedIn: false }
	} catch (e) {
		return thunkAPI.rejectWithValue(e)
	}
})

export const changeUserName = createAppAsyncThunk(
	THUNK_PREFIXES.CHANGE_USER_NAME,
	async (arg: ArgsUpdateProfile, thunkAPI) => {
		try {
			const res = await authAPI.updateProfile(arg)
			return { name: res.data.updatedUser.name }
		} catch (e) {
			return thunkAPI.rejectWithValue(e)
		}
	}
)

export const forgotPassword = createAppAsyncThunk(
	THUNK_PREFIXES.FORGOT_PASSWORD,
	async (arg: ArgsForgotPasswordType, thunkAPI) => {
		try {
			const res = await authAPI.forgotPassword(arg)
		} catch (e) {
			return thunkAPI.rejectWithValue(e)
		}
	}
)

export const setNewPassword = createAppAsyncThunk(
	THUNK_PREFIXES.SET_NEW_PASSWORD,
	async (arg: ArgsSetNewPassword, thunkAPI) => {
		try {
		} catch (e) {
			return thunkAPI.rejectWithValue(e)
		}
	}
)

const slice = createSlice({
	name: 'auth',
	initialState: {
		profile: null as UserProfileType | null,
		isLoggedIn: false,
		isRegisteredIn: false,
		error: null as null | string
	},
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(register.fulfilled, (state, action) => {
				if (action.payload?.isRegisteredIn) {
					state.isRegisteredIn = action.payload.isRegisteredIn
				}
			})
			.addCase(register.rejected, (state, action) => {
				if (!isAxiosError(action.payload)) {
					state.error = 'an error has occurred'
					return
				}
				state.error = action.payload?.response?.data?.error
			})
			.addCase(login.fulfilled, (state, action) => {
				if (action.payload?.profile) {
					state.profile = action.payload.profile
					state.isLoggedIn = action.payload.isLoggedIn
				}
			})
			.addCase(login.rejected, (state, action) => {
				if (!isAxiosError(action.payload)) {
					state.error = 'an error has occurred'
					return
				}
				state.error = action.payload?.response?.data?.error
			})
			.addCase(logout.fulfilled, (state, action) => {
				if (action.payload?.isLoggedIn === false) {
					state.isLoggedIn = action.payload.isLoggedIn
				}
			})
			.addCase(changeUserName.fulfilled, (state, action) => {
				if (action.payload?.name) {
					state!.profile!.name = action.payload.name
				}
			})
	}
})

export const authReducer = slice.reducer
export const authActions = slice.actions
export const authThunks = { register, login, logout, changeUserName, forgotPassword, setNewPassword }
