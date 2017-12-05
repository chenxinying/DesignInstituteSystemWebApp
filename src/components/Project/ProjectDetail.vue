<template>
  <div style="height:100%;">
    <div class="search-fix-top">
      <x-header>{{projectName}}/</x-header>
    </div>

    <div class="search-fix-top" style="top:46px;">
      <project-filter :filter-project-id="$route.params.id"></project-filter>
    </div>

    <list-view header="项目列表" :list="subprojects" type="1" @on-scroll-end="onScrollEnd" @on-click-load-more="onClickLoadMore" ref="listView" style="padding-top:90px;"></list-view>

  </div>
</template>

<script>
import { XHeader, Search, XButton } from 'vux'
import { mapState, mapActions } from 'vuex'
import ListView from '../ListView'
import ProjectFilter from '../Project/ProjectFilter'

const Holder = require('holderjs');

export default {
  components: {
    XHeader,
    Search,
    XButton,
    ListView,
    ProjectFilter
  },
  methods: {
    ...mapActions([
      'getSubProjectList'
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
      this.onClickSure()
    },
    onFocus () {
      this.isFocus = true;
    },
    onCancel () {
      this.isFocus = false;
    },
    onScrollEnd () {
      this.getSubProjectList(this.$route.params.id).then(() => {
        this.$refs.listView.setIsLoadEnd(this.isLoadEnd)
        this.updateImg()
      })
    },
    onClickLoadMore () {
      this.getSubProjectList(this.$route.params.id).then(() => {
        this.$refs.listView.setIsLoadEnd(this.isLoadEnd)
        this.$refs.listView.addScrollHandler()
        this.updateImg()
      })
    },
  },
  activated () {
    this.getSubProjectList(this.$route.params.id).then(() => {
      this.$refs.listView.setIsLoadEnd(this.isLoadEnd)
      this.updateImg()
    })
  },
  computed : {
      ...mapState({
      subprojects: state => {
          var showList = []
          var subprojectInfo = state.project.subprojectList.find(item => item.project_id == state.route.params.id)

          subprojectInfo && subprojectInfo.data.forEach(element => {
            var str = ["", "已立项，底图待深化", "底图已深化，底图深化待审核", "底图深化已审核，待标准层下单", "标准层已下单,待变化层下单", "变化层已下单，待归档", "项目已归档"]
            var text = "&text=" + element.name.substring(0, 4)
            var bgArray = ['F86E61', '4DA9EA', '05CC91', 'F8B65F', '578AA9', '5F70A8']
            var bgIndex = element.subproject_id % bgArray.length
            var bg = "&bg=" + bgArray[bgIndex]
            var item = {
              src : "holder.js/60x60?fg=fff" + text + bg,
              title : element.name,
              desc : str[element.state],
              url : '/project/' + element.project_id + '/subproject/' + element.subproject_id,
            }
            showList.push(item)
          });
          return showList
        },
      isLoadEnd : state => {
        var subprojectInfo = state.project.subprojectList.find(item => item.project_id == state.route.params.id)
        return subprojectInfo ? subprojectInfo.loadEnd : false
      },
      projectName : state => {
        var project = state.project.projectList.find(item => item.project_id == state.route.params.id)
        return project ? project.name : "项目列表"
      }
    })
  },
  data () {
   return {
      keyword: '',
      isFocus: false,
    }
  }
}
</script>

<style lang="less" scoped>

</style>
