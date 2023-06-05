import { AppDispatch, RootState } from 'app/store'
import { BaseThunkAPI } from '@reduxjs/toolkit/dist/createAsyncThunk'

export const thunkTryCatch = async <T>(
	thunkAPI: BaseThunkAPI<RootState, any, AppDispatch, unknown>,
	promise: () => Promise<T>,
	showGlobalError?: boolean
): Promise<T | ReturnType<typeof thunkAPI.rejectWithValue>> => {
	const { rejectWithValue } = thunkAPI
	try {
		return await promise()
	} catch (e: any) {
		return rejectWithValue({ e, showGlobalError })
	}
}
