import axios from 'axios'

const api = axios.create({
  baseURL: 'https://some-domain.com/api/',
})

export const test = async () => {
  await api.get('/user/12345')
}
