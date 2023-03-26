import axios from 'axios'
const baseUrl = '/api/users'

const getUser = async (id) => {
  const res = await axios.get(`${baseUrl}/${id}`)
  return res.data
}

// eslint-disable-next-line
export default { getUser };