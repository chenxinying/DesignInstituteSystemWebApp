import api from '../../api'
import * as types from '../mutation-types'

const state = {
  loadEnd : false,
  start : 0,
  problems : [],
  projectNames : [{key:-1, value:'全部'}],
  subprojectNames : [{key:-1, value:'全部'}],
  chargerNames : [{key:-1, value:'全部'}],
  creatorNames : [{key:-1, value:'全部'}]
}

const getters = {

}

const mutations = {
  [types.ADD_PROBLEM] (state, problems) {
    problems.forEach((value, index, array) => state.problems.push(value))
    sessionStorage.setItem('problems', JSON.stringify(state.problems))
  },
  [types.UPDATE_PROBLEM] (state, problems) {
    state.problems = []
    problems.forEach((value, index, array) => state.problems.push(value))
    sessionStorage.setItem('problems', JSON.stringify(state.problems))
  },
  [types.UPDATE_PROBLEM_LOAD_END] (state, loadEnd){
    state.loadEnd = loadEnd
  },
  [types.UPDATE_PROBLEM_START] (state, start){
    state.start = start
  },
  [types.ADD_PROJECT_NAME] (state, names){
    names.forEach((value, index, array) => state.projectNames.push({key: value.id, value: value.name}))
  },
  [types.UPDATE_SUBPROJECT_NAME] (state, names){
    state.subprojectNames = [{key:-1, value:'全部'}]
    names.forEach((value, index, array) => state.subprojectNames.push({key: value.id, value: value.name}))
  },
  [types.ADD_CHARGER_NAME] (state, names){
    names.forEach((value, index, array) => state.chargerNames.push({key: value.changer_id, value: value.changer_nickname}))
  },
  [types.ADD_CREATOR_NAME] (state, names){
    names.forEach((value, index, array) => state.creatorNames.push({key: value.creator_id, value: value.creator_nickname}))
  }
}

const actions = {
  requestProblem({ commit, state, rootState }, params){
    if(params){
      commit(types.UPDATE_PROBLEM_START, 0)
    }

    return new Promise((resolve, reject) => {
      api.requestProblem({
        company_id: rootState.user_info.company_id,
        start: state.start,
        count: rootState.request_count,
        ...params
        },
        problems => {
          if(problems.length < rootState.request_count)
            commit(types.UPDATE_PROBLEM_LOAD_END, true)

          commit(types.UPDATE_PROBLEM_START, state.start + problems.length)

          params ? commit(types.UPDATE_PROBLEM, problems) : commit(types.ADD_PROBLEM, problems)

          resolve()
        },
        problems => {
          commit(types.UPDATE_PROBLEM_LOAD_END, true)
          resolve()
      })

    })

  },
  updateProblemLoadEnd ({commit}, loadEnd) {
    commit(types.UPDATE_PROBLEM_LOAD_END, loadEnd)
  },
  getProjectNames({ commit, state, rootState }){
    api.getProjectNames({
      company_id: rootState.user_info.company_id,
      },
      projectNames => {
        commit(types.ADD_PROJECT_NAME, projectNames)
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
  getProblemUserNames({ commit, state, rootState }){
    api.getProblemUserNames({
      company_id: rootState.user_info.company_id,
      },
      data => {
        commit(types.ADD_CHARGER_NAME, data.changer)
        commit(types.ADD_CREATOR_NAME, data.creator)
      },
      data => {

    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}