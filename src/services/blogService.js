import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const req = axios.get(baseUrl)
  return req.then(res => res.data)
}

const create = async (newObject, login) => {
  setToken(login)
  const payload = {
    headers: { Authorization: token },
  }

  const res = await axios.post(baseUrl, newObject, payload)
  return res.data
}

const update = async (id, newObject, login) => {
  setToken(login)
  const payload = {
    headers: { Authorization: token },
  }
  const res = await axios.put(`${baseUrl}/${id}`, newObject,payload)
  return res.data
}

const remove = async (id, login) => {
  setToken(login)
  const payload = {
    headers: { Authorization: token },
  }

  const res = await axios.delete(`${baseUrl}/${id}`, payload)
  return res.data
}


export default { getAll, create, setToken, update, remove }