import { createSlice, PayloadAction } from '@reduxjs/toolkit'

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
		}
	}
})

export const appReducer = slice.reducer
// Action creators создаются автоматически для каждого подредьюсера
// Все экшены упаковываем в объект. В дальнейшем пригодится
export const appActions = slice.actions
