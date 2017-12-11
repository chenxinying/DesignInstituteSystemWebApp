<template>
    <tabbar slot="bottom">
      <tabbar-item link="/project" :selected="route.path === '/project'">
        <img slot="icon" src="../../assets/tabbar/tabbar-project.png">
        <span slot="label">项目</span>
      </tabbar-item>
      <!--
      <tabbar-item link="/task" :selected="route.path === '/task'">
        <img slot="icon" src="../../assets/tabbar/tabbar-task.png">
        <span slot="label">任务</span>
      </tabbar-item>
      -->
      <tabbar-item link="/problem" :selected="route.path === '/problem'">
        <img slot="icon" src="../../assets/tabbar/tabbar-problem.png">
        <span slot="label">问题</span>
      </tabbar-item>
      <tabbar-item link="/profile" :selected="route.path === '/profile'">
        <img slot="icon" src="../../assets/tabbar/tabbar-profile.png">
        <span slot="label">我的</span>
      </tabbar-item>
    </tabbar>
</template>

<script>
import { Tabbar, TabbarItem } from 'vux'
import {mapState} from 'vuex'

export default {
  components: {
    Tabbar,
    TabbarItem
  },
  computed : {
    ...mapState({
      route: state => state.route
    })
  }
}
</script>
