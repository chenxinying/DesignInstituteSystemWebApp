<template>
  <div style="height:100%;">

    <div class="search-fix-top">
      <x-header>{{projectName}}/{{subproject.name}}/</x-header>
    </div>

    <div class="search-fix-top" style="top:46px;">
      <search v-model="keyword" auto-scroll-to-top @on-submit="onSubmit"></search>
    </div>

    <list-view header="任务组列表" :list="lists" type="1" @on-scroll-end="onScrollEnd" @on-click-load-more="onClickLoadMore" ref="listView" style="margin-top:90px;"></list-view>

  </div>
</template>

<script>
import { Search, XHeader, Card, Group } from 'vux'
import { mapState, mapActions } from 'vuex'
import ListView from '../ListView'
const Holder = require('holderjs');

export default {
  components: {
    Search,
    ListView,
    XHeader,
    Card,
    Group
  },
  methods: {
     ...mapActions([
      'getTaskgroupList'
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
      this.getTaskgroupList(this.$route.params.subproject_id).then(() => {
        this.$refs.listView.setIsLoadEnd(this.isLoadEnd)
        this.updateImg()
      })
    },
    onClickLoadMore () {
      this.getTaskgroupList(this.$route.params.subproject_id).then(() => {
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
        lists: state => {
            var showList = []

            state.task.taskgroupList.forEach(element => {

              var text = "&text=" + element.name.substring(0, 4)
              var bgArray = ['F86E61', '4DA9EA', '05CC91', 'F8B65F', '578AA9', '5F70A8']
              var bgIndex = element.id % bgArray.length
              var bg = "&bg=" + bgArray[bgIndex]

              var item = {
                src : "holder.js/60x60?fg=fff" + text + bg,
                title : element.name,
                url : '/project/' + state.route.params.project_id + '/subproject/' + state.route.params.subproject_id + '/taskgroup/' + element.id,
              }
              showList.push(item)
            });
            return showList
          },
        isLoadEnd : state => state.task.loadEnd,
        projectName : state => {
          var project = state.project.projectList.find(item => item.project_id == state.route.params.project_id)
          return project ? project.name : "项目列表"
        },
        subproject : state => {
          var subproject;
          var project = state.project.subprojectList.find(item => item.project_id == state.route.params.project_id)
          if(project){
            subproject = project.data.find(item => item.subproject_id == state.route.params.subproject_id)
          }
          if(!subproject){
            subproject = state.project_my.projects.find(item => item.subproject_id == state.route.params.subproject_id)
          }
          if(!subproject){
            //发送请求
          }
          return subproject
        },
      }),
  },
  created () {
    this.getTaskgroupList(this.$route.params.subproject_id).then(() => {
      this.$refs.listView.setIsLoadEnd(this.isLoadEnd)
      this.updateImg()
    })
  }
}
</script>

<style scoped lang="less">
@import '~vux/src/styles/1px.less';
.card-demo-flex {
  display: flex;
}
.card-demo-content01 {
  padding: 10px 0;
}
.card-padding {
  padding: 15px;
}
.card-demo-flex > div {
  flex: 1;
  text-align: center;
  font-size: 12px;
}
.card-demo-flex span {
  color: #f74c31;
}

.flexbox-demo{
  background-color: #fff;
  padding-top: 20px;
  padding-bottom: 20px;
}
.flex-img {
  text-align: center;
}
.flex-info {
  text-align: left;
}
</style>
