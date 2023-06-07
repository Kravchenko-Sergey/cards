import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { packsApi } from './packs.api'
import {
	ArgsCreatePacksType,
	ArgsDeletePacksType,
	ArgsGetPacksType,
	ArgsUpdatePacksType,
	PackType
} from './packs.api.types'

const THUNK_PREFIXES = {
	GET_PACKS: 'auth/getPacks',
	GET_MY_PACKS: 'auth/getMyPacks',
	CREATE_PACKS: 'auth/createPack',
	DELETE_PACKS: 'auth/deletePack',
	UPDATE_PACKS_NAME: 'auth/updatePacksName',
	SEARCH_PACK: 'auth/searchPack',
	SLIDER_FILTER: 'auth/sliderFilter',
	RESET_FILTER: 'auth/resetFilter'
}

const getPacks = createAsyncThunk(THUNK_PREFIXES.GET_PACKS, async (arg: ArgsGetPacksType) => {
	try {
		const res = await packsApi.getPacks(arg)
		return {
			packs: res.data.cardPacks,
			cardsPackTotalCount: res.data.cardPacksTotalCount,
			minCardsCount: res.data.minCardsCount,
			maxCardsCount: res.data.maxCardsCount
		}
	} catch (e) {
		console.error(e)
	}
})

const getMyPacks = createAsyncThunk(THUNK_PREFIXES.GET_MY_PACKS, async (arg: ArgsGetPacksType) => {
	try {
		const res = await packsApi.getPacks(arg)
		return { packs: res.data.cardPacks }
	} catch (e) {
		console.error(e)
	}
})

const createPack = createAsyncThunk(THUNK_PREFIXES.CREATE_PACKS, async (arg: ArgsCreatePacksType) => {
	try {
		const res = await packsApi.createPack(arg)
		return { cardsPack: { name: 'new deck', deckCover: 'url or base64', private: false }, packs: res.data.newCardsPack }
	} catch (e) {
		console.error(e)
	}
})

const deletePack = createAsyncThunk(THUNK_PREFIXES.DELETE_PACKS, async (arg: ArgsDeletePacksType) => {
	console.log(arg)
	try {
		const res = await packsApi.deletePack(arg)
		return { id: arg._id, packs: res.data.deletedCardsPack }
	} catch (e) {
		console.error(e)
	}
})

const updatePackName = createAsyncThunk(THUNK_PREFIXES.UPDATE_PACKS_NAME, async (arg: ArgsUpdatePacksType) => {
	try {
		const res = await packsApi.updatePackName(arg)
		return { id: arg.cardsPack.id, name: 'update deck', packs: res.data.updatedCardsPack }
	} catch (e) {
		console.error(e)
	}
})

const searchPack = createAsyncThunk(THUNK_PREFIXES.SEARCH_PACK, async (arg: ArgsGetPacksType) => {
	try {
		const res = await packsApi.getPacks({ packName: arg.packName })
		return { packs: res.data.cardPacks }
	} catch (e) {
		console.error(e)
	}
})

const sliderFilter = createAsyncThunk(THUNK_PREFIXES.SLIDER_FILTER, async (arg: ArgsGetPacksType) => {
	try {
		const res = await packsApi.getPacks(arg)
		return { packs: res.data.cardPacks }
	} catch (e) {
		console.error(e)
	}
})

const resetFilter = createAsyncThunk(THUNK_PREFIXES.RESET_FILTER, async (arg: ArgsGetPacksType) => {
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
		builder
			.addCase(getPacks.fulfilled, (state, action) => {
				if (action.payload?.packs) {
					state.packs = action.payload.packs
				}
			})
			.addCase(getMyPacks.fulfilled, (state, action) => {
				if (action.payload?.packs) {
					state.packs = action.payload.packs
				}
			})
			.addCase(createPack.fulfilled, (state, action) => {
				if (action.payload?.cardsPack) {
					console.log(action.payload.cardsPack)
					state.packs.unshift(action.payload.cardsPack)
				}
				if (action.payload?.packs) {
					state.packs = action.payload.packs
				}
			})
			.addCase(deletePack.fulfilled, (state, action) => {
				if (action.payload?.id) {
					return state.packs.packs.filter((pack: PackType) => pack._id !== action.payload!.id)
				}
				if (action.payload?.packs) {
					state.packs = action.payload.packs
				}
			})
			.addCase(updatePackName.fulfilled, (state, action) => {
				if (action.payload?.id) {
					const packIndex = state.packs.findIndex((pack: PackType) => pack._id === action.payload!.id)
					state.packs[packIndex].name = action.payload.name
				}
				if (action.payload?.packs) {
					state.packs = action.payload.packs
				}
			})
			.addCase(searchPack.fulfilled, (state, action) => {
				if (action.payload?.packs) {
					state.packs = action.payload.packs
				}
			})
			.addCase(sliderFilter.fulfilled, (state, action) => {
				if (action.payload?.packs) {
					state.packs = action.payload.packs
				}
			})
			.addCase(resetFilter.fulfilled, (state, action) => {
				if (action.payload?.packs) {
					state.packs = action.payload.packs
				}
			})
	}
})

export const packsReducer = slice.reducer
export const packsActions = slice.actions
export const packsThunks = {
	getPacks,
	getMyPacks,
	createPack,
	deletePack,
	updatePackName,
	searchPack,
	sliderFilter,
	resetFilter
}
