<template>
  <div style="height:100%;">
    <div class="search-fix-top">
      <x-header>{{projectName}}/{{subproject.name}}/</x-header>
    </div>
    <div class="search-fix-top" style="top:46px;">
      <problem-filter :filter-project-id="$route.params.project_id" :filter-subproject-id="$route.params.subproject_id"  @on-click-sure="onClickSure" ref="problemFilter"></problem-filter>
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
      projectName : state => {
        var project = state.project.projectList.find(item => item.project_id == state.route.params.project_id)
        if(project) return project.name;
        project = state.project.myProjectList.find(item => item.subproject_id == state.route.params.subproject_id)
        if(project) return project.projet_name;
        return ""
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
    var query = {project_id : this.$route.params.project_id, subproject_id : this.$route.params.subproject_id}
    this.addProjectProblem(query).then(() => {
      this.$refs.listView.setIsLoadEnd(this.isLoadEnd)
      this.updateImage()
    })
  },
  activated () {
    //this.updateProblemQueryParams({project_id : this.$route.params.project_id, subproject_id : this.$route.params.subproject_id})
  },
  deactivated () {
    //this.updateProblemQueryParams(this.oldQueryParams)
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
      this.addProjectProblem(this.$refs.problemFilter.queryParams).then(()=>{
        this.$refs.listView.setIsLoadEnd(this.isLoadEnd)
        this.updateImage()
      })
    }
  }
}
</script>
