import api from '../../api'
import * as types from '../mutation-types'

const state = {
  loadEnd : false,
  project_list : [],
  current_page : 1,
  items_per_page : 10,
  subproject_flow_states : [{}]
}

const getters = {

}

const mutations = {
  [types.ADD_PROJECT_LIST] (state, projects){
    projects.forEach(element => {
      state.project_list.push(element)
    });
  },
  [types.UPDATE_PROJECT_CURRENT_PAGE](state, cp){
    state.current_page = cp
  },
  [types.UPDATE_PROJECT_LOAD_END] (state, loadEnd){
    state.loadEnd = loadEnd
  },
  [types.UPDATE_PROJECT_FLOW_STATES] (state, states){
    state.subproject_flow_states = [{}]
    states.forEach(element => {
      state.subproject_flow_states.push(element)
    });
  },
}

const actions = {
  getProjectList ({commit, state, rootState}) {

    return new Promise((resolve, reject) => {
      api.getProjectList({
        company_id : rootState.user_info.company_id,
        currentpage :  state.current_page,
        itemsPerPage : state.items_per_page
      },
        projects => {
          if(projects.length < state.items_per_page)
            commit(types.UPDATE_PROJECT_LOAD_END, true)

          commit(types.UPDATE_PROJECT_CURRENT_PAGE, state.current_page + 1)
          commit(types.ADD_PROJECT_LIST, projects)
          resolve()
        },
        projects => {
          commit(types.UPDATE_PROJECT_LOAD_END, true)
          resolve()
        })
    })

  },
  updateProjectLoadEnd ({commit}, loadEnd) {
    commit(types.UPDATE_PROJECT_LOAD_END, loadEnd)
  },

  getSubprojectFlowState({commit}, param){

    return new Promise((resolve, reject) => {

    api.getSubprojectFlowState(param,
      flowStates => {
        commit(types.UPDATE_PROJECT_FLOW_STATES, flowStates)
        resolve()
      },
      flowStates => {
        resolve()
      })

    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
