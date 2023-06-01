import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { packsApi } from './packs.api'

const getPacks = createAsyncThunk('packs/getPacks', async (arg, thunkAPI) => {
	const res = await packsApi.getPacks()
	thunkAPI.dispatch(packsActions.getPacks({ packs: res.data.cardPacks }))
	console.log(res)
})

const slice = createSlice({
	name: 'packs',
	initialState: {
		packs: []
	},
	reducers: {
		getPacks: (state, action: PayloadAction<any>) => {
			console.log(action.payload)
			state.packs = action.payload.packs
		}
	},
	extraReducers: {}
})

export const packsReducer = slice.reducer
export const packsActions = slice.actions
export const packsThunks = { getPacks }
