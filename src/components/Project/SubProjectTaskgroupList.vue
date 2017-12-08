<template>
  <div style="height:100%;">

    <div class="search-fix-top">
      <x-header>{{projectName}}/{{subprojectName}}/</x-header>
    </div>

    <div class="search-fix-top" style="top:46px;">
      <search v-model="keyword" @on-submit="onSubmit" @on-cancel="onCancel" position="absolute" ref="search"></search>
    </div>

    <list-view header="任务组列表" :list="lists" type="1" @on-scroll-end="onScrollEnd" @on-click-load-more="onClickLoadMore" ref="listView" style="margin-top:90px;"></list-view>

  </div>
</template>

<script>
import { Search, XHeader, Card, Group } from 'vux'
import { mapState, mapActions } from 'vuex'
import ListView from '../ListView'

export default {
  components: {
    Search,
    ListView,
    XHeader,
    Card,
    Group
  },
  methods: {
     ...mapActions([
      'getTaskgroupList',
      'clearTaskgroupList',
      'updateImage'
    ]),
    onSubmit () {
      this.clearTaskgroupList()
      this.onScrollEnd()
    },
    onCancel(){
     if(this.keyword != ''){
        this.keyword = ''
        this.onSubmit()
      }
    },
    onScrollEnd () {
      var queryParams = {
        subprj_id : this.$route.params.subproject_id,
        keyword : this.keyword
      }
      this.getTaskgroupList(queryParams).then(() => {
        this.$refs.listView.setIsLoadEnd(this.isLoadEnd)
        this.updateImage()
      })
    },
    onClickLoadMore () {
      var queryParams = {
        subprj_id : this.$route.params.subproject_id,
        keyword : this.keyword
      }
      this.getTaskgroupList(queryParams).then(() => {
        this.$refs.listView.setIsLoadEnd(this.isLoadEnd)
        this.$refs.listView.addScrollHandler()
        this.updateImage()
      })
    },
    initHeaderNames () {
      var project = this.projectList.find(item => item.project_id == this.$route.params.project_id)
      this.projectName = project ? project.name : "模板厂家"

      var subproject;
      var project = this.subprojectList.find(item => item.project_id == this.$route.params.project_id)
      if(project){
        subproject = project.data.find(item => item.id == this.$route.params.subproject_id)
      }
      if(!subproject){
        subproject = this.myProjects.find(item => item.subproject_id == this.$route.params.subproject_id)
      }
      this.subprojectName = subproject ?subproject.name : "项目"
    }
  },
  data () {
    return {
      keyword: '',
      projectName: '',
      subprojectName: ''
    }
  },
  computed: {
    ...mapState({
        lists: state => {
            var showList = []

            state.task.taskgroupList.forEach(element => {

              var text = "&text=" + element.name.substring(0, 4)
              var bgArray = ['F86E61', '4DA9EA', '05CC91', 'F8B65F', '578AA9', '5F70A8']
              var bgIndex = element.id % bgArray.length
              var bg = "&bg=" + bgArray[bgIndex]

              var item = {
                src : "holder.js/60x60?fg=fff" + text + bg,
                desc : "任务总数：" + element.task_count + " | <span style='color:red;'>待完成任务：" + element.task_count_incomplete + "</span>",
                title : element.name,
                url : '/project/' + state.route.params.project_id + '/subproject/' + state.route.params.subproject_id + '/taskgroup/' + element.id,
              }
              showList.push(item)
            });
            return showList
          },
        isLoadEnd : state => state.task.loadEnd,
        projectList : state => state.project.projectList,
        subprojectList : state =>  state.project.subprojectList,
        myProjects : state => state.project_my.projects,
      }),
  },
  activated () {
    this.keyword = ''
    this.initHeaderNames()
    this.clearTaskgroupList()
    this.onScrollEnd()
    this.$refs.search.cancel()
  }
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
