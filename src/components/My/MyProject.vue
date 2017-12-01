<template>
  <div style="height:100%;">
    <div class="search-fix-top">
      <x-header>我参与的项目</x-header>
    </div>
    <div class="search-fix-top" style="top:46px;">
      <problem-filter></problem-filter>
    </div>
    <list-view :list="projects" type="5" @on-scroll-end="onScrollEnd" @on-click-load-more="onClickLoadMore" ref="listView" style="padding-top:91px;"></list-view>
  </div>
</template>

<script>
import { XHeader } from 'vux'
import { mapState, mapActions } from 'vuex'
import ProblemFilter from '../Problem/ProblemFilter'
import ListView from '../ListView'

export default {
  components: {
    XHeader,
    ListView,
    ProblemFilter
  },
  computed:{
    ...mapState({
        openid: state => state.openid,
        projects: state => {
          var showList = []
          state.project.myProjectList.forEach(element => {
            var str = ["", "已立项，底图待深化", "底图已深化，底图深化待审核", "底图深化已审核，待标准层下单", "标准层已下单,待变化层下单", "变化层已下单，待归档", "项目已归档"]
            var item = {
              src: '',
              title: element.name,
              desc: element.projet_name,
              url: '/project/' + element.project_id + '/subproject/' + element.subproject_id,
              meta: {
                source: str[element.state],
                date: element.start_time_plan,
                other: element.end_time_plan
              }
            }
            showList.push(item)
          })
          return showList
        },
        isLoadEnd : state => state.project.myLoadEnd
      }),
  },
  methods: {
    ...mapActions([
      'getMyProjectList'
    ]),
    onScrollEnd : function(){
      this.getMyProjectList().then(() => {
        this.$refs.listView.setIsLoadEnd(this.isLoadEnd)
      })
    },
    onClickLoadMore : function(){
      this.getMyProjectList().then(() => {
        this.$refs.listView.setIsLoadEnd(this.isLoadEnd)
        this.$refs.listView.addScrollHandler()
      })
    }
  },
  created () {
    this.getMyProjectList().then(() => {
        this.$refs.listView.setIsLoadEnd(this.isLoadEnd)
    })
  }
}
</script>
