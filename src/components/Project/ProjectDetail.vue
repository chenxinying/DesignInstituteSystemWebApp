<template>
  <div style="height:100%;">
    <div class="search-fix-top">
      <x-header>{{projectName}}/</x-header>
    </div>

    <div class="search-fix-top" style="top:46px;">
      <project-filter :filter-project-id="$route.params.id" ref="projectFilter" @on-click-sure="onClickSure"></project-filter>
    </div>

    <list-view header="项目列表" :list="subprojects" type="5" @on-scroll-end="onScrollEnd" @on-click-load-more="onClickLoadMore" ref="listView" style="padding-top:90px;"></list-view>

  </div>
</template>

<script>
import { XHeader } from 'vux'
import { mapState, mapActions } from 'vuex'
import ListView from '../ListView'
import ProjectFilter from '../Project/ProjectFilter'

export default {
  components: {
    XHeader,
    ListView,
    ProjectFilter
  },
  methods: {
    ...mapActions([
      'getSubProjectList',
      'clearSubProjectList',
      'updateImage'
    ]),
    onClickSure () {
      this.clearSubProjectList(this.$route.params.id)
      this.onScrollEnd()
    },
    onScrollEnd () {
      var queryParams = {
        project_id : this.$route.params.id,
        ...this.$refs.projectFilter.queryParams
      }
      this.getSubProjectList(queryParams).then(() => {
        this.$refs.listView.setIsLoadEnd(this.isLoadEnd)
        this.updateImage()
      })
    },
    onClickLoadMore () {
      var queryParams = {
        project_id : this.$route.params.id,
        ...this.$refs.projectFilter.queryParams
      }
      this.getSubProjectList(queryParams).then(() => {
        this.$refs.listView.setIsLoadEnd(this.isLoadEnd)
        this.$refs.listView.addScrollHandler()
        this.updateImage()
      })
    },
  },
  activated () {
    this.clearSubProjectList(this.$route.params.id)
    var queryParams = {
      project_id : this.$route.params.id,
    }
    this.onScrollEnd()
  },
  computed : {
      ...mapState({
      subprojects: state => {
          var showList = []
          var subprojectInfo = state.project.subprojectList.find(item => item.project_id == state.route.params.id)
          var currentTime = new Date().getTime()

          subprojectInfo && subprojectInfo.data.forEach(element => {
            var str = ["", "已立项，底图深化中...", "底图已深化，底图深化审核中...", "底图深化已审核，标准层设计中...", "标准层已下单,变化层设计中...", "变化层已下单，项目归档中...", "项目已归档"]
            var text = "&text=" + element.name.substring(0, 4)
            var bgArray = ['F86E61', '4DA9EA', '05CC91', 'F8B65F', '578AA9', '5F70A8']
            var bgIndex = element.id % bgArray.length
            var bg = "&bg=" + bgArray[bgIndex]

            var dwgStartTime = new Date(element.start_time_plan).getTime()
            var dwgEndTime = new Date(element.dwg_end_plan).getTime()
            var dwgPercent = currentTime >= dwgEndTime ? 100 : ((currentTime - dwgStartTime) /  (dwgEndTime - dwgStartTime)).toFixed(2) * 100

            var designStartTime = new Date(element.design_start_plan).getTime()
            var designEndTime = new Date(element.end_time_plan).getTime()
            var designPercent = currentTime >= designEndTime ? 100 : ((currentTime - designStartTime) /  (designEndTime - designStartTime)).toFixed(2) * 100

            var item = {
              src : "holder.js/60x60?fg=fff" + text + bg,
              title : element.name,
              desc : str[element.state],
              url : '/project/' + element.project_id + '/subproject/' + element.id,
              meta: {
                  date: "底图时间已使用：" + dwgPercent + "%",
                  other: "设计时间已使用：" + designPercent + "%",
                }
            }
            showList.push(item)
          });
          return showList
        },
      isLoadEnd : state => {
        var subprojectInfo = state.project.subprojectList.find(item => item.project_id == state.route.params.id)
        return subprojectInfo ? subprojectInfo.loadEnd : false
      },
      projectName : state => {
        var project = state.project.projectList.find(item => item.project_id == state.route.params.id)
        return project ? project.name : "项目列表"
      }
    }),
  }
}
</script>

<style lang="less" scoped>

</style>
