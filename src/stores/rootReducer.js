import { combineReducers } from '@reduxjs/toolkit'
import { authReducer } from './slices/authSlice'
import { employeeReducer } from './slices/employeeSlice'
import { taskReducer } from './slices/taskSlice'

export const rootReducer = combineReducers({
  auth: authReducer,
  employee: employeeReducer,
  task: taskReducer,
})
