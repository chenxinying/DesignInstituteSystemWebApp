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
            <selector title="模板厂家" :options="projectNames" v-model="projectId" value-align="left" @on-change="onProjectChange" v-show="filterProjectId==-1"></selector>
            <selector title="项目名称" :options="subprojectNames" v-model="subprojectId" value-align="left"></selector>
            <selector title="项目状态" :options="stateArray" v-model="state" value-align="left"></selector>
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
  props : {
    filterProjectId : {
      default: -1
    },
    isMyProject : {
      default : false
    }
  },
  data () {
    return {
      projectId: this.filterProjectId,
      subprojectId: -1,

      state : -1,
      stateArray :[{key:-1, value:"全部"},
        {key:1, value:"待解决"},
        {key:3, value:"已解决"}],

      keyword: '',
      isFocus: false,
      showFilter: false
    }
  },
  methods : {
     ...mapActions([
      'getProjectNames',
      'updateSubProjectNames',
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
      projectNames : state => state.project.projectNames,
      subprojectNames : state => state.project.subprojectNames,
    }),
    queryParams : function(){
      var queryParams = {}
      if(this.projectId != -1)
        queryParams.project_id = this.projectId

      if(this.subprojectId != -1)
        queryParams.subproject_id = this.subprojectId

      if(this.state != -1)
        queryParams.state = this.state

      if(this.keyword != '')
        queryParams.keyword = this.keyword

      return queryParams
    }
  },
  activated () {

    this.getProjectNames(this.isMyProject)

    if(this.projectId == -1)
      this.subprojectId = -1

    this.updateSubProjectNames(this.projectId)

  },
  deactivated () {
    this.getProjectNames()
  }
}
</script>

<style>
.filter-btn{
  width: 80%;
  line-height: 1.5;
}
</style>
