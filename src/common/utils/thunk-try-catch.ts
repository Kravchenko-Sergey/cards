import { AppDispatch, RootState } from 'app/store'
import { BaseThunkAPI } from '@reduxjs/toolkit/dist/createAsyncThunk'

export const thunkTryCatch = async (
	thunkAPI: BaseThunkAPI<RootState, any, AppDispatch, unknown>,
	promise: Function
) => {
	const { rejectWithValue } = thunkAPI
	try {
		return await promise()
	} catch (e: any) {
		return rejectWithValue(e)
	}
}
