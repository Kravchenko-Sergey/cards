import { RootState } from 'app/store'

export const packsSelectors = {
	selectPacks: (state: RootState) => state.packs.packs,
	selectMyId: (state: RootState) => state.packs.searchParams.user_id,
	selectParams: (state: RootState) => state.packs.searchParams,
	selectCardPacksTotalCount: (state: RootState) => state.packs.cardPacksTotalCount,
	selectPageCount: (state: RootState) => state.packs.searchParams.pageCount
}
