import api from '../../api'
import * as types from '../mutation-types'

const state = {
  loadEnd : true,
  start : 0,
  staffList : [],
}

const mutations = {
  [types.UPDATE_SUBPROJECT_STAFF_LIST] (state, lists){
    state.staffList = lists
  },
}

const actions = {
  updateStaffList ({commit, state, rootState}, queryParams) {
    return new Promise((resolve, reject) => {
      api.getSubprojectStaffList({
        company_id : rootState.user_info.company_id,
        start : state.start,
        count : rootState.request_count,
        ...queryParams
      },
      lists => {
        //commit(types.UPDATE_PROJECT_LOAD_END, true)
        //commit(types.UPDATE_PROJECT_START, state.start + projects.length)
        commit(types.UPDATE_SUBPROJECT_STAFF_LIST, lists)
        resolve()
      },
      lists => {
        //commit(types.UPDATE_PROJECT_LOAD_END, true)
        resolve()
      })
    })
  }
}

export default {
  state,
  mutations,
  actions
}
