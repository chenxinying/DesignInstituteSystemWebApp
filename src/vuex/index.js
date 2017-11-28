import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import actions from './actions'
import mutations from './mutations'
import project from './modules/project'
import task from './modules/task'
import problem from './modules/problem'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  actions,
  mutations,
  modules: {
    project,
    task,
    problem
  }
})
