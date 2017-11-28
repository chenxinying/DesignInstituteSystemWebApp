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

//Project
import ProjectDetail from '@/components/Project/ProjectDetail'
import SubProjectDetail from '@/components/Project/SubProjectDetail'

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
      path: '/project/:prj_id/subproject/:subprj_id',
      component : SubProjectDetail
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
      path: '/mypersoninfo',
      component: MyPersonInfo
    }
  ]
})
