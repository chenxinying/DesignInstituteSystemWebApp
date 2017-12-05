import api from '../../api'
import * as types from '../mutation-types'

const state = {
  loadEnd : false,
  start : 0,
  projects : [],
}

const mutations = {
  [types.ADD_MY_PROJECT_LIST] (state, projects){
    projects.forEach(element => {
      state.projects.push(element)
    });
  },
  [types.UPDATE_MY_PROJECT_START](state, start){
    state.start = start
  },
  [types.UPDATE_MY_PROJECT_LOAD_END] (state, loadEnd){
    state.loadEnd = loadEnd
  },
}

const actions = {
  addMyProject ({commit, state, rootState}){
    return new Promise((resolve, reject) => {
      api.getMySubProjects({
        openid: rootState.openid,
        start : state.start,
        count : rootState.request_count
      },
      projects => {
        if(projects.length < rootState.request_count)
          commit(types.UPDATE_MY_PROJECT_LOAD_END, true)

        commit(types.UPDATE_MY_PROJECT_START, state.start + projects.length)
        commit(types.ADD_MY_PROJECT_LIST, projects)
        resolve()
      },
      projects => {
        commit(types.UPDATE_MY_PROJECT_LOAD_END, true)
        resolve()
      })

    })
  },
}

export default {
  state,
  mutations,
  actions
}
