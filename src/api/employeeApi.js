import axiosClient from './axiosClient'

const url = '/employees'

export const employeeApi = {
  getAll(params) {
    return axiosClient.get(url, { params })
  },
  getById(id) {
    return axiosClient.get(`${url}/${id}`)
  },
  create(body) {
    return axiosClient.post(url, body)
  },
  update(payload) {
    const { id, ...body } = payload
    return axiosClient.put(`${url}/${id}`, body)
  },
  remove(id) {
    return axiosClient.delete(`${url}/${id}`)
  },
}
