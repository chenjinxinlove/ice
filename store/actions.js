import Services from './services'

export default {
  getWechatSignature({ commit }, url) {
    return Services.getWechatSignature(url)
  },
  getUserByOAuth({ commit }, url) {
    return Services.getWechatOAuth(url)
  },
  async fetchHouses({ state }) {
    const res = await Services.fetchHouses()
    state.houses = res.data.data
  },
  async fetchCharacter({ state }) {
    const res = await Services.fetchCharacter()
    state.characters = res.data.data
  },
  async fetchCities({ state }) {
    const res = await Services.fetchCities()
    state.cities = res.data.data
  },
  async focusHouse({ state }, _id) {
    if (_id === state.focusHouse._id) return
    const res = await Services.focusHouse(_id)
    state.focusHouse = res.data
    return res
  },
  async focusCharacter({ state }, _id) {
    if (_id === state.focusCharacter._id) return
    const res = await Services.focusCharacter(_id)
    state.focusCharacter = res.data
    return res
  },
  async fetchProducts({ state }) {
    const res = await Services.allProducts()

    console.log(res.data)
    state.products = res.data
    return res
  },
  async ß({ state }, _id) {
    if (_id === state.focusProduct._id) return
    const res = await Services.focusProduct(_id)
    state.focusProduct = res.data
    return res
  },
  async fetchPayments({ state }) {
    let { data } = await Services.getPayments()
    console.log(data)
    state.payments = data
    return data
  }

}
