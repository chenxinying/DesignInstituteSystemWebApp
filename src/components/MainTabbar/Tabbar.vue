<template>
    <tabbar slot="bottom">
      <tabbar-item link="/project" :selected="route.path === '/project'">
        <img slot="icon" src="../../assets/demo/icon_nav_button.png">
        <span slot="label">项目</span>
      </tabbar-item>
      <tabbar-item link="/task" :selected="route.path === '/task'" show-dot>
        <img slot="icon" src="../../assets/demo/icon_nav_msg.png">
        <span slot="label">任务</span>
      </tabbar-item>
      <tabbar-item link="/problem" :selected="route.path === '/problem'" badge="2">
        <img slot="icon" src="../../assets/demo/icon_nav_article.png">
        <span slot="label">问题</span>
      </tabbar-item>
      <tabbar-item link="/profile" :selected="route.path === '/profile'">
        <img slot="icon" src="../../assets/demo/icon_nav_cell.png">
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
