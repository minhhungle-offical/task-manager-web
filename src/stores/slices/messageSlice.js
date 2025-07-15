import { messageApi } from '@/api/messageApi'
import { STATUS } from '@/constants/common'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const name = 'message'
const api = messageApi

export const messageGetAll = createAsyncThunk(
  `${name}/getAll`,
  async (params, { rejectWithValue }) => {
    try {
      return await api.getAll(params)
    } catch (err) {
      return rejectWithValue(err)
    }
  },
)

const initialState = {
  data: [],
  status: STATUS.IDLE,
  error: '',
}

export const messageSlice = createSlice({
  name,
  initialState,
  reducers: {
    setData(state, { payload }) {
      state.data = payload
    },
  },
  extraReducers: (builder) => {
    builder
      // Get All
      .addCase(messageGetAll.pending, (state) => {
        state.status = STATUS.LOADING
      })
      .addCase(messageGetAll.fulfilled, (state, { payload }) => {
        state.status = STATUS.LOADED
        state.data = payload
      })
      .addCase(messageGetAll.rejected, (state, { payload }) => {
        state.status = STATUS.FAILED
        state.error = `${payload}`
      })
  },
})

export const { actions: messageAction, reducer: messageReducer } = messageSlice
