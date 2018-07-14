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
  }
}
