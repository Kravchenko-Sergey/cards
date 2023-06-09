import { createSlice } from '@reduxjs/toolkit'
import { cardsAPI } from 'features/cards/cardsAPI'
import { createAppAsyncThunk } from 'common/utils'

const getCards = createAppAsyncThunk<any, any>('cards/getCards', async arg => {
	try {
		const res = await cardsAPI.getCards(arg)
		console.log(res)
		return { cards: res.data.cards }
	} catch (e) {
		console.error(e)
	}
})

const createCard = createAppAsyncThunk<any, any>('cards/createCard', async arg => {
	try {
		const res = await cardsAPI.createCard(arg)
		console.log(res)
		return { cards: res.data.cards }
	} catch (e) {
		console.error(e)
	}
})

const updateCard = createAppAsyncThunk<any, any>('cards/updateCard', async arg => {
	try {
		const res = await cardsAPI.updateCard(arg)
		console.log(res)
		return { cards: res.data.cards }
	} catch (e) {
		console.error(e)
	}
})

const deleteCard = createAppAsyncThunk<any, any>('cards/deleteCard', async arg => {
	try {
		const res = await cardsAPI.deleteCard(arg)
		console.log(res)
		return { cards: res.data.cards }
	} catch (e) {
		console.error(e)
	}
})

const slice = createSlice({
	name: 'cards',
	initialState: {
		cards: [] as CardType[],
		packName: '',
		cardsTotalCount: 0,
		maxGrade: 5,
		minGrade: 0,
		page: 1,
		pageCount: 4,
		packUserId: ''
	},
	reducers: {},
	extraReducers: builder => {
		builder.addCase(getCards.fulfilled, (state, action) => {
			state.cards = action.payload.cards
		})
	}
})

export const cardsReducer = slice.reducer
export const cardsActions = slice.actions
export const cardsThunks = {
	getCards,
	createCard,
	updateCard,
	deleteCard
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
