import Vue from 'vue'
import Vuex from 'vuex'
import { AjaxPlugin } from 'vux'
import * as types from '../mutation-types'

Vue.use(Vuex)
Vue.use(AjaxPlugin)

const state = {
  scrollTop : 0
}

const getters = {

}

const mutations = {
  [types.UPDATE_TASK_SCROLLTOP] (state, payload){
    state.scrollTop = payload.top
  }
}

const actions = {
  updateTaskScrollTop ({commit}, top) {
    commit({type: types.UPDATE_TASK_SCROLLTOP, top: top})
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
