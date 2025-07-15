import { combineReducers } from '@reduxjs/toolkit'
import { authReducer } from './slices/authSlice'
import { employeeReducer } from './slices/employeeSlice'
import { taskReducer } from './slices/taskSlice'
import { notificationReducer } from './slices/notificationSlice'
import { messageReducer } from './slices/messageSlice'

export const rootReducer = combineReducers({
  auth: authReducer,
  employee: employeeReducer,
  task: taskReducer,
  notification: notificationReducer,
  message: messageReducer,
})
