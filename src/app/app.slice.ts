import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { authApi } from 'features/auth/auth.api'
import { authActions } from 'features/auth/auth.slice'
import { createAppAsyncThunk } from 'common/utils/create-app-async-thunk'

export const initializeApp = createAppAsyncThunk('app/initializeApp', async (arg, thunkAPI) => {
	try {
		const res = await authApi.me()
		if (res.status === 200) {
			thunkAPI.dispatch(authActions.setIsLoggedIn({ isLoggedIn: true }))
		}
	} catch (e) {
		console.log(e)
		console.log('you are not authorized')
	} finally {
		thunkAPI.dispatch(appActions.setIsAppInitialized({ isAppInitialized: true }))
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
		// Подредьюсер.
		// Action - это payload объект. Типизация через PayloadAction
		setIsLoading: (state, action: PayloadAction<{ isLoading: boolean }>) => {
			// Логику в подредьюсерах пишем мутабельным образом,
			// т.к. иммутабельность достигается благодаря immer.js
			state.isLoading = action.payload.isLoading
		},
		setIsAppInitialized: (state, action: PayloadAction<{ isAppInitialized: boolean }>) => {
			state.isAppInitialized = action.payload.isAppInitialized
		}
	}
})

export const appReducer = slice.reducer
// Action creators создаются автоматически для каждого подредьюсера
// Все экшены упаковываем в объект. В дальнейшем пригодится
export const appActions = slice.actions

export const appThunks = { initializeApp }
