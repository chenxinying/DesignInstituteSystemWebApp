import api from '../../api'
import * as types from '../mutation-types'
import { type } from 'os';

const state = {
  loadEnd : false,
  start : 0,
  taskList : [],
  taskgroupNames : [{key:-1, value:'全部'}]
}

const mutations = {
  [types.ADD_MY_TASK_LIST](state, lists){
    lists.forEach(element => {
      state.taskList.push(element)
    });
  },
  [types.UPDATE_MY_TASK_LIST](state, lists){
    state.taskList = []
    lists.forEach(element => {
      state.taskList.push(element)
    });
  },
  [types.UPDATE_MY_TASK_START](state, start){
    state.start = start
  },
  [types.UPDATE_MY_TASK_LOAD_END] (state, loadEnd){
    state.loadEnd = loadEnd
  },
  [types.UPDATE_MY_TASK_TASK_GROUP_NAMES] (state, taskgroupNames)
  {
    state.taskgroupNames = [{key:-1, value:'全部'}]
    taskgroupNames.forEach((value, index, array) => state.taskgroupNames.push({key: value.taskgroup_id, value: value.taskgroup_name}))
  }
}

const actions = {
  addMyTaskList ({commit, state, rootState}, queryParams) {
    return new Promise((resolve, reject) => {
      api.getUserTasklist({
        openid : rootState.openid,
        start : state.start,
        count : rootState.request_count,
        state : 1,
        ...queryParams
      },
      lists => {
        if(lists.length < rootState.request_count)
          commit(types.UPDATE_MY_TASK_LOAD_END, true)

        commit(types.UPDATE_MY_TASK_START, state.start + lists.length)
        commit(types.ADD_MY_TASK_LIST, lists)
        resolve()
      },
      lists => {
        commit(types.UPDATE_MY_TASK_LOAD_END, true)
        resolve()
      })
    })
  },
  clearMyTaskList({commit, state, rootState}, taskgroup_id){
    commit(types.UPDATE_MY_TASK_LOAD_END, false)
    commit(types.UPDATE_MY_TASK_START, 0)
    commit(types.UPDATE_MY_TASK_LIST, [])
  },
  updateTaskgroupName({commit, state, rootState}, queryParams){
    api.getTaskgroupName(
      queryParams,
      lists => {
        commit(types.UPDATE_MY_TASK_TASK_GROUP_NAMES, lists)
      },
      lists => {
      })
  }
}

export default {
  state,
  mutations,
  actions
}
