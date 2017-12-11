import api from '../../api'
import * as types from '../mutation-types'
import { type } from 'os';


const state = {
  loadEnd : false,
  start : 0,
  taskgroupList : [],
  taskList : [],
}

const getters = {

}

const mutations = {
  [types.ADD_TASK_GROUP_LIST](state, lists){
    lists.forEach(element => {
      state.taskgroupList.push(element)
      state.taskList.push({taskgroup_id: element.id, start : 0, loadEnd: false, data : []})
    });
  },
  [types.UPDATE_TASK_GROUP_LIST](state, lists){
    state.taskgroupList = []
    lists.forEach(element => {
      state.taskgroupList.push(element)
      state.taskList.push({taskgroup_id: element.id, start : 0, loadEnd: false, data : []})
    });
  },
  [types.UPDATE_TASK_GROUP_START](state, start){
    state.start = start
  },
  [types.UPDATE_TASK_GROUP_LOAD_END] (state, loadEnd){
    state.loadEnd = loadEnd
  },
}

const actions = {
  getTaskgroupList ({commit, state, rootState}, queryParams) {
    return new Promise((resolve, reject) => {
      api.getTaskgroupList({
        company_id : rootState.user_info.company_id,
        start : state.start,
        count : rootState.request_count,
        ...queryParams
      },
      lists => {
        if(lists.length < rootState.request_count)
          commit(types.UPDATE_TASK_GROUP_LOAD_END, true)

        commit(types.UPDATE_TASK_GROUP_START, state.start + lists.length)
        commit(types.ADD_TASK_GROUP_LIST, lists)
        resolve()
      },
      lists => {
        commit(types.UPDATE_TASK_GROUP_LOAD_END, true)
        resolve()
      })
    })
  },
  getTaskList ({commit, state, rootState}, queryParams) {
    return new Promise((resolve, reject) => {
      var subprojectInfo = state.taskList.find(item => item.taskgroup_id == queryParams.taskgroup_id)
      api.getTaskList({
        start : subprojectInfo ? subprojectInfo.start : 0,
        count : rootState.request_count,
        ...queryParams
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
        commit(types.UPDATE_TASK_GROUP_LOAD_END, true)
        resolve()
      })
    })
  },
  clearTaskgroupList({commit}) {
    commit(types.UPDATE_TASK_GROUP_LIST, [])
    commit(types.UPDATE_TASK_GROUP_START, 0)
    commit(types.UPDATE_TASK_GROUP_LOAD_END, false)
  },
  clearTaskList({commit, state, rootState}, taskgroup_id){
    var subprojectInfo = state.taskList.find(item => item.taskgroup_id == taskgroup_id)
    subprojectInfo.start = 0
    subprojectInfo.loadEnd = false
    subprojectInfo.data = []
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
