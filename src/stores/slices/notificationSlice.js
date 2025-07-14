import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  task: { count: 0, last: null },
  message: { count: 0, last: null },
  count: 0,
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    incrementTask: (state, action) => {
      state.task.count += 1
      state.task.last = action.payload
      state.count += 1
    },
    incrementMessage: (state, action) => {
      state.message.count += 1
      state.message.last = action.payload
      state.count += 1
    },
    resetTask: (state) => {
      state.count -= state.task.count
      state.task.count = 0
    },
    resetMessage: (state) => {
      state.count -= state.message.count
      state.message.count = 0
    },
  },
})

export const notificationActions = notificationSlice.actions
export const notificationReducer = notificationSlice.reducer
