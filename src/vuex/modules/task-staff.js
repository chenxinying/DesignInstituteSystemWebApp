import api from '../../api'
import * as types from '../mutation-types'
import { type } from 'os';

const state = {
  loadEnd : false,
  start : 0,
  taskList : [],
}

const mutations = {
  [types.ADD_STAFF_TASK_LIST](state, lists){
    lists.forEach(element => {
      state.taskList.push(element)
    });
  },
  [types.UPDATE_STAFF_TASK_LIST](state, lists){
    state.taskList = []
    lists.forEach(element => {
      state.taskList.push(element)
    });
  },
  [types.UPDATE_STAFF_TASK_START](state, start){
    state.start = start
  },
  [types.UPDATE_STAFF_TASK_LOAD_END] (state, loadEnd){
    state.loadEnd = loadEnd
  },
}

const actions = {
  addStaffTaskList ({commit, state, rootState}, queryParams) {
    return new Promise((resolve, reject) => {
      api.getUserTasklist({
        start : state.start,
        count : rootState.request_count,
        ...queryParams
      },
      lists => {
        if(lists.length < rootState.request_count)
          commit(types.UPDATE_STAFF_TASK_LOAD_END, true)

        commit(types.UPDATE_STAFF_TASK_START, state.start + lists.length)
        commit(types.ADD_STAFF_TASK_LIST, lists)
        resolve()
      },
      lists => {
        commit(types.UPDATE_STAFF_TASK_LOAD_END, true)
        resolve()
      })
    })
  },
  clearStaffTaskList({commit, state, rootState}, taskgroup_id){
    commit(types.UPDATE_STAFF_TASK_LOAD_END, false)
    commit(types.UPDATE_STAFF_TASK_START, 0)
    commit(types.UPDATE_STAFF_TASK_LIST, [])
  },
}

export default {
  state,
  mutations,
  actions
}
