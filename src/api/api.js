import axios from 'axios'

const api = axios.create({
  baseURL: 'http://192.168.2.34:3000/',
})

export const getChairs = async () => {
  try {
    const { data } = await api.get('api/v1/leader-board')
    return data
  } catch (e) {
    console.log(e)
  }
  return []
}

export const getParty = async id => {
  try {
    const { data } = await api.get(`api/v1/party?id=${id}`)
    return data
  } catch (e) {
    console.log(e)
  }
  return {
    id: -1,
    name: 'พรรค null',
    budget: 0,
  }
}

export const bid = async (pid, cid, price) => {
  if (!(pid && pid - 0 === Math.floor(pid - 0) && pid - 0 >= 1 && pid - 0 <= 7))
    return
  if (!(cid && cid - 0 === Math.floor(cid - 0) && cid - 0 >= 1 && cid - 0 <= 5))
    return
  api.post(`api/v1/bid?partyId=${pid}&chairId=${cid}&amount=${price + 1}`)
}

window.aucbid = bid
