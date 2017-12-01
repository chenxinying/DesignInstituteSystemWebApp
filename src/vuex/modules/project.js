import api from '../../api'
import * as types from '../mutation-types'

const state = {
  loadEnd : false,
  projectList : [],
  subprojectList : [],
  start : 0,
  subproject_flow_states : [{}],

  myLoadEnd : false,
  myStart : 0,
  myProjectList : []
}

const getters = {

}

const mutations = {
  [types.ADD_PROJECT_LIST] (state, projects){
    projects.forEach(element => {
      state.projectList.push(element)
      state.subprojectList.push({project_id: element.project_id, start : 0, loadEnd: false, data : []})
    });
  },
  [types.UPDATE_PROJECT_START](state, start){
    state.start = start
  },
  [types.UPDATE_PROJECT_LOAD_END] (state, loadEnd){
    state.loadEnd = loadEnd
  },
  [types.ADD_MY_PROJECT_LIST] (state, projects){
    projects.forEach(element => {
      state.myProjectList.push(element)
    });
  },
  [types.UPDATE_MY_PROJECT_START](state, start){
    state.myStart = start
  },
  [types.UPDATE_MY_PROJECT_LOAD_END] (state, loadEnd){
    state.myLoadEnd = loadEnd
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
        start : state.start,
        count : rootState.request_count
      },
        projects => {
          if(projects.length < rootState.request_count)
            commit(types.UPDATE_PROJECT_LOAD_END, true)

          commit(types.UPDATE_PROJECT_START, state.start + projects.length)
          commit(types.ADD_PROJECT_LIST, projects)
          resolve()
        },
        projects => {
          commit(types.UPDATE_PROJECT_LOAD_END, true)
          resolve()
        })
    })

  },
  getSubProjectList({commit, state, rootState}, project_id) {

        return new Promise((resolve, reject) => {

          var subprojectInfo = state.subprojectList.find(item => item.project_id==project_id)

          api.getSubprojectList({
            project_id : project_id,
            start : subprojectInfo ? subprojectInfo.start : 0,
            count : rootState.request_count
          },
          projects => {
            if(projects.length < rootState.request_count)
              subprojectInfo.loadEnd = true

            subprojectInfo.start += projects.length

            projects.forEach(element => {
              subprojectInfo.data.push(element)
            });

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
  },
  getMyProjectList({commit, state, rootState}){
    return new Promise((resolve, reject) => {
      api.getMySubProjects({
        openid: rootState.openid,
        start : state.myStart,
        count : rootState.request_count
      },
      projects => {
        if(projects.length < rootState.request_count)
          commit(types.UPDATE_MY_PROJECT_LOAD_END, true)

        commit(types.UPDATE_MY_PROJECT_START, state.myStart + projects.length)
        commit(types.ADD_MY_PROJECT_LIST, projects)
        resolve()
      },
      projects => {
        commit(types.UPDATE_MY_PROJECT_LOAD_END, true)
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
