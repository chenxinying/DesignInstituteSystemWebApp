import api from '../../api'
import * as types from '../mutation-types'

const state = {
  loadEnd : false,
  projectList : [],
  subprojectList : [],
  start : 0,

  projectNames : [{key:-1, value:'全部'}],
  subprojectNames : [{key:-1, value:'全部'}],
}

const mutations = {
  [types.ADD_PROJECT_LIST] (state, projects){
    projects.forEach(element => {
      state.projectList.push(element)
      state.subprojectList.push({project_id: element.project_id, start : 0, loadEnd: false, data : []})
    });
  },
  [types.UPDATE_PROJECT_LIST] (state, projects){
    state.projectList = []
    state.subprojectList = []
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
}

const actions = {
  getProjectList ({commit, state, rootState}, queryParams) {
    return new Promise((resolve, reject) => {
      api.getProjectList({
        company_id : rootState.user_info.company_id,
        start : state.start,
        count : rootState.request_count,
        ...queryParams
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
  clearProjectList({commit}) {
    commit(types.UPDATE_PROJECT_START, 0)
    commit(types.UPDATE_PROJECT_LOAD_END, false)
    commit(types.UPDATE_PROJECT_LIST, [])
  },
  getSubProjectList({commit, state, rootState}, queryParams) {
        var project_id = queryParams.project_id
        return new Promise((resolve, reject) => {
          var subprojectInfo = state.subprojectList.find(item => item.project_id==project_id)
          api.getSubprojectList({
            start : subprojectInfo ? subprojectInfo.start : 0,
            count : rootState.request_count,
            ...queryParams
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
  clearSubProjectList({commit, state, rootState}, project_id){
    var subprojectInfo = state.subprojectList.find(item => item.project_id==project_id)
    subprojectInfo.loadEnd = false
    subprojectInfo.start = 0
    subprojectInfo.data = []
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
  updateSubProjectNames({ commit, state }, queryParams){
    if(queryParams.project_id == -1){
      commit(types.UPDATE_SUBPROJECT_NAME, [])
      return
    }
    api.getSubProjectNames(
      queryParams,
      subprojectNames => {
        commit(types.UPDATE_SUBPROJECT_NAME, subprojectNames)
      },
      subprojectNames => {
    })
  },
}

export default {
  state,
  mutations,
  actions
}
