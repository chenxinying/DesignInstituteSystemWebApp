<template>
  <div style="height:100%;">

    <div class="search-fix-top">
      <x-header>{{projectName}}/{{subprojectName}}/</x-header>
    </div>

    <div style="margin-top:45px;height:100%;overflow:auto" @scroll="onScroll">
      <checklist title="项目身份" disabled label-position="left" :options="checklist" v-model="checklist"></checklist>
      <group-title>参与任务</group-title>
      <grid :cols="3">
        <grid-item v-for="item in taskList" :key="item.task_id" :link="item.link">
          <span class="grid-center">
            <flexbox :gutter="5" class="flexbox-demo">
              <flexbox-item :span="6">
                <div class="flex-img">
                  <img :src="item.src" style="height:50px;width:50px;overflow:hidden;" class="weui-media-box__thumb">
                </div>
              </flexbox-item>
              <flexbox-item>
                <div class="flex-info">
                  {{item.show_name}}
                </div>
                <div class="flex-info" style="font-size:70%;">
                  {{stateArray[item.state]}}
                </div>
              </flexbox-item>
          </flexbox>
          </span>
        </grid-item>
      </grid>
      <load-more :tip="tip" :show-loading="!isLoadEnd" background-color="#fbf9fe"></load-more>
    </div>
  </div>
</template>

<script>
import { Search, XHeader, Card, Group, Checklist, Flexbox, FlexboxItem, Divider, Grid, GridItem, GroupTitle, LoadMore } from 'vux'
import { mapState, mapActions } from 'vuex'
import ListView from '../ListView'

export default {
  components: {
    Search,
    ListView,
    XHeader,
    Card,
    Group,
    Checklist,
    Flexbox,
    FlexboxItem,
    Divider,
    Grid,
    GridItem,
    GroupTitle,
    LoadMore
  },
  methods: {
     ...mapActions([
      'addStaffTaskList',
      'clearStaffTaskList',
      'updateImage',
      'updateTaskDetail',
    ]),
    onSubmit () {
    },
    onScroll (e) {
      //滚动至底部
      if(e.target.scrollTop + e.target.offsetHeight >= e.target.scrollHeight && !this.isLoadEnd){
        this.addStaffTaskList({openid:this.$route.params.openid,subproject_id:this.subproject_id}).then(()=>{
          this.updateImage()
        })
      }
    },
    initChecklist () {
      this.checklist = []
      this.role.rolelist.forEach(element => {
        this.checklist.push(element.name)
      });
    }
  },
  data () {
    return {
      stateArray : ["", "待完成", "待审核", "已完成"],
      checklist: [],
    }
  },
  computed: {
    ...mapState({
        role: state => state.project_staff.staffList.find(item => item.openid == state.route.params.openid),
        taskList: state => {
          var bgArray = ['F86E61', '4DA9EA', '05CC91', 'F8B65F', '578AA9', '5F70A8']
          var lists = []
          state.task_staff.taskList.forEach(item => {
              var bgIndex = item.task_id % bgArray.length
              var src = "holder.js/50x50?fg=fff"
              src += "&text=" +  item.name.substring(0, 3)
              src += "&bg=" + bgArray[bgIndex]

              var show_name = item.name
              if(show_name.length > 3)
                show_name = show_name.substring(0, 2) + "..."

              lists.push({
                src : src,
                link : "/project/" + item.project_id + "/subproject/" + item.subproject_id + "/taskgroup/" + item.taskgroup_id + "/task/" + item.task_id,
                ...item,
                show_name : show_name
              })
          })
          return lists
        },
        isLoadEnd: state => state.task_staff.loadEnd,
        projectName : state => state.project_detail.subproject_detail.projectName,
        subprojectName : state => state.project_detail.subproject_detail.name,
        subproject_id: state => state.project_detail.subproject_detail.id
      }),
    tip: function() {
      return this.isLoadEnd ? '暂无数据' : '正在加载'
    },
  },
  activated () {
    this.initChecklist()
    this.clearStaffTaskList()
    this.addStaffTaskList({openid:this.$route.params.openid,subproject_id:this.subproject_id}).then(()=>{
      this.updateImage()
    })
  },
  watch :{
    '$route' (to, from) {
      if(to.params.task_id){
        var taskDetail = this.taskList.find(item => item.task_id == to.params.task_id)
        this.updateTaskDetail(taskDetail)
      }
    }
  }
}
</script>


<style scoped lang="less">
@import '~vux/src/styles/1px.less';
.flex-demo {
  text-align: center;
  margin-left : 10px;
  padding-left: 2px;
  display: block;
}
.flex-img {
  text-align: center;
  height: 100%;
  width: 100%;
  max-width: 50px;
  max-height: 50px;
}
.flex-info {
  text-align: left;
}
.grid-center {
  display: block;
  text-align: center;
  color: #000;
}
</style>
