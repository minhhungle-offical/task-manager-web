import axiosClient from './axiosClient'

const url = '/auth'

export const authApi = {
  // phone
  loginByPhone(body) {
    return axiosClient.post(`${url}/login-by-phone`, body)
  },
  verifyOtpByPhone(body) {
    return axiosClient.post(`${url}/verify-otp-by-phone`, body)
  },

  // email
  loginByEmail(body) {
    return axiosClient.post(`${url}/login-by-email`, body)
  },
  verifyOtpByEmail(body) {
    return axiosClient.post(`${url}/verify-otp-by-email`, body)
  },

  // profile
  getMe() {
    return axiosClient.get(`${url}/me`)
  },

  updateMe(body) {
    return axiosClient.put(`${url}/update-me`, body, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },
}
