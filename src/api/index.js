import Vue from 'vue'
import { AjaxPlugin } from 'vux'
Vue.use(AjaxPlugin)

let _request_host = "http://192.168.3.40/design_institute/public/"

export default {
  getProjectNames(params, cb, errorCb){
    Vue.http.get(_request_host + 'home/Project/projectInfo_list',
    {params}
    ).then(
      (response) => {
        cb(response.data)
      },
      (response) => {
        errorCb(response.data)
      }
    )
  },
  getSubProjectNames(params, cb, errorCb){
    Vue.http.get(_request_host + 'home/Project/subprojectInfo_list',
    {params}
    ).then(
      (response) => {
        cb(response.data)
      },
      (response) => {
        errorCb(response.data)
      }
    )
  },
  requestProblem (params, cb, errorCb) {
    Vue.http.get(_request_host + 'home/Problem/ProblemInfo_list',
    {params}
    ).then(
      (response) => {
        cb(response.data)
      },
      (response) => {
        errorCb(response.data)
      }
    )
  },
  getProblemUserNames(params, cb, errorCb){
    Vue.http.get(_request_host + 'home/Problem/problemuser_list',
    {params}
    ).then(
      (response) => {
        cb(response.data)
      },
      (response) => {
        errorCb(response.data)
      }
    )
  },
  getOpenid(params, cb, errorCb){
    Vue.http.get(_request_host + 'admin/user/getOpenid',
    {params}
    ).then(
      (response) => {
        cb(response.data)
      },
      (response) => {
        errorCb(response.data)
      }
    )
  },
  getUserInfo(params, cb, errorCb){
    Vue.http.get(_request_host + 'admin/user/selectUser',
    {params}
    ).then(
      (response) => {
        cb(response.data)
      },
      (response) => {
        errorCb(response.data)
      }
    )
  },
  getProjectList(params, cb, errorCb){
    Vue.http.get(_request_host + 'admin/Project/getProjectList',
    {params}
    ).then(
      (response) => {
        cb(response.data)
      },
      (response) => {
        errorCb(response.data)
      }
    )
  },
  getSubprojectList(params, cb, errorCb){
    Vue.http.get(_request_host + 'admin/Project/getSubprojectList',
    {params}
    ).then(
      (response) => {
        cb(response.data)
      },
      (response) => {
        errorCb(response.data)
      }
    )
  },
  getMySubProjects(params, cb, errorCb){
    Vue.http.get(_request_host + 'admin/Project/ListUserSuproject',
    {params}
    ).then(
      (response) => {
        cb(response.data)
      },
      (response) => {
        errorCb(response.data)
      }
    )
  },
  getSubprojectFlowState(params, cb, errorCb){
    Vue.http.get(_request_host + 'admin/Subproject/find_state',
    {params}
    ).then(
      (response) => {
        cb(response.data)
      },
      (response) => {
        errorCb(response.data)
      }
    )
  },
}
