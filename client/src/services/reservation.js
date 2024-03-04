import axios from "axios"
const baseUrl = '/api/reservations'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAllReservations = async () => {
  const response = await axios.get(`${baseUrl}/getAll`)
  return response.data
}

const getUserReservations = async () => {
  if (!token) return
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.get(baseUrl, config)
  return response.data
}

const createReservation = newObject => {
  const config = {
    headers: { Authorization: token }
  }

  const request = axios.post(baseUrl, newObject, config)
  return request.then(response => response.data)
}

const deleteReservation = id => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}

export default { getUserReservations, getAllReservations, createReservation, deleteReservation, setToken }