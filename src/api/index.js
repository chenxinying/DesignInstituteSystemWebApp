import Vue from 'vue'
import { AjaxPlugin } from 'vux'
Vue.use(AjaxPlugin)

let _request_host = "http://192.168.3.158/DesignInstituteSystem/design_institute/public/"

export default {
  //获取总项目<id，名字>键值数组
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
  //获取子项目<id，名字>键值数组
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
  //获取问题
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
  //获取问题负责人和创建人
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
  //获取用户微信授权登录的openid
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
  //根据openid获取用户信息
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
  //获取总项目列表
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
  //根据总项目id获取子项目列表
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
  //根据openid获取参与的子项目列表
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
  //获取项目节点记录
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
  //获取任务组列表
  getTaskgroupList(params, cb, errorCb){
    Vue.http.get(_request_host + 'admin/Taskgroup/getTaskgroupList',
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
  //获取子任务列表
  getTaskList(params, cb, errorCb){
    Vue.http.get(_request_host + 'admin/Taskgroup/getTaskList',
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
  //获取项目动态记录
  getProjectTrailInfo(params, cb, errorCb){
    Vue.http.get(_request_host + 'home/Projecttrailinfo/getProjecttrailinfos',
    {params}
    ).then(
      (response) => {
        cb(response.data)
      },
      (response) => {
        errorCb(response.data)
      }
    )
  }
}
