import Vue from 'vue'
import Router from 'vue-router'

//Main Tabbar
import Tabbar from '@/components/MainTabbar/Tabbar'
import Project from '@/components/MainTabbar/TabbarProject'
import Task from '@/components/MainTabbar/TabbarTask'
import Problem from '@/components/MainTabbar/TabbarProblem'
import Profile from '@/components/MainTabbar/TabbarProfile'

//My Things
import MyProject from '@/components/My/MyProject'
import MyTask from '@/components/My/MyTask'
import MyProblem from '@/components/My/MyProblem'
import MyPersonInfo from '@/components/My/MyPersonInfo'

//My Edit
import EditRealName from '@/components/My/EditRealName'
import EditCellPhone from '@/components/My/EditCellPhone'

//Project
import ProjectDetail from '@/components/Project/ProjectDetail'
import SubProjectDetail from '@/components/Project/SubProjectDetail'
import SubProjectProblem from '@/components/Project/SubProjectProblem'
import SubProjectTaskgroupList from '@/components/Project/SubProjectTaskgroupList'
import SubProjectTaskList from '@/components/Project/SubProjectTaskList'
import SubProjectTaskDetail from '@/components/Project/SubProjectTaskDetail'

//Problem
import ProblemDetail from '@/components/Problem/ProblemDetail'

//NotInstUser
import NotInstUser from '@/components/NotInstUser'




Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/error',
      component : NotInstUser
    },
    {
      path: '/project',
      components: {
        default : Project,
        navbar : Tabbar
      }
    },
    {
      path: '/task',
      components: {
        default : Task,
        navbar : Tabbar
      }
    },
    {
      path: '/problem',
      components: {
        default : Problem,
        navbar : Tabbar
      }
    },
    {
      path: '/profile',
      components: {
        default : Profile,
        navbar : Tabbar
      }
    },
    {
      path: '/project/:id',
      component : ProjectDetail
    },
    {
      path: '/project/:project_id/subproject/:subproject_id',
      component : SubProjectDetail
    },
    {
      path: '/project/:project_id/subproject/:subproject_id/problem',
      component : SubProjectProblem
    },
    {
      path: '/project/:project_id/subproject/:subproject_id/taskgroup',
      component : SubProjectTaskgroupList
    },
    {
      path: '/project/:project_id/subproject/:subproject_id/taskgroup/:taskgroup_id',
      component : SubProjectTaskList
    },
    {
      path: '/project/:project_id/subproject/:subproject_id/taskgroup/:taskgroup_id/task/:task_id',
      component : SubProjectTaskDetail
    },
    {
      path: '/problem/:id',
      component : ProblemDetail
    },
    {
      path: '/myproject',
      component: MyProject
    },
    {
      path: '/myproblem',
      component: MyProblem
    },
    {
      path: '/mytask',
      component: MyTask
    },
    {
      path: '/personinfo',
      component: MyPersonInfo
    },
    {
      path: '/personinfo/edit/name',
      component: EditRealName
    },
    {
      path: '/personinfo/edit/phone',
      component: EditCellPhone
    },
  ]
})
