import Vue from 'vue'
import Vuex from 'vuex'

import pianoData from './piano'
Vue.use(Vuex)

export default new Vuex.Store({
  actions: {},
  modules: {
    Piano: pianoData
  }
})
