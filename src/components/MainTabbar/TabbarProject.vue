<template>
  <div style="height:100%;">
    <div class="search-fix-top">
      <search v-model="keyword" auto-scroll-to-top @on-submit="onSubmit"></search>
    </div>
    <list-view header="模板厂家列表" :list="projects" type="1" @on-scroll-end="onScrollEnd" @on-click-load-more="onClickLoadMore" ref="listView" style="padding-top:44px;"></list-view>
  </div>
</template>

<script>
import { Search } from 'vux'
import { mapState, mapActions } from 'vuex'
import ListView from '../ListView'
const Holder = require('holderjs');

export default {
  components: {
    Search,
    ListView
  },
  methods: {
     ...mapActions([
      'getProjectList'
    ]),
    updateImg () {
      setTimeout(()=>{
        var myImage = document.querySelectorAll('.weui-media-box__thumb');
        myImage.forEach(element => {
          Holder.run({
            images: element
          });
        })
      }, 0)
    },
    onSubmit () {
      console.log("执行搜索")
    },
    onScrollEnd () {
      this.getProjectList().then(() => {
        this.$refs.listView.setIsLoadEnd(this.isLoadEnd)
        this.updateImg()
      })
    },
    onClickLoadMore () {
      this.getProjectList().then(() => {
        this.$refs.listView.setIsLoadEnd(this.isLoadEnd)
        this.$refs.listView.addScrollHandler()
        this.updateImg()
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
      this.updateImg()
    })
  }
}
</script>
