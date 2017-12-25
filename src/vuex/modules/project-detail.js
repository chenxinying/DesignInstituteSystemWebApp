import api from '../../api'
import * as types from '../mutation-types'

//子项目的详细信息
const state = {
  subproject_detail : {},//子项目详细信息

  subproject_flow_states : [{}],//节点记录
  subproject_time_lines : [],//动态记录

  subproject_problem_statistics : {}, //子项目问题统计
  subproject_task_statistics : {},    //子项目任务统计
}

const mutations = {
  [types.UPDATE_SUBPROJECT_DETAIL] (state, detail){
    state.subproject_detail = {...detail}
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
  [types.UPDATE_SUBPROJECT_PROBLEM_STATISTICS] (state, statistics){
    state.subproject_problem_statistics = statistics
  },
  [types.UPDATE_SUBPROJECT_TASK_STATISTICS] (state, statistics){
    state.subproject_task_statistics = statistics
  }
}

const actions = {
  updateSubprojectDetail({commit}, detail){
    commit(types.UPDATE_SUBPROJECT_DETAIL, detail)
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
  },
  getSubprojectProblemStatistics({commit}, param){
    return new Promise((resolve, reject) => {
      api.getSubprojectProblemStatistics(param,
        statistics => {
          commit(types.UPDATE_SUBPROJECT_PROBLEM_STATISTICS, statistics)
          resolve()
        },
        statistics => {
          resolve()
        })
      })
  },
  getSubprojectTaskStatistics({commit}, param){
    return new Promise((resolve, reject) => {
      api.getSubprojectTaskStatistics(param,
        statistics => {
          commit(types.UPDATE_SUBPROJECT_TASK_STATISTICS, statistics)
          resolve()
        },
        statistics => {
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
