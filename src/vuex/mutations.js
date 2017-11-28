import * as types from './mutation-types'

export default  {
  [types.UPDATE_OPENID] (state, openid) {
    state.openid = openid
    sessionStorage.setItem('openid', state.openid)
  },
  [types.UPDATE_USER_INFO] (state, userInfo) {
    state.user_info = userInfo
    sessionStorage.setItem('userInfo', JSON.stringify(userInfo))
  },
}
