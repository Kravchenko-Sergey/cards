import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { packsAPI } from 'features/pasks/packsAPI'
import {
	ArgsCreatePacksType,
	ArgsDeletePacksType,
	ArgsGetPacksType,
	ArgsUpdatePacksType,
	PackType
} from 'features/pasks/packsTypes'
import { createAppAsyncThunk } from '../../common/utils/createAppAsyncThunk'

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

const getPacks = createAppAsyncThunk<any, ArgsGetPacksType>(THUNK_PREFIXES.GET_PACKS, async arg => {
	try {
		const res = await packsAPI.getPacks(arg)
		return {
			packs: res.data.cardPacks,
			user_id: '',
			cardsPackTotalCount: res.data.cardPacksTotalCount,
			page: res.data.page,
			pageCount: res.data.pageCount
		}
	} catch (e) {
		console.error(e)
	}
})

/*const getMyPacks = createAsyncThunk(THUNK_PREFIXES.GET_MY_PACKS, async (arg: ArgsGetPacksType) => {
	try {
		console.log(arg)
		const res = await packsAPI.getPacks(arg)
		console.log(res)
		return { packs: res.data.cardPacks, user_id: arg.user_id }
	} catch (e) {
		console.error(e)
	}
})*/

const createPack = createAppAsyncThunk<any, ArgsCreatePacksType>(THUNK_PREFIXES.CREATE_PACKS, async arg => {
	try {
		const res = await packsAPI.createPack(arg)
		return { cardsPack: { name: 'new deck', deckCover: 'url or base64', private: false }, packs: res.data.newCardsPack }
	} catch (e) {
		console.error(e)
	}
})

const deletePack = createAppAsyncThunk<{}, ArgsDeletePacksType>(THUNK_PREFIXES.DELETE_PACKS, async (arg, thunkAPI) => {
	console.log(arg)
	try {
		const res = await packsAPI.deletePack(arg)
		thunkAPI.dispatch(getPacks({ user_id: res.request.user_id }))
	} catch (e) {
		console.error(e)
	}
})

const updatePack = createAppAsyncThunk<any, any>(THUNK_PREFIXES.UPDATE_PACKS_NAME, async (arg: ArgsUpdatePacksType) => {
	try {
		const res = await packsAPI.updatePack(arg)
		console.log(res)
		return { id: arg.cardsPack._id, name: 'update deck' }
	} catch (e) {
		console.error(e)
	}
})

const searchPack = createAppAsyncThunk<any, ArgsGetPacksType>(THUNK_PREFIXES.SEARCH_PACK, async arg => {
	try {
		const res = await packsAPI.getPacks(arg)
		return {
			packs: res.data.cardPacks,
			packName: arg.packName,
			minCardsCount: res.data.minCardsCount,
			maxCardsCount: res.data.maxCardsCount
		}
	} catch (e) {
		console.error(e)
	}
})

const sliderFilter = createAppAsyncThunk<any, ArgsGetPacksType>(THUNK_PREFIXES.SLIDER_FILTER, async arg => {
	try {
		const res = await packsAPI.getPacks(arg)
		return { packs: res.data.cardPacks, min: arg.min, max: arg.max }
	} catch (e) {
		console.error(e)
	}
})

const resetFilter = createAppAsyncThunk<any, ArgsGetPacksType>(THUNK_PREFIXES.RESET_FILTER, async arg => {
	try {
		const res = await packsAPI.getPacks({})
		return { packs: res.data.cardPacks, params: arg }
	} catch (e) {
		console.error(e)
	}
})

const slice = createSlice({
	name: 'packs',
	initialState: {
		packs: [] as any,
		searchParams: {
			packName: '',
			min: 0,
			max: 0,
			sortPacks: '0updated',
			page: 1,
			pageCount: 4,
			user_id: '',
			block: false
		},
		cardPacksTotalCount: 0,
		minCardsCount: 0,
		maxCardsCount: 0
	},
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(getPacks.fulfilled, (state, action) => {
				state.packs = action.payload.packs
				state.searchParams.user_id = action.payload.user_id
				state.searchParams.page = action.payload.page
				state.searchParams.pageCount = action.payload.pageCount
			})
			/*.addCase(getMyPacks.fulfilled, (state, action) => {
				if (action.payload?.packs) {
					state.packs = action.payload.packs
				}
				if (action.payload?.user_id) {
					state.searchParams.user_id = action.payload.user_id
				}
			})*/
			.addCase(createPack.fulfilled, (state, action) => {
				/*if (action.payload?.cardsPack) {
					console.log(action.payload.cardsPack)
					state.packs.unshift(action.payload.cardsPack)
				}
				if (action.payload?.packs) {
					state.packs = action.payload.packs
				}*/
			})
			/*.addCase(deletePack.fulfilled, (state, action) => {
				if (action.payload?.deletedCardsPack) {
					return state.packs.packs.filter((pack: PackType) => pack._id !== action.payload!.deletedCardsPack._id)
				}
			})*/
			/*.addCase(updatePack.fulfilled, (state, action) => {
				if (action.payload?.id) {
					const packIndex = state.packs.findIndex((pack: PackType) => pack._id === action.payload!.id)
					state.packs[packIndex].name = action.payload.name
				}
				if (action.payload?.packs) {
					state.packs = action.payload.packs
				}
			})*/
			.addCase(searchPack.fulfilled, (state, action) => {
				if (action.payload?.packName) {
					state.searchParams.packName = action.payload.packName
				}
				if (action.payload?.packs) {
					state.packs = action.payload.packs
				}
			})
			.addCase(sliderFilter.fulfilled, (state, action) => {
				if (action.payload?.packs) {
					state.packs = action.payload.packs
				}
				if (action.payload?.min) {
					state.searchParams.min = action.payload.min
				}
				if (action.payload?.max) {
					state.searchParams.max = action.payload.max
				}
			})
			.addCase(resetFilter.fulfilled, (state, action) => {
				if (action.payload?.packs) {
					state.packs = action.payload.packs
				}
				if (action.payload?.params) {
					state.searchParams = {
						packName: '',
						min: 0,
						max: 0,
						sortPacks: '0updated',
						page: 1,
						pageCount: 4,
						user_id: '',
						block: false
					}
				}
			})
	}
})

export const packsReducer = slice.reducer
export const packsActions = slice.actions
export const packsThunks = {
	getPacks,
	/*getMyPacks,*/
	createPack,
	deletePack,
	updatePack,
	searchPack,
	sliderFilter,
	resetFilter
}
