import * as types from './mutation-types'
import api from '../api'

export default  {
  getOpenid({ commit, state }, params){
    return new Promise((resolve, reject) => {
        api.getOpenid(params,
          data => {
            commit(types.UPDATE_OPENID, data.openid)
            resolve()
          },
          data => {resolve()}
        )
    })
  },
  getUserInfo({ commit, state }, params){
    return new Promise((resolve, reject) => {
      api.getUserInfo({openid: state.openid},
        userInfo => {
          commit(types.UPDATE_USER_INFO, userInfo)
          resolve()
        },
        userInfo => {resolve()})

    })
  },
}