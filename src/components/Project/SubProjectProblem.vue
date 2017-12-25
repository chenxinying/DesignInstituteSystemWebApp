<template>
  <div style="height:100%;">
    <div class="search-fix-top">
      <x-header>{{projectName}}/{{subprojectName}}/</x-header>
    </div>
    <div class="search-fix-top" style="top:46px;">
      <problem-filter source="project" :filter-project-id="$route.params.project_id" :filter-subproject-id="$route.params.subproject_id"  @on-click-sure="onClickSure" ref="problemFilter"></problem-filter>
    </div>
    <list-view :list="showList" type="5" @on-scroll-end="onScrollEnd" @on-click-load-more="onClickLoadMore" ref="listView" style="padding-top:91px;"></list-view>
  </div>
</template>

<script>
import { XHeader} from 'vux'
import { mapState, mapActions } from 'vuex'
import ProblemFilter from '../Problem/ProblemFilter'
import ListView from '../ListView'

export default {
  components: {
    XHeader,
    ProblemFilter,
    ListView
  },
  computed:{
    ...mapState({
        problems: state => state.problem_project.problems,
        showList: state => {
          var showList = []
          state.problem_project.problems.forEach(element => {

          var bgArray = ['','62DC49', '4E6AA9', 'DCDC4A', '00FFFF', 'FF00FF', 'FF0000', 'CFCFCF']
          var text = "&text=" + element.subtype_name
          var bg = "&bg=" + bgArray[element.subtype_id]

          var item = {
            src: "holder.js/60x60?fg=fff" + text + bg,
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
      isLoadEnd : state => state.problem_project.loadEnd,
      projectList : state => state.project.projectList,
      subprojectList : state =>  state.project.subprojectList,
      myProjects : state => state.project_my.projects,
      projectName : state => state.project_detail.subproject_detail.projectName,
      subprojectName : state => state.project_detail.subproject_detail.name,
    }),
  },
  activated () {
    if(this.goBack){
      this.updateImage()
      return
    }
    this.clearProjectProblem()
    this.$refs.listView.setIsLoadEnd(false)
    var query = {project_id : this.$route.params.project_id, subproject_id : this.$route.params.subproject_id}
    setTimeout(() => {
      this.addProjectProblem(query).then(() => {
        this.$refs.listView.setIsLoadEnd(this.isLoadEnd)
        this.updateImage()
      })
    }, 500)
  },
  data () {
    return {
      goBack : false
    }
  },
  methods : {
     ...mapActions([
      'addProjectProblem',
      'clearProjectProblem',
      'updateImage',
      'updateProblemDetail',
    ]),
    onScrollEnd () {
      setTimeout(() => {
        this.addProjectProblem(this.$refs.problemFilter.queryParams).then(() => {
          this.$refs.listView.setIsLoadEnd(this.isLoadEnd)
          this.updateImage()
        })
      }, 500)
    },
    onClickLoadMore () {
      this.$refs.listView.setIsLoadEnd(false)
      setTimeout(() => {
        this.clearProjectProblem()
        this.addProjectProblem(this.$refs.problemFilter.queryParams).then(() => {
          this.$refs.listView.setIsLoadEnd(this.isLoadEnd)
          this.$refs.listView.addScrollHandler()
          this.updateImage()
        })
      }, 500)
    },
    onClickSure () {
      this.clearProjectProblem()
      this.$refs.listView.setIsLoadEnd(false)
      this.onScrollEnd()
    }
  },
  watch: {
    '$route' (to, from) {
      this.goBack = from.params.id ? true : false
      if(to.params.id){
        //设置问题详细信息
        var problem = this.problems.find(item => item.id == to.params.id)
        this.updateProblemDetail(problem)
      }
    }
  }
}
</script>
