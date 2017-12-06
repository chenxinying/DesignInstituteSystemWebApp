<template>
  <div>
    <flexbox class="flexbox-demo">
        <flexbox-item :span="4">
            <div class="flex-img">
              <img :src="userInfo.headimgurl" style="height:60px;width:60px; border-radius:50%; overflow:hidden;">
            </div>
          </flexbox-item>
        <flexbox-item>
          <div class="flex-info" style="font-size:150%;">
            {{userInfo.nickname}}
          </div>
          <div class="flex-info" style="font-size:80%;">
            {{userInfo.company_name}}
          </div>
          </flexbox-item>
      </flexbox>

    <card style="margin-top:-10px;">
      <div slot="content" class="card-demo-flex card-demo-content01">
        <div class="vux-1px-r">
          <span>{{userInfo.SubprojectCount}}</span>
          <br/>
          参与项目
        </div>
        <div class="vux-1px-r">
          <span>{{userInfo.TaskCount}}</span>
          <br/>
          参与任务
        </div>
        <div class="vux-1px-r">
          <span>{{userInfo.ChangerProblemCount}}</span>
          <br/>
          负责问题
        </div>
        <div>
          <span>{{userInfo.CreatorProblemCount}}</span>
          <br/>
          创建问题
        </div>
      </div>
    </card>

    <group>
      <cell title="我参与的项目" is-link link="/myproject">
        <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../../assets/tabbar/tabbar-project.png">
      </cell>
      <cell title="我负责的任务" is-link link="/mytask">
        <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../../assets/tabbar/tabbar-task.png">
      </cell>
      <cell title="待解决的问题" is-link link="/myproblem">
        <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../../assets/tabbar/tabbar-problem.png">
      </cell>
    </group>

    <group>
      <cell title="个人信息" is-link link="/personinfo">
        <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../../assets/tabbar/tabbar-profile.png">
      </cell>
    </group>

  </div>
</template>

<script>
import { Card, Group, Cell, Flexbox, FlexboxItem } from 'vux'
import Tabbar from './Tabbar'
import { mapState, mapActions } from 'vuex'

export default {
  components: {
    Card, Group, Cell, Flexbox, FlexboxItem, Tabbar
  },
  computed: {
    ...mapState({
        openid : state => state.openid,
        userInfo : state => state.user_info
      })
  },
}
</script>

<style scoped lang="less">
@import '~vux/src/styles/1px.less';
.card-demo-flex {
  display: flex;
}
.card-demo-content01 {
  padding: 10px 0;
}
.card-padding {
  padding: 15px;
}
.card-demo-flex > div {
  flex: 1;
  text-align: center;
  font-size: 12px;
}
.card-demo-flex span {
  color: #f74c31;
}

.flexbox-demo{
  background-color: #fff;
  padding-top: 20px;
  padding-bottom: 20px;
}
.flex-img {
  text-align: center;
}
.flex-info {
  text-align: left;
}
</style>
