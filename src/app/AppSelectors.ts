import { RootState } from 'app/store'

export const appSelectors = {
	selectIsInitialized: (state: RootState) => state.app.isAppInitialized,
	selectIsLoading: (state: RootState) => state.app.isLoading
}
