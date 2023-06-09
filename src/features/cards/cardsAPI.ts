import { instance } from 'common/api/common.api'
import { CardType } from './cardsSlice'

export const cardsAPI = {
	getCards(params: any) {
		return instance.get<ArgGetCardsResponseType>('cards/card', { params })
	},
	createCard(data: any) {
		return instance.post<any>('cards/card', data)
	},
	updateCard(data: any) {
		return instance.put<any>('cards/card', data)
	},
	deleteCard(data: any) {
		console.log(data)
		return instance.delete<any>(`cards/card/?id=${data._id}`)
	}
}

type ArgGetCardsResponseType = {
	cards: CardType[]
	packUserId: string
	packName: string
	packPrivate: boolean
	packDeckCover: string
	packCreated: string
	packUpdated: string
	page: number
	pageCount: number
	cardsTotalCount: number
	minGrade: number
	maxGrade: number
	token: string
	tokenDeathTime: number
}
