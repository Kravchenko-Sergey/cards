import { createSlice } from '@reduxjs/toolkit'
import {
	ArgCreateCardType,
	ArgDeleteCardType,
	ArgGetCardsType,
	ArgUpdateCardType,
	cardsAPI,
	CardType
} from 'features/cards/cardsAPI'
import { createAppAsyncThunk, thunkTryCatch } from 'common/utils'

const getCards = createAppAsyncThunk<any, ArgGetCardsType>('cards/getCards', async arg => {
	try {
		const res = await cardsAPI.getCards(arg)
		console.log(arg)
		console.log(res)
		return { cards: res.data.cards, cardsPack_id: arg.cardsPack_id, packName: res.data.packName }
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

const searchCard = createAppAsyncThunk<any, ArgGetCardsType>('cards/searchCard', async (arg, thunkAPI) => {
	return thunkTryCatch(thunkAPI, async () => {
		thunkAPI.dispatch(cardsThunks.getCards(arg))
		return { cardsPack_id: arg.cardsPack_id, cardAnswer: arg.cardAnswer }
	})
})

const slice = createSlice({
	name: 'cards',
	initialState: {
		cards: [] as CardType[],
		searchParamsCard: {
			cardAnswer: '',
			cardQuestion: '',
			cardsPack_id: '',
			min: 1,
			max: 5,
			sortCards: '0grade',
			page: 1,
			pageCountL: 7
		},
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
		builder
			.addCase(getCards.fulfilled, (state, action) => {
				state.cards = action.payload.cards
				state.searchParamsCard.cardsPack_id = action.payload.cardsPack_id
				state.packName = action.payload.packName
			})
			.addCase(searchCard.fulfilled, (state, action) => {
				state.searchParamsCard.cardAnswer = action.payload.cardAnswer
			})
	}
})

export const cardsReducer = slice.reducer
export const cardsActions = slice.actions
export const cardsThunks = {
	getCards,
	createCard,
	updateCard,
	deleteCard,
	searchCard
}
