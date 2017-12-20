<template>
  <div style="height:100%;">
    <div class="search-fix-top">
      <x-header>我参与的项目</x-header>
    </div>
    <div class="search-fix-top" style="top:46px;">
      <project-filter @on-click-sure="onClickSure" ref="projectFilter"></project-filter>
    </div>
    <list-view :list="projects" type="5" @on-scroll-end="onScrollEnd" @on-click-load-more="onClickLoadMore" ref="listView" style="padding-top:91px;"></list-view>
  </div>
</template>

<script>
import { XHeader } from 'vux'
import { mapState, mapActions } from 'vuex'
import ProjectFilter from '../Project/ProjectFilter'
import ListView from '../ListView'

export default {
  components: {
    XHeader,
    ListView,
    ProjectFilter
  },
  computed:{
    ...mapState({
        projects: state => {
          var showList = []
          state.project_my.projects.forEach(element => {

            var text = "&text=" + element.projet_name.substring(0, 4)
            var bgArray = ['F86E61', '4DA9EA', '05CC91', 'F8B65F', '578AA9', '5F70A8']
            var bgIndex = element.project_id % bgArray.length
            var bg = "&bg=" + bgArray[bgIndex]

            var str = ["", "已立项，底图待深化", "底图已深化，底图深化待审核", "底图深化已审核，待标准层下单", "标准层已下单,待变化层下单", "变化层已下单，待归档", "项目已归档"]
            var item = {
              src: "holder.js/60x60?fg=fff" + text + bg,
              title: element.name,
              desc: str[element.state],
              url: '/project/' + element.project_id + '/subproject/' + element.subproject_id,
              meta: {
                source: "开始：" + element.start_time_plan,
                date: "结束：" + element.end_time_plan,
                //other: element.end_time_plan
              }
            }
            showList.push(item)
          })
          return showList
        },
        isLoadEnd : state => state.project_my.loadEnd
      }),
  },
  methods: {
    ...mapActions([
      'addMyProject',
      'clearMyProject',
      'updateImage'
    ]),
    onScrollEnd () {
      setTimeout(() => {
        this.addMyProject(this.$refs.projectFilter.queryParams).then(() => {
            this.$refs.listView.setIsLoadEnd(this.isLoadEnd)
            this.updateImage()
        })
      }, 1000)
    },
    onClickLoadMore () {
      this.clearMyProject()
      this.$refs.listView.setIsLoadEnd(false)
      setTimeout(() => {
        this.addMyProject(this.$refs.projectFilter.queryParams).then(() => {
          this.$refs.listView.setIsLoadEnd(this.isLoadEnd)
          this.$refs.listView.addScrollHandler()
          this.updateImage()
        })
      }, 1000)
    },
    onClickSure () {
      this.clearMyProject()
      this.$refs.listView.setIsLoadEnd(false)
      this.onScrollEnd()
    }
  },
  activated () {
    this.clearMyProject()
    this.$refs.listView.setIsLoadEnd(false)
    setTimeout(() => {
      this.addMyProject().then(() => {
          this.$refs.listView.setIsLoadEnd(this.isLoadEnd)
          this.updateImage()
      })
    }, 1000)
  }
}
</script>
