import { authApi } from '@/api/authApi'
import { STATUS } from '@/constants/common'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

const name = 'auth'
const api = authApi

const initialState = {
  profile: null,
  token: localStorage.getItem('token') || '',
  phone: '',
  email: '',
  status: 'idle',
  error: '',
  accessCodeId: '',
}

// ======= THUNKS =======
// Phone
export const loginByPhone = createAsyncThunk(
  `${name}/authLoginByPhone`,
  async (body, { rejectWithValue }) => {
    try {
      return await api.loginByPhone(body)
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

export const verifyOtpByPhone = createAsyncThunk(
  `${name}/verifyOtpByPhone`,
  async (body, { rejectWithValue }) => {
    try {
      return await api.verifyOtpByPhone(body)
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

export const resendOtpByPhone = createAsyncThunk(
  `${name}/resendOtpByPhone`,
  async (body, { rejectWithValue }) => {
    try {
      return await api.resendOtpByPhone(body)
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

// Email
export const loginByEmail = createAsyncThunk(
  `${name}/authLoginByEmail`,
  async (body, { rejectWithValue }) => {
    try {
      return await api.loginByEmail(body)
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

export const verifyOtpByEmail = createAsyncThunk(
  `${name}/verifyOtpByEmail`,
  async (body, { rejectWithValue }) => {
    try {
      return await api.verifyOtpByEmail(body)
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

export const resendOtpByEmail = createAsyncThunk(
  `${name}/resendOtpByEmail`,
  async (body, { rejectWithValue }) => {
    try {
      return await api.resendOtpByEmail(body)
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

// Me
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

// ======= SLICE =======
export const authSlice = createSlice({
  name,
  initialState,
  reducers: {
    logout(state) {
      state.profile = null
      state.token = ''
      state.phone = ''
      state.email = ''
      localStorage.removeItem('token')
    },

    reset(state) {
      state.error = ''
      state.phone = ''
      state.email = ''
      state.status = STATUS.IDLE
    },
  },
  extraReducers: (builder) => {
    // ===== PHONE =====
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
        state.error = `${payload}`
      })

    builder
      .addCase(verifyOtpByPhone.pending, (state) => {
        state.status = STATUS.LOADING
        state.error = null
      })
      .addCase(verifyOtpByPhone.fulfilled, (state, { payload }) => {
        state.status = STATUS.VERIFIED
        state.token = payload.token
        state.profile = payload.user
      })
      .addCase(verifyOtpByPhone.rejected, (state, { payload }) => {
        state.status = STATUS.FAILED
        state.error = `${payload}`
        toast.error(`${payload}`)
      })

    builder
      .addCase(resendOtpByPhone.pending, (state) => {
        state.status = STATUS.LOADING
        state.error = null
      })
      .addCase(resendOtpByPhone.fulfilled, (state, { payload }) => {
        state.status = STATUS.LOADED
        state.accessCodeId = payload.accessCodeId
      })
      .addCase(resendOtpByPhone.rejected, (state, { payload }) => {
        state.status = STATUS.FAILED
        state.error = `${payload}`
        toast.error(`${payload}`)
      })

    // ===== EMAIL =====
    builder
      .addCase(loginByEmail.pending, (state) => {
        state.status = STATUS.LOADING
        state.error = null
      })
      .addCase(loginByEmail.fulfilled, (state, { payload }) => {
        state.status = STATUS.LOGGED_IN
        state.email = payload.email
        state.accessCodeId = payload.accessCodeId
      })
      .addCase(loginByEmail.rejected, (state, { payload }) => {
        state.status = STATUS.FAILED
        state.error = `${payload}`
        toast.error(`${payload}`)
      })

    builder
      .addCase(verifyOtpByEmail.pending, (state) => {
        state.status = STATUS.LOADING
        state.error = null
      })
      .addCase(verifyOtpByEmail.fulfilled, (state, { payload }) => {
        state.status = STATUS.VERIFIED
        state.token = payload.token
        state.profile = payload.user
      })
      .addCase(verifyOtpByEmail.rejected, (state, { payload }) => {
        state.status = STATUS.FAILED
        state.error = `${payload}`
        toast.error(`${payload}`)
      })

    builder
      .addCase(resendOtpByEmail.pending, (state) => {
        state.status = STATUS.LOADING
        state.error = null
      })
      .addCase(resendOtpByEmail.fulfilled, (state, { payload }) => {
        state.status = STATUS.LOADED
        state.accessCodeId = payload.accessCodeId
      })
      .addCase(resendOtpByEmail.rejected, (state, { payload }) => {
        state.status = STATUS.FAILED
        state.error = `${payload}`
        toast.error(`${payload}`)
      })

    // ===== ME =====
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
        state.error = `${payload}`
      })

    builder
      .addCase(updateMe.pending, (state) => {
        state.status = STATUS.LOADING
        state.error = null
      })
      .addCase(updateMe.fulfilled, (state, { payload }) => {
        state.status = STATUS.UPDATED
        state.profile = payload
      })
      .addCase(updateMe.rejected, (state, { payload }) => {
        state.status = STATUS.FAILED
        state.error = `${payload}`
        toast.error(`${payload}`)
      })
  },
})

export const { actions: authActions, reducer: authReducer } = authSlice
