<template>
  <div style="height:100%;">

    <div class="search-fix-top">
      <x-header :right-options="{showMore: true}" @on-click-more="showMenus = true">{{projectName}}/{{subproject.name}}/</x-header>
    </div>

    <div class="search-fix-top" style="top:46px;">
      <tab :line-width=2 active-color='#20b907' v-model="index">
        <tab-item class="vux-center" :selected="demo === item" v-for="(item, index) in list" @click="demo = item" :key="index">{{item}}</tab-item>
      </tab>
    </div>
      <swiper v-model="index" height="650px" :show-dots="false" style="padding-top:90px;" ref="swiper">
        <swiper-item :key="0">
          <div class="tab-swiper">
            <schedule :subproject="subproject"></schedule>
          </div>
        </swiper-item>
        <swiper-item :key="1">
          <div class="tab-swiper">
            <nodes-record></nodes-record>
          </div>
        </swiper-item>
        <swiper-item :key="2">
          <div class="tab-swiper">
            <dynamic-record></dynamic-record>
          </div>
        </swiper-item>
        <swiper-item :key="3">
          <div class="tab-swiper">
            <statistics></statistics>
          </div>
        </swiper-item>
      </swiper>

    <div v-transfer-dom>
      <actionsheet :menus="menus" v-model="showMenus" @on-click-menu="click"></actionsheet>
    </div>

  </div>
</template>

<script>
import { XHeader, Group, Cell, Clocker, Actionsheet, TransferDom, Tab, TabItem, Swiper, SwiperItem} from 'vux'
import { mapState, mapActions } from 'vuex'
import Vue from 'vue'

//项目进度
import Schedule from './SubProjectDetailSchedule'

//节点记录
import NodesRecord from './SubProjectDetailNodes'

//动态记录
import DynamicRecord from './SubProjectDetailDynamic'

//统计信息
import Statistics from './SubProjectDetailStatistics'

export default {
  directives: {
    TransferDom
  },
  components: {
    XHeader, Group, Cell, Clocker, Actionsheet ,Tab, TabItem, Swiper, SwiperItem,
    Statistics, Schedule, NodesRecord, DynamicRecord
  },
  methods: {
    ...mapActions(['getSubprojectFlowState', 'getProjectTrailInfo', 'getSubprojectProblemStatistics', 'getSubprojectTaskStatistics']),
    click (key) {
      if(key == 'task'){
        this.$router.push(this.$route.params.subproject_id + "/taskgroup")
      }else if(key == 'problem'){
        this.$router.push(this.$route.params.subproject_id + "/problem")
      }
    }
  },
  activated () {
    this.getSubprojectFlowState({subproject_id : this.$route.params.subproject_id})
    this.getProjectTrailInfo({prj_id : this.$route.params.project_id, subproject_id : this.$route.params.subproject_id})
    this.getSubprojectProblemStatistics({subproject_id : this.$route.params.subproject_id})
    this.getSubprojectTaskStatistics({subproject_id : this.$route.params.subproject_id})
  },
  watch: {
    index: function (newIndex) {
      if(newIndex == 2){
        var h = this.$refs.swiper.$children[2].$el.scrollHeight
        this.$refs.swiper.xheight = h + "px"
      }else if(newIndex == 0){
        this.$refs.swiper.xheight = "650px"
      }else{
        this.$refs.swiper.xheight = "600px"
      }
    }
  },
  computed : {
    ...mapState({
        subproject : state => {
          var subproject;
          var project = state.project.subprojectList.find(item => item.project_id == state.route.params.project_id)
          if(project){
            subproject = project.data.find(item => item.id == state.route.params.subproject_id)
          }
          if(!subproject){
            subproject = state.project_my.projects.find(item => item.subproject_id == state.route.params.subproject_id)
          }

          var currentTime = new Date().getTime()
          var dwgStartTime = new Date(subproject.start_time_plan).getTime()
          var dwgEndTime = new Date(subproject.dwg_end_plan).getTime()
          var dwgPercent = currentTime >= dwgEndTime ? 1 : ((currentTime - dwgStartTime) / (dwgEndTime - dwgStartTime)).toFixed(2)

          var designStartTime = new Date(subproject.design_start_plan).getTime()
          var designEndTime = new Date(subproject.end_time_plan).getTime()
          var designPercent = currentTime >= designEndTime ? 1 :((currentTime - designStartTime) / (designEndTime - designStartTime)).toFixed(2)

          var obj = {
            dwgPercent : dwgPercent,
            designPercent : designPercent,
            ...subproject
          }
          return obj
      },
      projectName : state => {
        var project = state.project.projectList.find(item => item.project_id == state.route.params.project_id)
        if(project) return project.name;
        project = state.project_my.projects.find(item => item.id == state.route.params.subproject_id)
        if(project) return project.projet_name;
        return ""
      },
    })
  },
  data () {
   return {
      menus: {
          task: '任务列表',
          problem: '问题列表',
        },

      showMenus: false,
      showDraw: false,
      showDesign: false,

      list: ['项目进度', '节点记录','动态记录', '统计信息'],
      demo: '项目进度',
      index: 0
    }
  }
}
</script>


<style scoped lang="less">
.tab-swiper {
  background-color: #fff;
}
</style>

