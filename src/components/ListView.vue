<template>
  <div style="height:100%;">
    <view-box ref="viewBox">
      <panel :header="header" :list="list" :type="type"></panel>
      <div @click="isLoadEnd && onClickLoadMore()">
        <load-more :tip="tip" :show-loading="!isLoadEnd" background-color="#fbf9fe"></load-more>
      </div>
    </view-box>
  </div>
</template>

<script>
import { Panel, ViewBox, LoadMore } from 'vux'

export default {
  components: {
    Panel,
    ViewBox,
    LoadMore
  },
  methods: {
    onScroll : function(){
      var scrollTop = this.$refs.viewBox.getScrollTop()
      var offsetHeight = this.$refs.viewBox.getScrollBody().offsetHeight
      var scrollHeight = this.$refs.viewBox.getScrollBody().scrollHeight
      this.scrollTop = scrollTop
      //滚动至底部
      if(scrollTop + offsetHeight >= scrollHeight && !this.isLoadEnd){
        this.$emit('on-scroll-end')
      }
    },
    onClickLoadMore : function(){
      this.$refs.viewBox.getScrollBody().removeEventListener('scroll', this.onScroll, false)
      this.isLoadEnd = false
      this.$emit('on-click-load-more')
    },
    setIsLoadEnd : function(value){
      this.isLoadEnd = value
    },
    addScrollHandler : function(){
      this.$refs.viewBox.getScrollBody().addEventListener('scroll', this.onScroll, false)
    },
  },
  props: {
    header : String,
    list : Array,
    type : {
      type: String,
      default: "1"
    }
  },
  computed: {
    tip : function() {
      return this.isLoadEnd ? '暂无数据 点击刷新' : '正在加载'
    }
  },
  data () {
    return {
      scrollTop : 0,
      isLoadEnd : false,
    }
  },
  mounted () {
    this.$nextTick(function () {
      this.$refs.viewBox.getScrollBody().addEventListener('scroll', this.onScroll, false)
    })
  },
  activated () {
    this.$refs.viewBox.scrollTo(this.scrollTop)
    this.$refs.viewBox.getScrollBody().addEventListener('scroll', this.onScroll, false)
  },
  deactivated () {
    this.$refs.viewBox.getScrollBody().removeEventListener('scroll', this.onScroll, false)
  }
}
</script>

<style>
.weui-media-box__thumb{
  height: 60px;
}
</style>
