<template>
  <div style="height:100%;">
    <div class="search-fix-top">
      <search
      v-model="keyword"
      auto-scroll-to-top
      @on-submit="onSubmit"
      ref="search">
      </search>
    </div>

    <view-box ref="viewBox">
    <panel header="模板厂列表" :list="projects" type="1" style="padding-top:40px;"></panel>
    <div @click="loadEnd && onClickLoadMore()">
      <load-more :tip="tip" :show-loading="!loadEnd" background-color="#fbf9fe"></load-more>
    </div>
    </view-box>
  </div>
</template>

<script>
import { Panel, ViewBox, LoadMore, Search, XButton } from 'vux'
import { mapState, mapActions } from 'vuex'
import Tabbar from './Tabbar'

export default {
  components: {
    Panel,
    ViewBox,
    Tabbar,
    LoadMore,
    Search,
    XButton
  },
  methods: {
     ...mapActions([
      'getProjectList',
      'updateProjectLoadEnd'
    ]),
    onSubmit () {
      console.log("a")
    },
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
      this.updateProjectLoadEnd(false)
      this.getProjectList().then(() => {
        this.$refs.viewBox.getScrollBody().addEventListener('scroll', this.onScroll, false)
      })
    }
  },
  data () {
    return {
     scrollTop : 0,
      keyword: '',
      isFocus: false,
    }
  },
  computed: {
    ...mapState({
        projects: state => {
            var showList = []
            state.project.project_list.forEach(element => {
              var item = {
                src : element.headimgurl,
                title : element.name,
                url : '/project/' + element.project_id,
              }
              showList.push(item)
            });
            return showList
          },
        loadEnd : state => state.project.loadEnd
      }),
      tip : function() {
        return this.loadEnd ? '暂无数据 点击刷新' : '正在加载'
      }
  },
  created () {
    this.getProjectList()
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
