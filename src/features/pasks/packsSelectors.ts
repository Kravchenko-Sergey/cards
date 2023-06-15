import { RootState } from 'app/store'

export const selectMyId = (state: RootState) => state.packs.searchParams.user_id
