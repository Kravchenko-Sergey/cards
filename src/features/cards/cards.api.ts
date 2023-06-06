import { instance } from 'common/api/common.api'

export const cardsApi = {
	getCards(params: any) {
		return instance.get('cards/card', { params })
	}
}
