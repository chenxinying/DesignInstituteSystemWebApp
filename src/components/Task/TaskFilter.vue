<template>
  <div>
    <search
    v-model="keyword"
    position="absolute"
    @on-focus="onFocus"
    @on-cancel="onCancel"
    @on-submit="onSubmit"
    :placeholder="placeholder"
    ref="search">
    <x-button mini slot="right" v-show="!isFocus" @click.native="showFilter=true">筛选</x-button>
    </search>
    <div v-transfer-dom>
      <popup v-model="showFilter" position="right">
        <div style="width:220px;">
          <group title="任务筛选">
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
export default {
  directives: {
    TransferDom
  },
  components: {
    Group, Selector, XButton, TransferDom, Popup, Flexbox, FlexboxItem, Search
  },
  data () {
    return {

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
    }
  },
  computed: {
      queryParams () {
      var queryParams = {}

      if(this.state != -1)
        queryParams.state = this.state

      if(this.urgent != -1)
        queryParams.urgent = this.urgent

      if(this.keyword != '')
        queryParams.keyword = this.keyword

      return queryParams
    }
  },
  activated () {
    this.$refs.search.cancel()
    this.state = -1
    this.urgent = -1
  }
}
</script>
