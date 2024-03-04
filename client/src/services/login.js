import axios from 'axios'
const baseUrl = '/api/users'

const signup = async credentials => {
  const response = await axios.post(`${baseUrl}/signup`, credentials)
  return response.data
}

const login = async credentials => {
  const response = await axios.post(`${baseUrl}/login`, credentials)
  return response.data
}

export default { login, signup }