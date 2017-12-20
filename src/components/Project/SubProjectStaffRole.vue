<template>
  <div style="height:100%;">

    <div class="search-fix-top">
      <x-header>{{projectName}}/{{subprojectName}}/</x-header>
    </div>

    <div class="search-fix-top" style="top:46px;">
      <checklist title="角色详情" disabled label-position="left" :options="checklist" v-model="checklist"></checklist>
    </div>
  </div>
</template>

<script>
import { Search, XHeader, Card, Group, Checklist } from 'vux'
import { mapState, mapActions } from 'vuex'
import ListView from '../ListView'

export default {
  components: {
    Search,
    ListView,
    XHeader,
    Card,
    Group,
    Checklist
  },
  methods: {
     ...mapActions([

    ]),
    onSubmit () {
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
  },
  data () {
    return {
      projectName: '',
      subprojectName: '',
      strArrays : ['', '区域经理', '底图组', '总工室总工', '总工室变化层设计组', '总工室施工图组', '	检查组', '	设计组'],
      commonList: [ '区域经理', '底图组', '总工室总工', '总工室变化层设计组', '总工室施工图组', '	检查组', '	设计组'],
      //checklist: [ '区域经理', '底图组' ],
    }
  },
  computed: {
    ...mapState({
        role: state => state.project_staff.staffList.find(item => item.openid == state.route.params.openid),
        projectList : state => state.project.projectList,
        subprojectList : state =>  state.project.subprojectList,
        myProjects : state => state.project_my.projects,
      }),
    checklist : function(){
      var lists = []
      var ids = this.role.role_id.split(",")
      ids.forEach(element => {
        lists.push(this.strArrays[element])
      });
      return lists
    }
  },
  activated () {
    this.initHeaderNames()
  }
}
</script>

<style scoped lang="less">

</style>
