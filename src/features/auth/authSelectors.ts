import { RootState } from 'app/store'

export const authSelectors = {
	selectIsRegisteredIn: (state: RootState) => state.auth.isRegisteredIn,
	selectIsLoggedIn: (state: RootState) => state.auth.isLoggedIn,
	selectUserEmail: (state: RootState) => state.auth.profile?.email,
	selectUserName: (state: RootState) => state.auth.profile?.name
}
