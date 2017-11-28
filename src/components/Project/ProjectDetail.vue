<template>
  <div>
    <x-header class="search-fix-top">项目列表</x-header>
        <search
      :results="results"
      v-model="keyword"
      auto-scroll-to-top
      @on-focus="onFocus"
      @on-cancel="onCancel"
      @on-submit="onSubmit"
      ref="search">
      <x-button mini slot="right" v-show="!isFocus" @click.native="showFilter=true">筛选</x-button>
      </search>
    </div>
  </div>
</template>


<script>
import { XHeader, Search, XButton } from 'vux'
import { mapState, mapActions } from 'vuex'

export default {
  components: {
    XHeader,
    Search,
    XButton
  },
  methods: {
    setFocus () {
      this.$refs.search.setFocus()
    },
    onSubmit () {
      this.onClickSure()
    },
    onFocus () {
      this.isFocus = true;
    },
    onCancel () {
      this.isFocus = false;
    },
  },
  mounted () {

  },
  computed : {

  },
  data () {
   return {
      results: [],
      keyword: '',
      isFocus: false,
    }
  }
}
</script>

<style lang="less" scoped>

</style>
