import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { packsApi } from './packs.api'

const getPacks = createAsyncThunk('packs/getPacks', async (arg, thunkAPI) => {
	const res = await packsApi.getPacks()
	thunkAPI.dispatch(packsActions.getPacks({ packs: res.data.cardPacks }))
})

const createPack = createAsyncThunk('packs/createPack', async (arg: any, thunkAPI) => {
	const res = await packsApi.createPack(arg)
	console.log(res.data)
	thunkAPI.dispatch(
		packsActions.createPack({ cardsPack: { name: 'new deck', deckCover: 'url or base64', private: false } })
	)
	thunkAPI.dispatch(packsActions.getPacks({ packs: res.data.cardPacks }))
})

const deletePack = createAsyncThunk('packs/deletePack', async (arg: any, thunkAPI) => {
	console.log(arg.id)
	const res = await packsApi.deletePack(arg.id)
	console.log(res)
	thunkAPI.dispatch(packsActions.deletePack({ id: arg.id }))
	thunkAPI.dispatch(packsActions.getPacks({ packs: res.data.cardPacks }))
})

const updatePackName = createAsyncThunk('packs/updatePacksName', async (arg: any, thunkAPI) => {
	console.log(arg)
	const res = await packsApi.updatePackName({ cardsPack: arg })
	thunkAPI.dispatch(packsActions.updatePackName({ id: arg._id, name: res.data.updatedCardsPack.name }))
})

const slice = createSlice({
	name: 'packs',
	initialState: {
		packs: []
	},
	reducers: {
		getPacks: (state, action: PayloadAction<any>) => {
			state.packs = action.payload.packs
		},
		createPack: (state: any, action: PayloadAction<any>) => {
			state.packs.packs.unshift(action.payload.cardsPack)
		},
		deletePack: (state: any, action: PayloadAction<any>) => {
			state.packs.packs.filter((pack: any) => pack._id !== action.payload.id)
		},
		updatePackName: (state: any, action: PayloadAction<any>) => {
			console.log(action)
			const packIndex = state.packs.findIndex((pack: any) => pack._id === action.payload.id)
			console.log(packIndex)
			state.packs[packIndex].name = action.payload.name
		}
	},
	extraReducers: {}
})

export const packsReducer = slice.reducer
export const packsActions = slice.actions
export const packsThunks = { getPacks, createPack, deletePack, updatePackName }
