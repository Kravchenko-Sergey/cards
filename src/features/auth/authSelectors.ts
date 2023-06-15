import { RootState } from 'app/store'

export const selectIsRegisteredIn = (state: RootState) => state.auth.isRegisteredIn
export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn
export const selectUserEmail = (state: RootState) => state.auth.profile?.email
export const selectUserName = (state: RootState) => state.auth.profile?.name
