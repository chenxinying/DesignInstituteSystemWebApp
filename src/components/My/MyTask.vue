<template>
  <div style="height:100%;">
    <div class="search-fix-top">
      <x-header>待完成的任务</x-header>
    </div>
    <div class="search-fix-top" style="top:46px;">
       <task-filter @on-click-sure="onClickSure" ref="taskFilter" :is-my-task="true"></task-filter>
    </div>

    <list-view :list="showList" type="5" @on-scroll-end="onScrollEnd" @on-click-load-more="onClickLoadMore" ref="listView" style="padding-top:91px;"></list-view>

  </div>
</template>

<script>
import { XHeader } from 'vux'
import { mapState, mapActions } from 'vuex'
import TaskFilter from '../Task/TaskFilter'
import ListView from '../ListView'

export default {
  components: {
    XHeader,
    ListView,
    TaskFilter
  },
  computed:{
    ...mapState({
        taskList: state => state.task_my.taskList,
        showList: state => {
          var showList = []
          state.task_my.taskList.forEach(element => {

            var urgentTextArray =  ["", "普通", "紧急", "非常紧急"]
            var urgentColorArray = ["", "05CC91", "F8B65F", "F86E61"]
            var text = "&text=" + urgentTextArray[element.urgent]
            var bg = "&bg=" + urgentColorArray[element.urgent]
            var stateArray = ["", "待完成", "待审核", "已完成"]

            var item = {
              src: "holder.js/60x60?fg=fff" + text + bg,
              title: element.name,
              desc: element.prj_name + "/" + element.subprj_name + "/" + element.taskgroup_name,
              url: '/project/' + element.project_id + '/subproject/' + element.subproject_id + "/taskgroup/" + element.taskgroup_id + "/task/" + element.task_id,
            }
            showList.push(item)
          })
          return showList
        },
        isLoadEnd : state => state.task_my.loadEnd
      }),
  },
  methods: {
    ...mapActions([
      'addMyTaskList',
      'clearMyTaskList',
      'updateImage',
      'updateTaskDetail',
    ]),
    onScrollEnd () {
      setTimeout(() => {
        this.addMyTaskList(this.$refs.taskFilter.queryParams).then(() => {
          this.$refs.listView.setIsLoadEnd(this.isLoadEnd)
          this.updateImage()
        })
      }, 500)
    },
    onClickLoadMore () {
      this.$refs.listView.setIsLoadEnd(false)
      setTimeout(() => {
        this.clearMyTaskList()
        this.addMyTaskList(this.$refs.taskFilter.queryParams).then(() => {
          this.$refs.listView.setIsLoadEnd(this.isLoadEnd)
          this.$refs.listView.addScrollHandler()
          this.updateImage()
        })
      }, 500)
    },
    onClickSure () {
      this.clearMyTaskList()
      this.$refs.listView.setIsLoadEnd(false)
      this.onScrollEnd()
    }
  },
  activated () {
    if(this.goBack){
      this.updateImage()
      return
    }
    this.clearMyTaskList()
    this.$refs.listView.setIsLoadEnd(false)
    setTimeout(() => {
      this.addMyTaskList().then(() => {
        this.$refs.listView.setIsLoadEnd(this.isLoadEnd)
        this.updateImage()
      })
    }, 500)
  },
  watch: {
    '$route' (to, from) {
      this.goBack = from.params.task_id ? true : false
      if(to.params.task_id){
        var taskDetail = this.taskList.find(item => item.task_id == to.params.task_id)
        this.updateTaskDetail(taskDetail)
      }
    }
  },
  data () {
    return {
      goBack : false
    }
  }
}
</script>

<style lang="less" scoped>
@import '~vux/src/styles/1px.less';
@import '~vux/src/styles/center.less';
.tab-swiper {
  background-color: #fff;
  height: 500px;
}
.tab-fix-top{
  width: 100%;
  position: absolute;
  left: 0px;
  top: 45px;
  z-index: 100;
}
</style>
