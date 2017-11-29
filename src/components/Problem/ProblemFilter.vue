<template>

  <div>
    <search
    v-model="keyword"
    auto-scroll-to-top
    @on-focus="onFocus"
    @on-cancel="onCancel"
    @on-submit="onSubmit"
    ref="search">
    <x-button mini slot="right" v-show="!isFocus" @click.native="showFilter=true">筛选</x-button>
    </search>

    <div v-transfer-dom>
      <popup v-model="showFilter" position="right">
        <div style="width:220px;">

          <group title="项目筛选">
            <selector title="总项目" :options="projectNames" v-model="projectId" value-align="left" @on-change="onProjectChange"></selector>
            <selector title="子项目" :options="subprojectNames" v-model="subprojectId" value-align="left"></selector>
          </group>

          <group title="问题筛选">
            <selector title="问题状态" :options="stateArray" v-model="state" value-align="left"></selector>
            <selector title="问题阶段" :options="stepArray" v-model="step" value-align="left"></selector>
            <selector title="问题部位" :options="regionArray" v-model="region" value-align="left"></selector>
            <selector title="问题等级" :options="['全部', '一级','二级', '三级','四级', '五级']" v-model="level" value-align="left"></selector>
          </group>

          <group title="人员筛选">
              <selector title="负责人" :options="chargerNames" v-model="chargerId" value-align="left"></selector>
              <selector title="审核人" :options="creatorNames" v-model="creatorId" value-align="left"></selector>
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
import { Group, Selector, Search, XButton, TransferDom, Popup, Flexbox, FlexboxItem} from 'vux'
import { mapState, mapActions } from 'vuex'

export default {
  directives: {
    TransferDom
  },
  components: {
    Group, Selector, Search, XButton, TransferDom, Popup, Flexbox, FlexboxItem
  },
  props: {
    filterChargerId : {
      default: -1
    },
    filterState : {
      default: -1
    }
  },
  data () {
    return {
      projectId: -1,
      subprojectId: -1,
      level: '全部',
      creatorId : -1,
      chargerId : this.filterChargerId,

      state : this.filterState,
      stateArray :[{key:-1, value:"全部"},
        {key:1, value:"待解决"},
        {key:3, value:"已解决"}],

      step: -1,
      stepArray : [
        {key:-1, value:"全部"},
        {key:1, value:"底图深化"},
        {key:2, value:"配模阶段"},
        {key:3, value:"制图阶段"},
        {key:4, value:"预拼装"},
        {key:5, value:"现场施工"}],

      region : -1,
      regionArray :[
        {key:-1, value:'全部'},
        {key:1, value:'楼板'},
        {key:2, value:'梁板'},
        {key:3, value:'墙板'},
        {key:4, value:'飘台'},
        {key:5, value:'楼梯'},
        {key:6, value:'背楞'},
        {key:7, value:'其他'}],
      keyword: '',
      isFocus: false,
      showFilter: false
    }
  },
  methods : {
     ...mapActions([
      'requestProblem',
      'getProjectNames',
      'updateSubProjectNames',
      'getProblemUserNames',
      'clearProblem',
      'updateProblemQueryParams'
    ]),
    onSubmit () {
      this.onClickSure()
    },
    onFocus () {
      this.isFocus = true;
    },
    onCancel () {
      this.isFocus = false;
    },
    onClickSure () {
      //进行筛选
      this.clearProblem()
      this.updateProblemQueryParams(this.queryParams)
      this.requestProblem()
      this.showFilter = false

    },
    onProjectChange (projectId) {
      if(projectId == -1)
        this.subprojectId = -1

      this.updateSubProjectNames(projectId)
    }
  },
  computed: {
    ...mapState({
      projectNames : state => state.problem.projectNames,
      subprojectNames : state => state.problem.subprojectNames,
      chargerNames: state => state.problem.chargerNames,
      creatorNames: state => state.problem.creatorNames,
    }),
    queryParams : function(){
      var queryParams = {}
      if(this.projectId != -1)
        queryParams.project_id = this.projectId

      if(this.subprojectId != -1)
        queryParams.subproject_id = this.subprojectId

      if(this.state != -1)
        queryParams.state = this.state

      if(this.step != -1)
        queryParams.prjState = this.step

      if(this.region != -1)
        queryParams.subtype_id = this.region

      if(this.level != '全部')
        queryParams.problemGrade = this.level

      if(this.chargerId != -1)
        queryParams.changer_id = this.chargerId

      if(this.creatorId != -1)
        queryParams.creator_id = this.creatorId

      if(this.keyword != '')
        queryParams.keyword = this.keyword

      return queryParams
    }
  },
  created () {
    this.getProjectNames()
    this.getProblemUserNames()
    this.chargerId = this.filterChargerId
    this.state = this.filterState
    this.updateProblemQueryParams(this.queryParams)
  },
  activated () {
    this.chargerId = this.filterChargerId
    this.state = this.filterState
    this.updateProblemQueryParams(this.queryParams)
  }
}
</script>
