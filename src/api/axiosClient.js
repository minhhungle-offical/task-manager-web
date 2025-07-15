import { baseUrl } from '@/constants/common'
import axios from 'axios'

const axiosClient = axios.create({
  baseURL: `${baseUrl}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

axiosClient.interceptors.response.use(
  (response) => {
    const { data } = response
    return data?.meta ? data : data.data ?? data
  },
  (error) => {
    const status = error.response?.status
    const message = error.response?.data?.message || 'Something went wrong!'

    if (status === 401) {
      console.warn('Token invalid. Removing token & redirecting...')

      localStorage.removeItem('accessToken')

      // window.location.href = '/auth/login'
    }

    return Promise.reject(message)
  },
)

export default axiosClient
