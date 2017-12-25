import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import actions from './actions'
import mutations from './mutations'

import project from './modules/project'
import project_my from './modules/project-my'
import project_staff from './modules/project-staff'
import project_detail from './modules/project-detail'

import task from './modules/task'
import task_my from './modules/task-my'
import task_staff from './modules/task-staff'
import task_detail from './modules/task-detail'

import problem from './modules/problem'
import problem_project from './modules/problem-project'
import problem_my from './modules/problem-my'
import problem_detail from './modules/problem-detail'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  actions,
  mutations,
  modules: {
    project,
    project_my,
    project_staff,
    project_detail,

    task,
    task_my,
    task_staff,
    task_detail,

    problem,
    problem_project,
    problem_my,
    problem_detail
  }
})
