import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { authApi } from 'features/auth/auth.api'
import { createAppAsyncThunk } from 'common/utils/create-app-async-thunk'
import { isAxiosError } from 'axios'
import { toast } from 'react-toastify'

export const initializeApp = createAppAsyncThunk('app/initializeApp', async (arg, thunkAPI) => {
	try {
		const res = await authApi.me()
		return { isLoggedIn: true }
	} catch (e) {
		console.error(e)
	} finally {
		return { isAppInitialized: true }
	}
})

export const setIsLoading = createAppAsyncThunk('app/initializeApp', async (arg, thunkAPI) => {
	try {
		const res = await authApi.me()
		return { isLoggedIn: true }
	} catch (e) {
		console.error(e)
	} finally {
		return { isAppInitialized: true }
	}
})

const slice = createSlice({
	name: 'app',
	initialState: {
		error: null as string | null,
		isLoading: true,
		isAppInitialized: false
	},
	reducers: {
		setIsAppInitialized: (state, action: PayloadAction<{ isAppInitialized: boolean }>) => {
			state.isAppInitialized = action.payload.isAppInitialized
		}
	},
	extraReducers: builder => {
		builder
			.addCase(initializeApp.fulfilled, (state, action: any) => {
				if (action.payload?.isLoggedIn) {
					state.isLoading = action.payload.isLoggedIn
				}
				if (action.payload?.isAppInitialized) {
					state.isAppInitialized = action.payload.isAppInitialized
				}
			})
			.addCase(initializeApp.rejected, (state, action: any) => {
				if (action.payload?.isAppInitialized) {
					state.isAppInitialized = action.payload.isAppInitialized
				}
			})
			.addMatcher(
				action => {
					return action.type.endsWith('/pending')
				},
				(state, action) => {
					state.isLoading = true
				}
			)
			.addMatcher(
				action => {
					return action.type.endsWith('/fulfilled')
				},
				(state, action) => {
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
					let errorMessage = ''
					if (isAxiosError(e)) {
						errorMessage = e?.response?.data?.error ?? e.message
					} else if (e instanceof Error) {
						errorMessage = `Native error: ${e.message}`
					} else {
						errorMessage = JSON.stringify(e)
					}
					toast.error(errorMessage)
				}
			)
	}
})

export const appReducer = slice.reducer
export const appActions = slice.actions
export const appThunks = { initializeApp }
