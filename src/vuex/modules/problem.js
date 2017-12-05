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
  [types.ADD_PROBLEM] (state, problems) {
    problems.forEach((value, index, array) => state.problems.push(value))
  },
  [types.UPDATE_PROBLEM] (state, problems) {
    state.problems = []
    problems.forEach((value, index, array) => state.problems.push(value))
  },
  [types.UPDATE_PROBLEM_LOAD_END] (state, loadEnd){
    state.loadEnd = loadEnd
  },
  [types.UPDATE_PROBLEM_START] (state, start){
    state.start = start
  },
  [types.UPDATE_CHARGER_NAME] (state, names){
    state.chargerNames = [{key:-1, value:'全部'}]
    names.forEach((value, index, array) => state.chargerNames.push({key: value.changer_id, value: value.changer_nickname}))
  },
  [types.UPDATE_CREATOR_NAME] (state, names){
    state.creatorNames = [{key:-1, value:'全部'}]
    names.forEach((value, index, array) => state.creatorNames.push({key: value.creator_id, value: value.creator_nickname}))
  },
}

const actions = {
  addProblem({ commit, state, rootState }, queryParams){
    return new Promise((resolve, reject) => {
      api.requestProblem({
        company_id: rootState.user_info.company_id,
        count: rootState.request_count,
        start:  state.start,
        ...queryParams
        },
        problems => {
          if(problems.length < rootState.request_count)
            commit(types.UPDATE_PROBLEM_LOAD_END, true)

          commit(types.UPDATE_PROBLEM_START, state.start + problems.length)
          commit(types.ADD_PROBLEM, problems)
          resolve()
        },
        problems => {
          commit(types.UPDATE_PROBLEM_LOAD_END, true)
          resolve()
      })
    })
  },
  clearProblem({ commit }, isMyProblem){
      commit(types.UPDATE_PROBLEM_LOAD_END, false)
      commit(types.UPDATE_PROBLEM_START, 0)
      commit(types.UPDATE_PROBLEM, [])
  },
  getProblemUserNames({ commit, state, rootState }){
    api.getProblemUserNames({
      company_id: rootState.user_info.company_id,
      },
      data => {
        commit(types.UPDATE_CHARGER_NAME, data.changer)
        commit(types.UPDATE_CREATOR_NAME, data.creator)
      },
      data => {

    })
  }
}

export default {
  state,
  mutations,
  actions
}
