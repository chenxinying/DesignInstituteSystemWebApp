<template>

  <div class="search-fix-top">

    <search
    :results="results"
    v-model="value"
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
            <selector title="项目名称" :options="['全部', '项目1', '项目2', '项目3', '项目4']" v-model="project" value-align="left"></selector>
          </group>

          <group title="任务筛选">
            <selector title="任务分组" :options="['全部', '标准部位配模','标准部位加工图', '标准部位清单','交接部位配模','交接部位加工图', '交接部位清单','底图', '施工图']" v-model="step" value-align="left"></selector>
            <selector title="任务名称" :options="['全部', '楼板','梁板', '墙板','飘台', '楼梯', '背楞', '其他']" v-model="location" value-align="left"></selector>
            <selector title="紧急程度" :options="['全部', '普通','紧急', '非常紧急']" v-model="level" value-align="left"></selector>
          </group>

          <group title="人员筛选">
              <selector title="负责人" :options="['全部', '陈新颖','吴丹丹']" v-model="step" value-align="left"></selector>
              <selector title="参与人" :options="['全部', '陈新颖','吴丹丹']" v-model="step" value-align="left"></selector>
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
      project: '全部',
      step: '全部',
      location:'全部',
      level: '全部',
      results: [],
      value: '',
      isFocus: false,
      showFilter: false
    }
  },
  methods: {
    setFocus () {
      this.$refs.search.setFocus()
    },
    onSubmit () {
    },
    onFocus () {
      this.isFocus = true;
    },
    onCancel () {
      this.isFocus = false;
    },
    onClickSure () {
      console.log("a");
      console.log(this.$slots.filter.data)
    }
  }
}
</script>
