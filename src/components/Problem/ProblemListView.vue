<template>
  <div style="height:100%;">
    <view-box ref="viewBox">
      <panel header="问题列表" :list="problems" type="5" style="padding-top:40px;"></panel>
      <div @click="loadEnd && onClickLoadMore()">
        <load-more :tip="tip" :show-loading="!loadEnd" background-color="#fbf9fe"></load-more>
      </div>
    </view-box>
  </div>
</template>

<script>
import { Panel, ViewBox, LoadMore } from 'vux'
import { mapState, mapActions } from 'vuex'

export default {
  components: {
    Panel,
    ViewBox,
    LoadMore
  },
  props: {
    chargerId : {
      default: -1
    },
    state : {
      default: -1
    }
  },
  methods: {
    ...mapActions([
      'requestProblem',
      'updateProblemLoadEnd'
    ]),

    onScroll : function(){
      var scrollTop = this.$refs.viewBox.getScrollTop()
      var offsetHeight = this.$refs.viewBox.getScrollBody().offsetHeight
      var scrollHeight = this.$refs.viewBox.getScrollBody().scrollHeight

      this.scrollTop = scrollTop

      //滚动至底部
      if(scrollTop + offsetHeight >= scrollHeight && !this.loadEnd){
        this.requestProblem()
      }
    },
    onClickLoadMore : function(){
      this.$refs.viewBox.getScrollBody().removeEventListener('scroll', this.onScroll, false)
      this.updateProblemLoadEnd(false)
      this.requestProblem().then(() => {
        this.$refs.viewBox.getScrollBody().addEventListener('scroll', this.onScroll, false)
      })
    }
  },
  computed: {
    ...mapState({
        problems: state => {
            var showList = []
            state.problem.problems.forEach(element => {
              var item = {
                src: element.file_list[0],
                title: element.title,
                desc: element.subprj_name,
                url: '/problem/' + element.id,
                meta: {
                  source: element.creator_nickname,
                  date: element.create_time,
                  other: element.changer_name + ' ' + element.state_name
                }
              }
              showList.push(item)
            })
            return showList
          },
        loadEnd : state => state.problem.loadEnd
      }),
    tip : function() {
      return this.loadEnd ? '暂无数据 点击刷新' : '正在加载'
    }
  },
  data () {
    return {
      scrollTop : 0
    }
  },
  created () {
    this.requestProblem()
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
