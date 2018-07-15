import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

const createStore = () => {
  return new Vuex.Store({
    state: {
      baseUrl: 'http://veyuxb.natappfree.cc',
      houses: [],
      cities: [],
      products: [],
      characters: [],
      focusProduct: {},
      shoppingScroll: 0,
      focusHouse: {},
      focusCharacter: {},
      authUser: {},
      payments: {}
    },
    getters,
    actions,
    mutations
  })
}

export default createStore
