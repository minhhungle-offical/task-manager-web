import { authApi } from '@/api/authApi'
import { STATUS } from '@/constants/common'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const name = 'auth'
const api = authApi

const initialState = {
  profile: null,
  token: localStorage.getItem('token') || '',
  phone: '',
  status: 'idle',
  error: '',
  accessCodeId: '',
}

export const loginByPhone = createAsyncThunk(
  `${name}/authLogin`,
  async (body, { rejectWithValue }) => {
    try {
      return await api.loginByPhone(body)
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

export const verifyOtpByPhone = createAsyncThunk(
  `${name}/authVerifyOtp`,
  async (body, { rejectWithValue }) => {
    try {
      return await api.verifyOtpByPhone(body)
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

export const getMe = createAsyncThunk(`${name}/getMe`, async (_, { rejectWithValue }) => {
  try {
    return await api.getMe()
  } catch (error) {
    return rejectWithValue(error)
  }
})

export const updateMe = createAsyncThunk(`${name}/updateMe`, async (body, { rejectWithValue }) => {
  try {
    return await api.updateMe(body)
  } catch (error) {
    return rejectWithValue(error)
  }
})

export const authSlice = createSlice({
  name,
  initialState,
  reducers: {
    logout(state) {
      state.user = null
      state.token = ''
    },

    reset(state) {
      state.error = ''
      state.phone = ''
      state.status = STATUS.IDLE
    },
  },
  extraReducers: (builder) => {
    // login by phone
    builder
      .addCase(loginByPhone.pending, (state) => {
        state.status = STATUS.LOADING
        state.error = null
      })
      .addCase(loginByPhone.fulfilled, (state, { payload }) => {
        state.status = STATUS.LOGGED_IN
        state.phone = payload.phone
        state.accessCodeId = payload.accessCodeId
      })
      .addCase(loginByPhone.rejected, (state, { payload }) => {
        state.status = STATUS.FAILED
        state.error = payload.message
      })

    //  verify otp by phone
    builder
      .addCase(verifyOtpByPhone.pending, (state) => {
        state.status = STATUS.LOADING
        state.error = null
      })
      .addCase(verifyOtpByPhone.fulfilled, (state, { payload }) => {
        state.status = STATUS.VERIFIED
        state.token = payload.token
        state.user = payload.user
      })
      .addCase(verifyOtpByPhone.rejected, (state, { payload }) => {
        state.status = STATUS.FAILED
        state.error = payload.message
      })

    // Profile
    builder
      .addCase(getMe.pending, (state) => {
        state.status = STATUS.LOADING
        state.error = null
      })
      .addCase(getMe.fulfilled, (state, { payload }) => {
        state.status = STATUS.LOADED
        state.profile = payload
      })
      .addCase(getMe.rejected, (state, { payload }) => {
        state.status = STATUS.FAILED
        state.error = payload.message
      })
  },
})

export const { actions: authActions, reducer: authReducer } = authSlice
