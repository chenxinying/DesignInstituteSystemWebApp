<template>
  <div style="height:100%;">

    <div class="search-fix-top">
      <x-header>{{projectName}}/{{subprojectName}}/</x-header>
    </div>

    <div class="search-fix-top" style="top:46px;">
      <search v-model="keyword" @on-submit="onSubmit" @on-cancel="onCancel" position="absolute" ref="search"></search>
    </div>

    <list-view header="参与人员" :list="lists" type="3" @on-scroll-end="onScrollEnd" @on-click-load-more="onClickLoadMore" ref="listView" style="margin-top:90px;"></list-view>

  </div>
</template>

<script>
import { Search, XHeader } from 'vux'
import { mapState, mapActions } from 'vuex'
import ListView from '../ListView'

export default {
  components: {
    Search,
    ListView,
    XHeader,
  },
  methods: {
     ...mapActions([
      'updateStaffList',
    ]),
    onSubmit () {
      this.onScrollEnd()
    },
    onCancel(){
     if(this.keyword != ''){
        this.keyword = ''
        this.onSubmit()
      }
    },
    onScrollEnd () {
      var queryParams = {
        subproject_id : this.$route.params.subproject_id,
        keyword : this.keyword
      }
      setTimeout(() => {
        this.updateStaffList(queryParams).then(() => {
          this.$refs.listView.setIsLoadEnd(this.isLoadEnd)
        })
      }, 500)
    },
    onClickLoadMore () {
      var queryParams = {
        subproject_id : this.$route.params.subproject_id,
        keyword : this.keyword
      }
      setTimeout(() => {
        this.updateStaffList(queryParams).then(() => {
          this.$refs.listView.setIsLoadEnd(this.isLoadEnd)
          this.$refs.listView.addScrollHandler()
        })
      }, 500)
    }
  },
  data () {
    return {
      keyword: '',
      goBack: false
    }
  },
  computed: {
    ...mapState({
        lists: state => {
            var showList = []
            state.project_staff.staffList.forEach(element => {
              var item = {
                src : element.headimgurl,
                title : element.nickname,
                url : '/project/' + state.route.params.project_id + '/subproject/' + state.route.params.subproject_id + '/staff/' + element.openid,
              }
              showList.push(item)
            });
            return showList
        },
        isLoadEnd : state => state.project_staff.loadEnd,
        projectList : state => state.project.projectList,
        subprojectList : state =>  state.project.subprojectList,
        myProjects : state => state.project_my.projects,
        projectName : state => state.project_detail.subproject_detail.projectName,
        subprojectName : state => state.project_detail.subproject_detail.name,
      }),
  },
  activated () {
    this.keyword = ''
    this.$refs.search.cancel()
    if(this.goBack) return
    this.$refs.listView.setIsLoadEnd(false)
    this.onScrollEnd()
  },
  watch: {
    '$route' (to, from) {
      this.goBack = from.params.openid ? true : false
    }
  }
}
</script>

<style>
.weui-panel__bd .weui-media-box .weui-cells .weui-cell .weui-cell__hd img{
  border-radius:50%;
}
</style>
