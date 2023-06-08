import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { cardsAPI } from 'features/cards/cardsAPI'

const getCards = createAsyncThunk('cards/getCards', async (arg: any) => {
	try {
		const res = await cardsAPI.getCards(arg)
		console.log(res)
		return { cards: res.data.cards }
	} catch (e) {
		console.error(e)
	}
})

const slice = createSlice({
	name: 'cards',
	initialState: {
		cards: [] as any,
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
			if (action.payload?.cards) {
				state.cards = action.payload.cards
			}
		})
	}
})

export const cardsReducer = slice.reducer
export const cardsActions = slice.actions
export const cardsThunks = {
	getCards
}
