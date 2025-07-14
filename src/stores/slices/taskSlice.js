import { tasksApi } from '@/api/taskApi'
import { STATUS } from '@/constants/common'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

const name = 'task'
const api = tasksApi

export const taskGetAll = createAsyncThunk(
  `${name}/getAll`,
  async (params, { rejectWithValue }) => {
    try {
      return await api.getAll(params)
    } catch (err) {
      return rejectWithValue(err)
    }
  },
)

export const taskCreate = createAsyncThunk(`${name}/create`, async (body, { rejectWithValue }) => {
  try {
    return await api.create(body)
  } catch (err) {
    console.log(err)
    return rejectWithValue(err)
  }
})

export const taskUpdate = createAsyncThunk(`${name}/update`, async (body, { rejectWithValue }) => {
  try {
    return await api.update(body)
  } catch (err) {
    return rejectWithValue(err)
  }
})

export const taskRemove = createAsyncThunk(`${name}/remove`, async (id, { rejectWithValue }) => {
  try {
    return await api.remove(id)
  } catch (err) {
    return rejectWithValue(err)
  }
})

const initialState = {
  data: [],
  item: {},
  status: STATUS.IDLE,
  error: '',
  filter: {
    page: 1,
    limit: 5,
  },
  pagination: {
    page: 1,
    limit: 6,
    totalPage: 0,
    total: 0,
  },
}

export const taskSlice = createSlice({
  name,
  initialState,
  reducers: {
    resetStatus(state) {
      state.status = STATUS.IDLE
      state.error = ''
    },

    setFilter(state, { payload }) {
      state.filter = payload
    },
  },
  extraReducers: (builder) => {
    builder
      // Get All
      .addCase(taskGetAll.pending, (state) => {
        state.status = STATUS.LOADING
      })
      .addCase(taskGetAll.fulfilled, (state, { payload }) => {
        state.status = STATUS.LOADED
        state.data = payload.data
        state.pagination = payload.pagination
      })
      .addCase(taskGetAll.rejected, (state, { payload }) => {
        state.status = STATUS.FAILED
        state.error = `${payload}`
      })

    // Create
    builder
      .addCase(taskCreate.pending, (state) => {
        state.status = STATUS.LOADING
      })
      .addCase(taskCreate.fulfilled, (state) => {
        state.status = STATUS.CREATED
        toast.success('Task created successfully')
      })
      .addCase(taskCreate.rejected, (state, { payload }) => {
        const error = `${payload}` || 'Failed to create task'
        state.status = STATUS.FAILED
        state.error = error
        toast.error(error)
      })

    // Update
    builder
      .addCase(taskUpdate.pending, (state) => {
        state.status = STATUS.LOADING
      })
      .addCase(taskUpdate.fulfilled, (state, { payload }) => {
        state.status = STATUS.UPDATED
        state.data = state.data.map((item) => (item.id === payload.id ? payload : item))
        state.item = payload
        toast.success('Task updated successfully')
      })
      .addCase(taskUpdate.rejected, (state, { payload }) => {
        const error = `${payload}` || 'Failed to update task'
        state.status = STATUS.FAILED
        state.error = error
        toast.error(error)
      })

    // Remove
    builder
      .addCase(taskRemove.pending, (state) => {
        state.status = STATUS.LOADING
      })
      .addCase(taskRemove.fulfilled, (state) => {
        state.status = STATUS.REMOVED
        toast.success('Task removed successfully')
      })
      .addCase(taskRemove.rejected, (state, { payload }) => {
        const error = `${payload}` || 'Failed to delete task'
        state.status = STATUS.FAILED
        state.error = error
        toast.error(error)
      })
  },
})

export const { actions: taskActions, reducer: taskReducer } = taskSlice
