import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { authApi } from 'features/auth/auth.api'
import { createAppAsyncThunk } from 'common/utils/create-app-async-thunk'

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
	}
})

export const appReducer = slice.reducer
export const appActions = slice.actions
export const appThunks = { initializeApp }
