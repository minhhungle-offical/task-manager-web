import { combineReducers } from '@reduxjs/toolkit'
import { authReducer } from './slices/authSlice'
import { employeeReducer } from './slices/employeeSlice'

export const rootReducer = combineReducers({
  auth: authReducer,
  employee: employeeReducer,
})
