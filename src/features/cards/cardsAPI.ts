import { instance } from 'common/api/common.api'

export const cardsAPI = {
	getCards(params: any) {
		return instance.get('cards/card', { params })
	}
}
