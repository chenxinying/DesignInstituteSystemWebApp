<template>
  <div style="height:100%;">

    <div class="search-fix-top">
      <x-header>.../{{subprojectName}}/{{taskgroupName}}/</x-header>
    </div>

    <div class="search-fix-top" style="top:46px;">
      <task-filter @on-click-sure="onClickSure" ref="taskFilter"></task-filter>
    </div>

    <list-view header="任务列表" :list="lists" type="5" @on-scroll-end="onScrollEnd" @on-click-load-more="onClickLoadMore" ref="listView" style="padding-top:90px;"></list-view>
  </div>
</template>

<script>
import { Search, XHeader } from 'vux'
import { mapState, mapActions } from 'vuex'
import ListView from '../ListView'
import TaskFilter from '../Task/TaskFilter'

export default {
  components: {
    Search,
    ListView,
    XHeader,
    TaskFilter
  },
  methods: {
     ...mapActions([
      'getTaskList',
      'clearTaskList',
      'updateImage',
      'updateTaskDetail',
    ]),
    onSubmit () {
      this.onClickSure()
    },
    onScrollEnd () {
      var queryParams = {
        taskgroup_id : this.$route.params.taskgroup_id,
        ...this.$refs.taskFilter.queryParams
      }
      setTimeout(() => {
        this.getTaskList(queryParams).then(() => {
          this.$refs.listView.setIsLoadEnd(this.isLoadEnd)
          this.updateImage()
        })
      }, 500)
    },
    onClickLoadMore () {
      var queryParams = {
        taskgroup_id : this.$route.params.taskgroup_id,
        ...this.$refs.taskFilter.queryParams
      }
      this.$refs.listView.setIsLoadEnd(false)
      setTimeout(() => {
        this.clearTaskList(this.$route.params.taskgroup_id)
        this.getTaskList(queryParams).then(() => {
          this.$refs.listView.setIsLoadEnd(this.isLoadEnd)
          this.$refs.listView.addScrollHandler()
          this.updateImage()
        })
      }, 500)
    },
    onClickSure () {
      this.clearTaskList(this.$route.params.taskgroup_id)
      this.$refs.listView.setIsLoadEnd(false)
      this.onScrollEnd()
    },
  },
  data () {
    return {
      keyword: '',
      goBack : false
    }
  },
  computed: {
    ...mapState({
        taskInfo: state => state.task.taskList.find(item => item.taskgroup_id == state.route.params.taskgroup_id),
        lists: state => {
            var showList = []
            var taskInfo = state.task.taskList.find(item => item.taskgroup_id == state.route.params.taskgroup_id)
            taskInfo && taskInfo.data.forEach(element => {
              var urgentTextArray =  ["", "普通", "紧急", "非常紧急"]
              var urgentColorArray = ["", "05CC91", "F8B65F", "F86E61"]
              var text = "&text=" + urgentTextArray[element.urgent]
              var bg = "&bg=" + urgentColorArray[element.urgent]
              var stateArray = ["", "待完成", "待审核", "已完成"]

              //剩余时间
              var startDate= new Date()
              var endDate= new Date(element.end_time_plan)
              var df=(endDate.getTime()-startDate.getTime()) / 1000
              var secondsPerDay = 24 * 3600
              var days = Math.floor(df / secondsPerDay)
              if(days < 0) days = 0
              var hours = Math.floor(df % secondsPerDay / 3600)
              if(hours < 0) hours = 0

              var t = days + "天 " + hours + "小时"

              var desc = stateArray[element.state]
              if(element.state == 1){
                desc = "<span style='color:red;'>" + stateArray[element.state] + "</span>"
              }

              var item = {
                src : "holder.js/60x60?fg=fff" + text + bg,
                title : element.name,
                desc : element.changer_nickname + ' ' + desc,
                url : '/project/' + state.route.params.project_id + '/subproject/' + state.route.params.subproject_id + '/taskgroup/' + state.route.params.taskgroup_id + '/task/' + element.id,
                meta: {
                  source: "截止： " + element.end_time_plan,
                  date: "剩余： <span style='color:red;'>" + t + "</span>",
                }
              }
              showList.push(item)
            });
            return showList
          },
        isLoadEnd : state =>  {
          var taskInfo = state.task.taskList.find(item => item.taskgroup_id == state.route.params.taskgroup_id)
          return taskInfo ? taskInfo.loadEnd : false
        },
        taskgroupName : state => {
          return state.task.taskgroupList.find(item => item.id == state.route.params.taskgroup_id).name
        },
        taskgroupList : state => state.task.taskgroupList,
        subprojectName : state => state.project_detail.subproject_detail.name,
      }),
  },
  activated () {
    if(this.goBack){
      this.updateImage()
      return
    }
    this.clearTaskList(this.$route.params.taskgroup_id)
    this.$refs.listView.setIsLoadEnd(false)
    var queryParams = {
      taskgroup_id : this.$route.params.taskgroup_id,
    }
    setTimeout(() => {
      this.getTaskList(queryParams).then(() => {
        this.$refs.listView.setIsLoadEnd(this.isLoadEnd)
        this.updateImage()
      })
    }, 500)
  },
  watch: {
    '$route' (to, from) {
      this.goBack = from.params.task_id ? true : false
      if(to.params.task_id){
        var task = this.taskInfo.data.find(item => item.id == this.$route.params.task_id)
        var taskDetail = {...task}
        taskDetail.project_id =  this.$route.params.project_id
        taskDetail.subproject_id = this.$route.params.subproject_id
        taskDetail.subprj_name = this.subprojectName
        taskDetail.taskgroup_id = this.$route.params.taskgroup_id
        taskDetail.taskgroup_name = this.taskgroupName
        taskDetail.task_id = taskDetail.id
        this.updateTaskDetail(taskDetail)
      }
    }
  }
}
</script>
