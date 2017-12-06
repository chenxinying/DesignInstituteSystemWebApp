import api from '../../api'
import * as types from '../mutation-types'

const state = {
  loadEnd : false,
  projectList : [],
  subprojectList : [],
  start : 0,

  projectNames : [{key:-1, value:'全部'}],
  subprojectNames : [{key:-1, value:'全部'}],

  subproject_flow_states : [{}],//节点记录
  subproject_time_lines : [],//动态记录
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
  [types.UPDATE_PROJECT_NAME] (state, names){
    state.projectNames = [{key:-1, value:'全部'}]
    names.forEach((value, index, array) => state.projectNames.push({key: value.id, value: value.name}))
  },
  [types.UPDATE_SUBPROJECT_NAME] (state, names){
    state.subprojectNames = [{key:-1, value:'全部'}]
    names.forEach((value, index, array) => state.subprojectNames.push({key: value.id, value: value.name}))
  },
  [types.UPDATE_PROJECT_FLOW_STATES] (state, states){
    state.subproject_flow_states = [{}]
    states.forEach(element => {
      state.subproject_flow_states.push(element)
    });
  },
  [types.UPDATE_PROJECT_TIME_LINES] (state, states){
    state.subproject_time_lines = []
    states.forEach(element => {
      state.subproject_time_lines.push(element)
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
          console.log("failed")
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
            if(projects.length < rootState.request_count) subprojectInfo.loadEnd = true

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
  getProjectNames({ commit, state, rootState }, isMyProject){
    api.getProjectNames({
      company_id: rootState.user_info.company_id,
      openid : isMyProject ? rootState.openid : undefined
      },
      projectNames => {
        commit(types.UPDATE_PROJECT_NAME, projectNames)
      },
      projectNames => {
    })
  },
  updateSubProjectNames({ commit, state }, project_id){
    if(project_id == -1){
      commit(types.UPDATE_SUBPROJECT_NAME, [])
      return
    }
    api.getSubProjectNames({
      project_id: project_id,
      },
      subprojectNames => {
        commit(types.UPDATE_SUBPROJECT_NAME, subprojectNames)
      },
      subprojectNames => {
    })
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
  getProjectTrailInfo({commit}, param){
    return new Promise((resolve, reject) => {
      api.getProjectTrailInfo(param,
        flowStates => {
          commit(types.UPDATE_PROJECT_TIME_LINES, flowStates)
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
  mutations,
  actions
}
