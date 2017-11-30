<template>
  <div style="height:100%;">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <router-view name="navbar" slot="bottom"></router-view>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  computed : {
    ...mapState({
        openid: state => state.openid,
        company_id : state => state.user_info.company_id
      }),
  },
  methods : {
     ...mapActions([
      'getOpenid',
      'getUserInfo'
    ]),
    getQueryString: function (name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
      var r = window.location.search.substr(1).match(reg);
      if (r!=null) return (r[2]); return null;
    }
  },
  created () {
    var code = this.getQueryString("code")
    code = 1
    if(code == null ){
      //window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx39535e8f079a2b4c&redirect_uri=http%3a%2f%2fwww.rili-tech.com%2fwechat%2f&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect"
    }
    else{
      //this.getOpenid({code : code}).then(()=>{

      //   window.location.search = ""
      //  if(this.openid == ""){
      //    this.$router.push('/error')
      //    return
      //  }

        //获取company_id
        this.getUserInfo().then(()=>{
          if(this.company_id == -1){
            this.$router.push('/error')
          }else{
            this.$router.push('/project')
          }
        })

    //})
    }
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';

html, body {
    height: 100%;
    width: 100%;
    overflow-x: hidden;
  }

body {
  background-color: #fbf9fe;
}

.search-fix-top{
  width: 100%;
  position: absolute;
  left: 0px;
  top: 0px;
  z-index: 100;
}

</style>
