import { createSlice } from '@reduxjs/toolkit'
import { authAPI } from 'features/auth/authAPI'
import { createAppAsyncThunk } from 'common/utils/createAppAsyncThunk'
import { isAxiosError } from 'axios'
import { toast } from 'react-toastify'
import { UserProfileResType } from 'features/auth/authTypes'

export const initializeApp = createAppAsyncThunk<{ isAppInitialized: boolean }, UserProfileResType | {}>(
	'app/initializeApp',
	async (arg, thunkAPI) => {
		try {
			const res = await authAPI.me()
			return { isAppInitialized: true, profile: res.data }
		} catch (e) {
			return thunkAPI.rejectWithValue(e)
		} finally {
			return { isAppInitialized: true }
		}
	}
)

export const setIsLoading = createAppAsyncThunk<any, any>('app/setIsLoading', async () => {
	try {
		await authAPI.me()
		return { isLoggedIn: true }
	} catch (e) {
		console.error(e)
	}
})

const slice = createSlice({
	name: 'app',
	initialState: {
		error: null as string | null,
		isLoading: true,
		isAppInitialized: false
	},
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(setIsLoading.fulfilled, (state, action) => {
				state.isLoading = action.payload.isLoading
			})
			.addCase(initializeApp.fulfilled, (state, action) => {
				state.isAppInitialized = action.payload.isAppInitialized
			})
			.addMatcher(
				action => {
					return action.type.endsWith('/pending')
				},
				state => {
					state.isLoading = true
				}
			)
			.addMatcher(
				action => {
					return action.type.endsWith('/fulfilled')
				},
				state => {
					state.isLoading = false
				}
			)
			.addMatcher(
				action => {
					return action.type.endsWith('/rejected')
				},
				(state, action) => {
					const { e, showGlobalError = true } = action.payload
					state.isLoading = false
					if (!showGlobalError) return
					let errorMessage: string
					if (isAxiosError(e)) {
						errorMessage = e?.response?.data?.error ?? e.message
					} else {
						errorMessage = `Native error: ${e.message}`
					}
					toast.error(errorMessage)
					state.isLoading = false
				}
			)
	}
})

export const appReducer = slice.reducer
export const appActions = slice.actions
export const appThunks = { initializeApp }
