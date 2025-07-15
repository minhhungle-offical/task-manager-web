import axiosClient from './axiosClient'
const url = '/messages'

export const messageApi = {
  getAll(params) {
    return axiosClient.get(`${url}`, { params })
  },
}
