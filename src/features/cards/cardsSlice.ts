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
		return {
			cards: res.data.cards,
			cardsTotalCount: res.data.cardsTotalCount,
			cardAnswer: arg.cardAnswer,
			cardQuestion: arg.cardQuestion,
			cardsPack_id: arg.cardsPack_id,
			min: arg.min,
			max: arg.max,
			sortCards: arg.sortCards,
			pageCount: arg.pageCount,
			page: arg.page,
			grade: arg.grade
		}
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

const updateCard = createAppAsyncThunk<{}, ArgUpdateCardType>('cards/updateCard', async (arg, thunkAPI) => {
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

const updateGradeCard = createAppAsyncThunk<any, any>('cards/updateCard', async arg => {
	try {
		await cardsAPI.updateGradeCard(arg)
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
			pageCount: 4,
			grade: 0
		},
		packName: '',
		cardsTotalCount: 0,
		maxGrade: 5,
		minGrade: 0,
		page: 1,
		pageCount: 4
		/*packUserId: ''*/
	},
	reducers: {},
	extraReducers: builder => {
		builder.addCase(getCards.fulfilled, (state, action) => {
			state.cards = action.payload.cards
			state.cardsTotalCount = action.payload.cardsTotalCount
			state.searchParamsCard.cardAnswer = action.payload.cardAnswer
			state.searchParamsCard.cardQuestion = action.payload.cardQuestion
			state.searchParamsCard.cardsPack_id = action.payload.cardsPack_id
			state.searchParamsCard.min = action.payload.min
			state.searchParamsCard.max = action.payload.max
			state.searchParamsCard.sortCards = action.payload.sortCards
			state.searchParamsCard.page = action.payload.page
			state.searchParamsCard.pageCount = action.payload.pageCount
			state.searchParamsCard.grade = action.payload.grade
		})
	}
})

export const cardsReducer = slice.reducer
export const cardsActions = slice.actions
export const cardsThunks = {
	getCards,
	createCard,
	updateCard,
	updateGradeCard,
	deleteCard
}
