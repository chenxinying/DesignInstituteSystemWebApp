import api from '../../api'
import * as types from '../mutation-types'

const state = {
  loadEnd : false,
  start : 0,
  problems : [],
  chargerNames : [{key:-1, value:'全部'}],
  creatorNames : [{key:-1, value:'全部'}],
}

const mutations = {
  [types.ADD_PROJECT_PROBLEM] (state, problems) {
    console.log("aaaa")
    problems.forEach(element => state.problems.push(element))
  },
  [types.UPDATE_PROJECT_PROBLEM] (state, problems) {
    state.problems = []
    problems.forEach(element => state.problems.push(element))
  },
  [types.UPDATE_PROJECT_PROBLEM_LOAD_END] (state, loadEnd){
    state.loadEnd = loadEnd
  },
  [types.UPDATE_PROJECT_PROBLEM_START] (state, start){
    state.start = start
  },
}

const actions = {
  addProjectProblem({ commit, state, rootState }, queryParams){
    return new Promise((resolve, reject) => {
      api.requestProblem({
        company_id: rootState.user_info.company_id,
        count: rootState.request_count,
        start: state.start,
        ...queryParams
        },
        problems => {
          if(problems.length < rootState.request_count) commit(types.UPDATE_PROJECT_PROBLEM_LOAD_END, true)

          commit(types.UPDATE_PROJECT_PROBLEM_START, state.start + problems.length)
          commit(types.ADD_PROJECT_PROBLEM, problems)

          resolve()
        },
        problems => {
          commit(types.UPDATE_PROJECT_PROBLEM_LOAD_END, true)
          resolve()
      })
    })
  },
  clearProjectProblem({ commit }){
    commit(types.UPDATE_PROJECT_PROBLEM_LOAD_END, false)
    commit(types.UPDATE_PROJECT_PROBLEM_START, 0)
    commit(types.UPDATE_PROJECT_PROBLEM, [])
  },
}

export default {
  state,
  mutations,
  actions
}
