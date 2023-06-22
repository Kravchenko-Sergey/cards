import { instance } from 'common/api/common.api'

export const cardsAPI = {
	getCards(arg: ArgGetCardsType) {
		return instance.get<GetCardsResType>('cards/card', { params: { ...arg } })
	},
	createCard(arg: ArgCreateCardType) {
		return instance.post<CreateCardResType>('cards/card', arg)
	},
	updateCard(arg: ArgUpdateCardType) {
		return instance.put<UpdateCardResType>('cards/card', arg)
	},
	deleteCard(arg: ArgDeleteCardType) {
		console.log(arg)
		return instance.delete<DeleteCardResType>(`cards/card/?id=${arg.id}`)
	},
	updateGradeCard(arg: ArgUpdateGradeCardType) {
		return instance.put<any>('cards/grade', arg)
	}
}

export type ArgGetCardsType = {
	cardAnswer?: string
	cardQuestion?: string
	cardsPack_id: string
	min?: number
	max?: number
	sortCards?: string
	page?: number
	pageCount?: number
	grade?: number
}

export type ArgCreateCardType = {
	card: {
		cardsPack_id: string
		question?: string
		answer?: string
		grade?: number
		shots?: number
		answerImg?: string
		questionImg?: string
		questionVideo?: string
		answerVideo?: string
	}
}

export type ArgUpdateCardType = {
	card: {
		_id: string
		question?: string
		answer?: string
		grade?: number
		shots?: number
		answerImg?: string
		questionImg?: string
		questionVideo?: string
		answerVideo?: string
	}
}

export type ArgDeleteCardType = {
	id: string
}

export type CardType = {
	_id: string
	cardsPack_id: string
	user_id: string
	answer: string
	question: string
	grade: number
	shots: number
	comments: string
	type: string
	rating: number
	more_id: string
	created: string
	updated: string
	__v: number
}

export type GetCardsResType = {
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

export type CreateCardResType = {
	newCard: CardType
	token: string
	tokenDeathTime: number
}

export type UpdateCardResType = {
	updatedCard: CardType
	token: string
	tokenDeathTime: number
}

export type DeleteCardResType = {
	deletedCard: CardType
	token: string
	tokenDeathTime: number
}

type ArgUpdateGradeCardType = {
	grade: number
	card_id: string
}
