<template>
  <div style="height:100%;">
    <div class="search-fix-top">
      <search v-model="keyword" auto-scroll-to-top @on-submit="onSubmit"></search>
    </div>
    <list-view header="模板厂列表" :list="projects" type="3" @on-scroll-end="onScrollEnd" @on-click-load-more="onClickLoadMore" ref="listView" style="padding-top:45px;"></list-view>
  </div>
</template>

<script>
import { Search } from 'vux'
import { mapState, mapActions } from 'vuex'
import ListView from '../ListView'

export default {
  components: {
    Search,
    ListView
  },
  methods: {
     ...mapActions([
      'getProjectList'
    ]),
    onSubmit () {
      console.log("执行搜索")
    },
    onScrollEnd : function(){
      this.getProjectList().then(() => {
        this.$refs.listView.setIsLoadEnd(this.isLoadEnd)
      })
    },
    onClickLoadMore : function(){
      this.getProjectList().then(() => {
        this.$refs.listView.setIsLoadEnd(this.isLoadEnd)
        this.$refs.listView.addScrollHandler()
      })
    },
  },
  data () {
    return {
      keyword: ''
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
        isLoadEnd : state => state.project.loadEnd
      })
  },
  created () {
    this.getProjectList().then(() => {
      this.$refs.listView.setIsLoadEnd(this.isLoadEnd)
    })
  }
}
</script>
