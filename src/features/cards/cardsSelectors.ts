import { RootState } from 'app/store'

export const cardsSelectors = {
	selectCards: (state: RootState) => state.cards.cards,
	selectPackName: (state: RootState) => state.cards.packName,
	selectCardsPackId: (state: RootState) => state.cards.searchParamsCard.cardsPack_id
}
