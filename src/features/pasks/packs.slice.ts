import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { packsApi } from './packs.api'

const getPacks = createAsyncThunk('packs/getPacks', async arg => {
	try {
		const res = await packsApi.getPacks({})
		return { packs: res.data.cardPacks }
	} catch (e) {
		console.error(e)
	}
})

const createPack = createAsyncThunk('packs/createPack', async (arg: any) => {
	try {
		const res = await packsApi.createPack(arg)
		return { cardsPack: { name: 'new deck', deckCover: 'url or base64', private: false }, packs: res.data.newCardsPack }
	} catch (e) {
		console.error(e)
	}
})

const deletePack = createAsyncThunk('packs/deletePack', async (arg: any) => {
	try {
		const res = await packsApi.deletePack(arg.id)
		return { id: arg.id, packs: res.data.deletedCardsPack }
	} catch (e) {
		console.error(e)
	}
})

const updatePackName = createAsyncThunk('packs/updatePacksName', async (arg: any) => {
	try {
		const res = await packsApi.updatePackName({ cardsPack: arg })
		return { id: arg._id, name: res.data.updatedCardsPack.name }
	} catch (e) {
		console.error(e)
	}
})

const searchPack = createAsyncThunk('packs/searchPack', async (arg: any) => {
	try {
		const res = await packsApi.getPacks({ packName: arg.packName })
		console.log(res)
		return { packs: res.data.cardPacks }
	} catch (e) {
		console.error(e)
	}
})

const resetFilter = createAsyncThunk('packs/resetFilter', async (arg: any) => {
	try {
		const res = await packsApi.getPacks({})
		return { packs: res.data.cardPacks }
	} catch (e) {
		console.error(e)
	}
})

const slice = createSlice({
	name: 'packs',
	initialState: {
		packs: [] as any
	},
	reducers: {},
	extraReducers: builder => {
		builder.addCase(getPacks.fulfilled, (state, action) => {
			if (action.payload?.packs) {
				state.packs = action.payload.packs
			}
		})
		builder.addCase(createPack.fulfilled, (state, action) => {
			if (action.payload?.cardsPack) {
				state.packs.packs.unshift(action.payload.cardsPack)
			}
			if (action.payload?.packs) {
				state.packs = action.payload.packs
			}
		})
		builder.addCase(deletePack.fulfilled, (state, action) => {
			if (action.payload?.id) {
				return state.packs.packs.filter((pack: any) => pack._id !== action.payload!.id)
			}
			if (action.payload?.packs) {
				state.packs = action.payload.packs
			}
		})
		builder.addCase(updatePackName.fulfilled, (state, action) => {
			if (action.payload?.id) {
				const packIndex = state.packs.findIndex((pack: any) => pack._id === action.payload!.id)
				state.packs[packIndex].name = action.payload.name
			}
		})
		builder.addCase(searchPack.fulfilled, (state, action) => {
			if (action.payload?.packs) {
				state.packs = action.payload.packs
			}
		})
		builder.addCase(resetFilter.fulfilled, (state, action) => {
			if (action.payload?.packs) {
				state.packs = action.payload.packs
			}
		})
	}
})

export const packsReducer = slice.reducer
export const packsActions = slice.actions
export const packsThunks = { getPacks, createPack, deletePack, updatePackName, searchPack, resetFilter }
