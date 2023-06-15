import { RootState } from 'app/store'

export const selectCards = (state: RootState) => state.cards.cards
export const selectPackName = (state: RootState) => state.cards.packName
export const selectCardsPackId = (state: RootState) => state.cards.searchParamsCard.cardsPack_id
