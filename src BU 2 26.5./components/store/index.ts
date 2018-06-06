import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  count: 0
}

const mutations = {
  DOMEASURESTATE (state:any) {
    state.count = 0
  },
  DOINSTRUMENTSTATE (state:any) {
    state.count = 1
  },
  TOGGLELISTSTATE (state:any) {
    if(state.count==2)
      state.count = 1 // go back to instrument state
    else
      state.count = 2;
  }
}

//const actions = {
 // incrementAsync ({ commit }) {
  //  setTimeout(() => {
  //    commit('INCREMENT')
  //  }, 200)
 // }
//}

const store = new Vuex.Store({
  state,
  mutations//,
  //actions
})

export default store
