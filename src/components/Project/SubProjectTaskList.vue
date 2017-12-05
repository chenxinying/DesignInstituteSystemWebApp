<template>
  <div style="height:100%;">

    <div class="search-fix-top">
      <x-header>{{projectName}}/{{subproject.name}}/{{taskgroupName}}/</x-header>
    </div>

    <div class="search-fix-top" style="top:46px;">
      <search v-model="keyword" auto-scroll-to-top @on-submit="onSubmit"></search>
    </div>

    <list-view header="任务列表" :list="lists" type="1" @on-scroll-end="onScrollEnd" @on-click-load-more="onClickLoadMore" ref="listView" style="padding-top:90px;"></list-view>
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
      'getTaskList'
    ]),
    updateImg () {
      setTimeout(()=>{
        var myImage = document.querySelectorAll('.weui-media-box__thumb');
        myImage.forEach(element => {
          Holder.run({
            images: element
          });
        })
      }, 0)
    },
    onSubmit () {
      console.log("执行搜索")
    },
    onScrollEnd () {
      this.getTaskList(this.$route.params.taskgroup_id).then(() => {
        this.$refs.listView.setIsLoadEnd(this.isLoadEnd)
        this.updateImg()
      })
    },
    onClickLoadMore () {
      this.getTaskList(this.$route.params.taskgroup_id).then(() => {
        this.$refs.listView.setIsLoadEnd(this.isLoadEnd)
        this.$refs.listView.addScrollHandler()
        this.updateImg()
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
              var text = "&text=" + element.name.substring(0, 4)
              var bgArray = ['F86E61', '4DA9EA', '05CC91', 'F8B65F', '578AA9', '5F70A8']
              var bgIndex = element.id % bgArray.length
              var bg = "&bg=" + bgArray[bgIndex]
              var item = {
                src : "holder.js/60x60?fg=fff" + text + bg,
                title : element.name,
                url : '/project/' + state.route.params.project_id + '/subproject/' + state.route.params.subproject_id + '/taskgroup/' + state.route.params.taskgroup_id,
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
      this.updateImg()
    })
  }
}
</script>
