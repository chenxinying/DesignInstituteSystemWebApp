<template>

  <div>
    <search
    v-model="keyword"
    @on-focus="onFocus"
    @on-cancel="onCancel"
    @on-submit="onSubmit"
    position="absolute"
    ref="search">
    <x-button mini slot="right" v-show="!isFocus" @click.native="showFilter=true">筛选</x-button>
    </search>

    <div v-transfer-dom>
      <popup v-model="showFilter" position="right">
        <div style="width:220px;">

          <group title="项目筛选">
            <selector title="模板厂家" :options="projectNames" v-model="projectId" value-align="left" v-show="filterProjectId==-1"></selector>
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
  },
  data () {
    return {
      projectId: this.filterProjectId,

      state : -1,
      stateArray :[{key:-1, value:"全部"},
        {key:1, value:"已立项，底图深化中..."},
        {key:2, value:"底图已深化，深化审核中..."},
        {key:3, value:"深化已审核，标准层设计中..."},
        {key:4, value:"标准层已下单,变化层设计中..."},
        {key:5, value:"变化层已下单，项目归档中..."},
        {key:6, value:"项目已归档"}],

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
      if(this.keyword != ''){
        this.keyword = ''
        this.onClickSure()
      }
    },
    onClickSure () {
      this.$emit('on-click-sure')
      this.showFilter = false
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

      if(this.state != -1)
        queryParams.state = this.state

      if(this.keyword != '')
        queryParams.keyword = this.keyword

      return queryParams
    }
  },
  activated () {

    this.$refs.search.cancel()
    this.keyword = ''
    this.state = -1
    this.projectId = -1

    if(this.filterProjectId == -1){
      this.getProjectNames(true)
    }
  },
}
</script>

<style>
.filter-btn{
  width: 80%;
  line-height: 1.5;
}
</style>
