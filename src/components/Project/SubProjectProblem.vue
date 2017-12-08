<template>
  <div style="height:100%;">
    <div class="search-fix-top">
      <x-header>{{projectName}}/{{subprojectName}}/</x-header>
    </div>
    <div class="search-fix-top" style="top:46px;">
      <problem-filter source="project" :filter-project-id="$route.params.project_id" :filter-subproject-id="$route.params.subproject_id"  @on-click-sure="onClickSure" ref="problemFilter"></problem-filter>
    </div>
    <list-view :list="problems" type="5" @on-scroll-end="onScrollEnd" @on-click-load-more="onClickLoadMore" ref="listView" style="padding-top:91px;"></list-view>
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
        problems: state => {
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
    }),
  },
  activated () {
    this.initHeaderNames()
    this.clearProjectProblem()
    var query = {project_id : this.$route.params.project_id, subproject_id : this.$route.params.subproject_id}
    this.addProjectProblem(query).then(() => {
      this.$refs.listView.setIsLoadEnd(this.isLoadEnd)
      this.updateImage()
    })
  },
  data () {
    return {
      projectName: '',
      subprojectName: ''
    }
  },
  methods : {
     ...mapActions([
      'addProjectProblem',
      'clearProjectProblem',
      'updateImage'
    ]),
    onScrollEnd () {
      this.addProjectProblem(this.$refs.problemFilter.queryParams).then(() => {
        this.$refs.listView.setIsLoadEnd(this.isLoadEnd)
        this.updateImage()
      })
    },
    onClickLoadMore () {
      this.addProjectProblem(this.$refs.problemFilter.queryParams).then(() => {
        this.$refs.listView.setIsLoadEnd(this.isLoadEnd)
        this.$refs.listView.addScrollHandler()
        this.updateImage()
      })
    },
    onClickSure () {
      this.clearProjectProblem()
      this.onScrollEnd()
    },
    initHeaderNames () {
      var project = this.projectList.find(item => item.project_id == this.$route.params.project_id)
      this.projectName = project ? project.name : "模板厂家"

      var subproject;
      var project = this.subprojectList.find(item => item.project_id == this.$route.params.project_id)
      if(project){
        subproject = project.data.find(item => item.id == this.$route.params.subproject_id)
      }
      if(!subproject){
        subproject = this.myProjects.find(item => item.subproject_id == this.$route.params.subproject_id)
      }
      this.subprojectName = subproject ?subproject.name : "项目"
    }
  }
}
</script>
