<template>
  <div style="height:100%;">
    <div class="search-fix-top">
      <search v-model="keyword" @on-cancel="onCancel" @on-submit="onSubmit"></search>
    </div>
    <list-view header="模板厂家列表" :list="projects" type="5" @on-scroll-end="onScrollEnd" @on-click-load-more="onClickLoadMore" ref="listView" style="padding-top:44px;"></list-view>
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
      'getProjectList',
      'clearProjectList',
      'updateImage'
    ]),
    onSubmit () {
      this.clearProjectList()
      this.onScrollEnd()
    },
    onCancel () {
      if(this.keyword != ''){
        this.keyword = ''
        this.onSubmit()
      }
    },
    onScrollEnd () {
      this.getProjectList({keyword : this.keyword}).then(() => {
        this.$refs.listView.setIsLoadEnd(this.isLoadEnd)
        this.updateImage()
      })
    },
    onClickLoadMore () {
      this.getProjectList({keyword : this.keyword}).then(() => {
        this.$refs.listView.setIsLoadEnd(this.isLoadEnd)
        this.$refs.listView.addScrollHandler()
        this.updateImage()
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
            state.project.projectList.forEach(element => {

              var text = "&text=" + element.name.substring(0, 4)
              var bgArray = ['F86E61', '4DA9EA', '05CC91', 'F8B65F', '578AA9', '5F70A8']
              var bgIndex = element.project_id % bgArray.length
              var bg = "&bg=" + bgArray[bgIndex]

              var item = {
                src : "holder.js/60x60?fg=fff" + text + bg,
                title : element.name,
                desc : '项目总数：' + element.subptoject_count,
                url : '/project/' + element.project_id,
                meta: {
                  date: '已归档数：' + element.subptoject_state_count6,
                  other: '<span style="color:red">正在进行数：'+ (element.subptoject_count - element.subptoject_state_count6) +'</span>'
                }
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
      this.updateImage()
    })
  }
}
</script>
