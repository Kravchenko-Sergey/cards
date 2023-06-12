import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { packsAPI } from 'features/pasks/packsAPI'
import {
	ArgCreatePacksType,
	ArgDeletePacksType,
	ArgsGetPacksType,
	ArgUpdatePacksType,
	PackType
} from 'features/pasks/packsTypes'
import { createAppAsyncThunk } from '../../common/utils/createAppAsyncThunk'
import { thunkTryCatch } from 'common/utils'
import { authAPI } from 'features/auth/authAPI'

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

const createPack = createAppAsyncThunk<any, ArgCreatePacksType>(THUNK_PREFIXES.CREATE_PACKS, async (arg, thunkAPI) => {
	return thunkTryCatch(thunkAPI, async () => {
		const res = await packsAPI.createPack(arg)
		thunkAPI.dispatch(packsThunks.getPacks({ user_id: res.request.user_id }))
	})
})

const updatePack = createAppAsyncThunk<any, any>(THUNK_PREFIXES.UPDATE_PACKS_NAME, async (arg, thunkAPI) => {
	return thunkTryCatch(thunkAPI, async () => {
		const res = await packsAPI.updatePack(arg)
		thunkAPI.dispatch(getPacks({ user_id: res.request.user_id }))
	})
})

const deletePack = createAppAsyncThunk<{}, ArgDeletePacksType>(THUNK_PREFIXES.DELETE_PACKS, async (arg, thunkAPI) => {
	return thunkTryCatch(thunkAPI, async () => {
		const res = await packsAPI.deletePack(arg)
		thunkAPI.dispatch(getPacks({ user_id: res.request.user_id }))
	})
})

const searchPack = createAppAsyncThunk<any, ArgsGetPacksType>(THUNK_PREFIXES.SEARCH_PACK, async (arg, thunkAPI) => {
	return thunkTryCatch(thunkAPI, async () => {
		const res = await packsAPI.getPacks(arg)
		return {
			packs: res.data.cardPacks,
			packName: arg.packName,
			minCardsCount: res.data.minCardsCount,
			maxCardsCount: res.data.maxCardsCount
		}
	})
})

const sliderFilter = createAppAsyncThunk<any, ArgsGetPacksType>(THUNK_PREFIXES.SLIDER_FILTER, async (arg, thunkAPI) => {
	return thunkTryCatch(thunkAPI, async () => {
		const res = await packsAPI.getPacks(arg)
		return { packs: res.data.cardPacks, min: arg.min, max: arg.max }
	})
})

const resetFilter = createAppAsyncThunk<any, ArgsGetPacksType>(THUNK_PREFIXES.RESET_FILTER, async (arg, thunkAPI) => {
	return thunkTryCatch(thunkAPI, async () => {
		const res = await packsAPI.getPacks({})
		return { packs: res.data.cardPacks, params: arg }
	})
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
			.addCase(searchPack.fulfilled, (state, action) => {
				state.searchParams.packName = action.payload.packName
				state.packs = action.payload.packs
			})
			.addCase(sliderFilter.fulfilled, (state, action) => {
				state.packs = action.payload.packs
				state.searchParams.min = action.payload.min
				state.searchParams.max = action.payload.max
			})
			.addCase(resetFilter.fulfilled, (state, action) => {
				state.packs = action.payload.packs
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
