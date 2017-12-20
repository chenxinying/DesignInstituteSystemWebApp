<template>
  <div style="height:100%;">

    <div class="search-fix-top">
      <x-header>{{projectName}}/{{subprojectName}}/</x-header>
    </div>

    <div class="search-fix-top" style="top:46px;">
      <search v-model="keyword" @on-submit="onSubmit" @on-cancel="onCancel" position="absolute" ref="search"></search>
    </div>

    <list-view header="参与人员" :list="lists" type="3" @on-scroll-end="onScrollEnd" @on-click-load-more="onClickLoadMore" ref="listView" style="margin-top:90px;"></list-view>

  </div>
</template>

<script>
import { Search, XHeader, Card, Group, Cell, Checklist } from 'vux'
import { mapState, mapActions } from 'vuex'
import ListView from '../ListView'

export default {
  components: {
    Search,
    ListView,
    XHeader,
    Card,
    Group,
    Cell,
    Checklist
  },
  methods: {
     ...mapActions([
      'updateStaffList',
    ]),
    onSubmit () {
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
        subproject_id : this.$route.params.subproject_id,
        keyword : this.keyword
      }
      setTimeout(() => {
        this.updateStaffList(queryParams).then(() => {
          this.$refs.listView.setIsLoadEnd(this.isLoadEnd)
        })
      }, 1000)
    },
    onClickLoadMore () {
      var queryParams = {
        subproject_id : this.$route.params.subproject_id,
        keyword : this.keyword
      }
      setTimeout(() => {
        this.updateStaffList(queryParams).then(() => {
          this.$refs.listView.setIsLoadEnd(this.isLoadEnd)
          this.$refs.listView.addScrollHandler()
        })
      }, 1000)
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
      subprojectName: '',
    }
  },
  computed: {
    ...mapState({
        lists: state => {
            var showList = []

            state.project_staff.staffList.forEach(element => {

              var item = {
                src : element.headimgurl,
                //desc : "任务总数：" + element.task_count + " | <span style='color:red;'>待完成任务：" + element.task_count_incomplete + "</span>",
                title : element.nickname,
                url : '/project/' + state.route.params.project_id + '/subproject/' + state.route.params.subproject_id + '/staff/' + element.openid,
              }
              showList.push(item)
            });
            return showList
        },
        isLoadEnd : state => state.project_staff.loadEnd,
        projectList : state => state.project.projectList,
        subprojectList : state =>  state.project.subprojectList,
        myProjects : state => state.project_my.projects,
      }),
  },
  activated () {
    this.keyword = ''
    this.initHeaderNames()
    this.$refs.listView.setIsLoadEnd(false)
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
