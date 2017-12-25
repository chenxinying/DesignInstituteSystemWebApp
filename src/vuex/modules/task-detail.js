import api from '../../api'
import * as types from '../mutation-types'

//任务的详细信息
const state = {
  task_detail : {},//子项目详细信息
}

const mutations = {
  [types.UPDATE_TASK_DETAIL] (state, detail){
    state.task_detail = {...detail}
  },
}

const actions = {
  updateTaskDetail({commit}, detail){
    commit(types.UPDATE_TASK_DETAIL, detail)
  },
}

export default {
  state,
  mutations,
  actions
}
