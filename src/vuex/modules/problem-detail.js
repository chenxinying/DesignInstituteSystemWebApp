import api from '../../api'
import * as types from '../mutation-types'

//问题的详细信息
const state = {
  problem_detail : {},//子项目详细信息
}

const mutations = {
  [types.UPDATE_PROBLEM_DETAIL] (state, detail){
    state.problem_detail = {...detail}
  },
}

const actions = {
  updateProblemDetail({commit}, detail){
    commit(types.UPDATE_PROBLEM_DETAIL, detail)
  },
}

export default {
  state,
  mutations,
  actions
}
