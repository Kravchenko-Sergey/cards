import { createSlice } from '@reduxjs/toolkit'
import {
	ArgCreateCardType,
	ArgDeleteCardType,
	ArgGetCardsType,
	ArgUpdateCardType,
	cardsAPI,
	CardType
} from 'features/cards/cardsAPI'
import { createAppAsyncThunk } from 'common/utils'

const getCards = createAppAsyncThunk<any, ArgGetCardsType>('cards/getCards', async arg => {
	try {
		const res = await cardsAPI.getCards(arg)
		console.log(arg)
		console.log(res.data.cards)
		return { cards: res.data.cards }
	} catch (e) {
		console.error(e)
	}
})

const createCard = createAppAsyncThunk<{}, ArgCreateCardType>('cards/createCard', async arg => {
	try {
		await cardsAPI.createCard(arg)
	} catch (e) {
		console.error(e)
	}
})

const updateCard = createAppAsyncThunk<{}, ArgUpdateCardType>('cards/updateCard', async arg => {
	try {
		await cardsAPI.updateCard(arg)
	} catch (e) {
		console.error(e)
	}
})

const deleteCard = createAppAsyncThunk<{}, ArgDeleteCardType>('cards/deleteCard', async arg => {
	try {
		await cardsAPI.deleteCard(arg)
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
