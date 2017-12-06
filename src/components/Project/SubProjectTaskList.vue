<template>
  <div style="height:100%;">

    <div class="search-fix-top">
      <x-header>.../{{subproject.name}}/{{taskgroupName}}/</x-header>
    </div>

    <div class="search-fix-top" style="top:46px;">
      <search v-model="keyword" auto-scroll-to-top @on-submit="onSubmit"></search>
    </div>

    <list-view header="任务列表" :list="lists" type="5" @on-scroll-end="onScrollEnd" @on-click-load-more="onClickLoadMore" ref="listView" style="padding-top:90px;"></list-view>
  </div>
</template>

<script>
import { Search, XHeader } from 'vux'
import { mapState, mapActions } from 'vuex'
import ListView from '../ListView'
const Holder = require('holderjs');

export default {
  components: {
    Search,
    ListView,
    XHeader
  },
  methods: {
     ...mapActions([
      'getTaskList',
      'updateImage'
    ]),
    onSubmit () {
      console.log("执行搜索")
    },
    onScrollEnd () {
      this.getTaskList(this.$route.params.taskgroup_id).then(() => {
        this.$refs.listView.setIsLoadEnd(this.isLoadEnd)
        this.updateImage()
      })
    },
    onClickLoadMore () {
      this.getTaskList(this.$route.params.taskgroup_id).then(() => {
        this.$refs.listView.setIsLoadEnd(this.isLoadEnd)
        this.$refs.listView.addScrollHandler()
        this.updateImage()
      })
    },
  },
  data () {
    return {
      keyword: ''
    }
  },
  computed: {
    ...mapState({
        lists: state => {
            var showList = []
            var taskInfo = state.task.taskList.find(item => item.taskgroup_id == state.route.params.taskgroup_id)
            taskInfo && taskInfo.data.forEach(element => {
              var urgentTextArray =  ["", "普通", "紧急", "非常紧急"]
              var urgentColorArray = ["", "05CC91", "F8B65F", "F86E61"]
              var text = "&text=" + urgentTextArray[element.urgent]
              var bg = "&bg=" + urgentColorArray[element.urgent]
              var stateArray = ["", "待解决", "待审核", "已解决"]

              //剩余时间
              var startDate= new Date()
              var endDate= new Date(element.end_time_plan)
              var df=(endDate.getTime()-startDate.getTime()) / 1000
              var secondsPerDay = 24 * 3600
              var days = Math.floor(df / secondsPerDay)
              var hours = Math.floor(df % secondsPerDay / 3600)
              var t = days + "天 " + hours + "小时"

              var item = {
                src : "holder.js/60x60?fg=fff" + text + bg,
                title : element.name,
                desc : element.changer_nickname + ' ' + stateArray[element.urgent],
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
        projectName : state => {
          var project = state.project.projectList.find(item => item.project_id == state.route.params.project_id)
          return project ? project.name : "项目列表"
        },
        subproject : state => {
          var subproject;
          var project = state.project.subprojectList.find(item => item.project_id == state.route.params.project_id)
          if(project){
            subproject = project.data.find(item => item.subproject_id == state.route.params.subproject_id)
          }
          if(!subproject){
            subproject = state.project.myProjectList.find(item => item.subproject_id == state.route.params.subproject_id)
          }
          if(!subproject){
            //发送请求
          }
          return subproject
        },
        taskgroupName : state => {
          var taskInfo = state.task.taskgroupList.find(item => item.id == state.route.params.taskgroup_id)
          return taskInfo.name
        }
      }),
  },
  activated () {
    this.getTaskList(this.$route.params.taskgroup_id).then(() => {
      this.$refs.listView.setIsLoadEnd(this.isLoadEnd)
      this.updateImage()
    })
  }
}
</script>
