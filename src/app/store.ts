import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import { appReducer } from 'app/app.slice'
import { authReducer } from 'features/auth/authSlice'
import { packsReducer } from 'features/pasks/packsSlice'
import { cardsReducer } from 'features/cards/cardsSlice'

export const store = configureStore({
	reducer: {
		app: appReducer,
		auth: authReducer,
		packs: packsReducer,
		cards: cardsReducer
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: false
		})
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
