<template>
  <div>
    <search
    v-model="keyword"
    position="absolute"
    @on-focus="onFocus"
    @on-cancel="onCancel"
    @on-submit="onSubmit"
    ref="search">
    <x-button mini slot="right" v-show="!isFocus" @click.native="showFilter=true">筛选</x-button>
    </search>
    <div v-transfer-dom>
      <popup v-model="showFilter" position="right">
        <div style="width:220px;">
          <group title="项目筛选" v-show="isMyTask">
            <selector title="模板厂家" :options="projectNames" v-model="projectId" value-align="left" @on-change="onProjectChange"></selector>
            <selector title="项目名称" :options="subprojectNames" v-model="subprojectId" value-align="left" @on-change="onSubprojectChange"></selector>
          </group>
          <group title="任务筛选">
            <selector title="任务组名" :options="taskgroupNames" v-model="taskgroupId" value-align="left" v-show="isMyTask"></selector>
            <selector title="任务状态" :options="stateArray" v-model="state" value-align="left"></selector>
            <selector title="优先级别" :options="urgentArray" v-model="urgent" value-align="left"></selector>
          </group>
          <flexbox style="margin-top:20px;">
            <flexbox-item>
              <x-button type="primary" class="filter-btn" @click.native="showFilter=false">取消</x-button>
            </flexbox-item>
            <flexbox-item>
              <x-button type="warn" class="filter-btn" @click.native="onClickSure">确定</x-button>
            </flexbox-item>
          </flexbox>
        </div>
      </popup>
    </div>
  </div>
</template>

<script>
import { Group, Selector, XButton, TransferDom, Popup, Flexbox, FlexboxItem, Search } from 'vux'
import { mapState, mapActions } from 'vuex'

export default {
  directives: {
    TransferDom
  },
  components: {
    Group, Selector, XButton, TransferDom, Popup, Flexbox, FlexboxItem, Search
  },
  props :    {
    isMyTask : {
      default : false
    }
  },
  data () {
    return {

      projectId: -1,
      subprojectId: -1,
      taskgroupId : -1,

      //任务状态
      state : -1,
      stateArray :[
        {key:-1, value:"全部"},
        {key:1, value:"待完成"},
        {key:3, value:"已完成"}],

      //任务优先级别
      urgent : -1,
      urgentArray : [
        {key:-1, value:"全部"},
        {key:1, value:"普通"},
        {key:2, value:"紧急"},
        {key:3, value:"非常紧急"}
      ],

      keyword: '',
      isFocus: false,
      showFilter: false,

    }
  },
  methods: {
    ...mapActions([
      'getProjectNames',
      'updateSubProjectNames',
      'updateTaskgroupName',
    ]),
    onSubmit () {
      this.onClickSure()
    },
    onFocus () {
      this.isFocus = true;
    },
    onCancel () {
      this.isFocus = false;
      if(this.keyword != ''){
        this.keyword = ''
        this.onClickSure()
      }
    },
    onClickSure () {
      //进行筛选
      this.$emit('on-click-sure')
      this.showFilter = false
    },
    onProjectChange (projectId) {
      if(projectId == -1){
        this.subprojectId = -1
        this.taskgroupId = -1
      }
      this.updateSubProjectNames({project_id : projectId, openid : this.openid})
    },
    onSubprojectChange(subprojectId){
      if(subprojectId == -1){
        this.taskgroupId = -1
      }
      this.updateTaskgroupName({project_id : this.projectId, subproject_id: subprojectId, openid : this.openid})
    }
  },
  computed: {
    ...mapState({
      projectNames : state => state.project.projectNames,
      subprojectNames : state => state.project.subprojectNames,
      taskgroupNames : state => state.task_my.taskgroupNames,
      openid: state=>state.openid,
    }),
    queryParams () {
      var queryParams = {}

      if(this.state != -1)
        queryParams.state = this.state

      if(this.urgent != -1)
        queryParams.urgent = this.urgent

      if(this.keyword != '')
        queryParams.keyword = this.keyword

      if(this.projectId != -1)
        queryParams.projectId = this.projectId

      if(this.subprojectId != -1)
        queryParams.subprojectId = this.subprojectId

      if(this.taskgroupId != -1)
        queryParams.taskgroupId = this.taskgroupId

      return queryParams
    }
  },
  activated () {
    this.$refs.search.cancel()
    this.state = -1
    this.urgent = -1

    if(this.isMyTask){
      this.getProjectNames(this.isMyTask)
    }
  }
}
</script>
