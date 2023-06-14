import { createSlice } from '@reduxjs/toolkit'
import { packsAPI } from 'features/pasks/packsAPI'
import { ArgCreatePacksType, ArgDeletePacksType, ArgsGetPacksType } from 'features/pasks/packsTypes'
import { createAppAsyncThunk } from 'common/utils'
import { thunkTryCatch } from 'common/utils'

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

const getPacks = createAppAsyncThunk<any, ArgsGetPacksType>(THUNK_PREFIXES.GET_PACKS, async (arg, thunkAPI) => {
	return thunkTryCatch(thunkAPI, async () => {
		const res = await packsAPI.getPacks(arg)
		console.log(arg)
		console.log(res)
		return {
			packName: arg.packName,
			sortPacks: arg.sortPacks,
			min: arg.min,
			max: arg.max,
			packs: res.data.cardPacks,
			user_id: arg.user_id,
			cardPacksTotalCount: res.data.cardPacksTotalCount,
			page: arg.page,
			pageCount: arg.pageCount,
			block: arg.block
		}
	})
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
		lastPage: 0,
		cardPacksTotalCount: 0,
		minCardsCount: 0,
		maxCardsCount: 0
	},
	reducers: {},
	extraReducers: builder => {
		builder.addCase(getPacks.fulfilled, (state, action) => {
			state.searchParams.packName = action.payload.packName
			state.searchParams.min = action.payload.min
			state.searchParams.max = action.payload.max
			state.searchParams.page = action.payload.page
			state.searchParams.pageCount = action.payload.pageCount
			state.searchParams.user_id = action.payload.user_id
			state.packs = action.payload.packs
			state.cardPacksTotalCount = action.payload.cardPacksTotalCount
		})
	}
})

export const packsReducer = slice.reducer
export const packsActions = slice.actions
export const packsThunks = {
	getPacks,
	createPack,
	deletePack,
	updatePack
}
