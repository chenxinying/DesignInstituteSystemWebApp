import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import actions from './actions'
import mutations from './mutations'
import project from './modules/project'
import project_my from './modules/project-my'

import task from './modules/task'
import problem from './modules/problem'
import problem_project from './modules/problem-project'
import problem_my from './modules/problem-my'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  actions,
  mutations,
  modules: {
    project,
    project_my,
    task,
    problem,
    problem_project,
    problem_my
  }
})
