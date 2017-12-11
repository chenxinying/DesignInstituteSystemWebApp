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
  getUserStatistics({ commit, state }, params){
    return new Promise((resolve, reject) => {
      api.getUserStatistics({openid: state.openid},
        userInfo => {
          commit(types.UPDATE_USER_STATISTICS, userInfo)
          resolve()
        },
        userInfo => {resolve()})
    })
  },
  updateImage({ commit }){
    setTimeout(() => {
      var myImage = document.querySelectorAll('.weui-media-box__thumb');
      for(var i = 0; i < myImage.length; ++i){
        Holder.run({
          images: myImage[i]
        });
      }
    }, 0)
  }
}
