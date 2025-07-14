import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { employeeApi } from '@/api/employeeApi'
import { STATUS } from '@/constants/common'
import { toast } from 'react-toastify'

const name = 'employee'
const api = employeeApi

export const employeeGetAll = createAsyncThunk(
  `${name}/getAll`,
  async (params, { rejectWithValue }) => {
    try {
      return await api.getAll(params)
    } catch (err) {
      return rejectWithValue(err)
    }
  },
)

export const employeeGetActive = createAsyncThunk(
  `${name}/getActive`,
  async (_, { rejectWithValue }) => {
    try {
      return await api.getActive()
    } catch (err) {
      return rejectWithValue(err)
    }
  },
)

export const employeeCreate = createAsyncThunk(
  `${name}/create`,
  async (body, { rejectWithValue }) => {
    try {
      return await api.create(body)
    } catch (err) {
      console.log(err)
      return rejectWithValue(err)
    }
  },
)

export const employeeUpdate = createAsyncThunk(
  `${name}/update`,
  async (body, { rejectWithValue }) => {
    try {
      return await api.update(body)
    } catch (err) {
      return rejectWithValue(err)
    }
  },
)

export const employeeRemove = createAsyncThunk(
  `${name}/remove`,
  async (id, { rejectWithValue }) => {
    try {
      return await api.remove(id)
    } catch (err) {
      return rejectWithValue(err)
    }
  },
)

const initialState = {
  data: [],
  item: {},
  activeData: [],
  status: STATUS.IDLE,
  error: '',
  filter: {
    page: 1,
    limit: 5,
    role: 'employee',
  },
  pagination: {
    page: 1,
    limit: 6,
    totalPage: 0,
    total: 0,
  },
}

export const employeeSlice = createSlice({
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
    // Get All
    builder
      .addCase(employeeGetAll.pending, (state) => {
        state.status = STATUS.LOADING
      })
      .addCase(employeeGetAll.fulfilled, (state, { payload }) => {
        state.status = STATUS.LOADED
        state.data = payload.data
        state.pagination = payload.pagination
      })
      .addCase(employeeGetAll.rejected, (state, { payload }) => {
        state.status = STATUS.FAILED
        state.error = `${payload}`
      })

    // Get active
    builder
      .addCase(employeeGetActive.pending, (state) => {
        state.status = STATUS.LOADING
      })
      .addCase(employeeGetActive.fulfilled, (state, { payload }) => {
        state.status = STATUS.LOADED
        state.activeData = payload
      })
      .addCase(employeeGetActive.rejected, (state, { payload }) => {
        state.status = STATUS.FAILED
        state.error = `${payload}`
      })

    // Create
    builder
      .addCase(employeeCreate.pending, (state) => {
        state.status = STATUS.LOADING
      })
      .addCase(employeeCreate.fulfilled, (state) => {
        state.status = STATUS.CREATED
        toast.success('Employee created successfully')
      })
      .addCase(employeeCreate.rejected, (state, { payload }) => {
        const error = `${payload}` || 'Failed to create employee'
        state.status = STATUS.FAILED
        state.error = error
        toast.error(error)
      })

    // Update
    builder
      .addCase(employeeUpdate.pending, (state) => {
        state.status = STATUS.LOADING
      })
      .addCase(employeeUpdate.fulfilled, (state, { payload }) => {
        state.status = STATUS.UPDATED
        state.data = state.data.map((item) => (item.id === payload.id ? payload : item))
        state.item = payload
        toast.success('Employee updated successfully')
      })
      .addCase(employeeUpdate.rejected, (state, { payload }) => {
        const error = `${payload}` || 'Failed to update employee'
        state.status = STATUS.FAILED
        state.error = error
        toast.error(error)
      })

    // Remove
    builder
      .addCase(employeeRemove.pending, (state) => {
        state.status = STATUS.LOADING
      })
      .addCase(employeeRemove.fulfilled, (state) => {
        state.status = STATUS.REMOVED
        toast.success('Employee removed successfully')
      })
      .addCase(employeeRemove.rejected, (state, { payload }) => {
        const error = `${payload}` || 'Failed to delete employee'
        state.status = STATUS.FAILED
        state.error = error
        toast.error(error)
      })
  },
})

export const { actions: employeeActions, reducer: employeeReducer } = employeeSlice
