import axiosClient from './axiosClient'

const url = '/managers'

export const managerApi = {
  login(body) {
    return axiosClient.post(`${url}/login`, body)
  },
  verifyOtp(body) {
    return axiosClient.post(`${url}/verify-otp`, body)
  },
  getManager() {
    return axiosClient.post(`${url}/profile`)
  },
}
