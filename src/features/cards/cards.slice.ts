import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { cardsApi } from 'features/cards/cards.api'

const getCards = createAsyncThunk('cards/getCards', async (arg: any) => {
	try {
		const res = await cardsApi.getCards(arg)
		console.log(res)
		return { cards: res.data.cards }
	} catch (e) {
		console.error(e)
	}
})

const slice = createSlice({
	name: 'cards',
	initialState: {
		cards: [] as any
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
