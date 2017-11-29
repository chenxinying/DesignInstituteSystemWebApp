<template>
  <div style="height:100%;">
    <div class="search-fix-top">
      <x-header class="search-fix-top">项目列表</x-header>
    </div>

    <div class="search-fix-top" style="top:46px;">
      <search
      v-model="keyword"
      position="absolute"
      auto-scroll-to-top
      @on-focus="onFocus"
      @on-cancel="onCancel"
      @on-submit="onSubmit"
      ref="search" class="tab-fix-top">
        <x-button mini slot="right" v-show="!isFocus" @click.native="showFilter=true">筛选</x-button>
      </search>
    </div>

    <div style="padding-top:90px;">
      <view-box ref="viewBox">
      <panel header="项目列表" :list="projects" type="1"></panel>
      </view-box>
    </div>

  </div>
</template>

<script>
import { XHeader, Search, XButton, ViewBox, Panel } from 'vux'
import { mapState, mapActions } from 'vuex'

export default {
  components: {
    XHeader,
    Search,
    XButton,
    ViewBox,
    Panel
  },
  methods: {
    onSubmit () {
      this.onClickSure()
    },
    onFocus () {
      this.isFocus = true;
    },
    onCancel () {
      this.isFocus = false;
    },
  },
  mounted () {

  },
  computed : {
     ...mapState({
        projects: state => {
            var showList = []
            var project = state.project.project_list.find(item => item.project_id == state.route.params.id)
            if(project){
              var strs = ["", "已立项，底图待深化", "底图已深化，底图深化待审核", "底图深化已审核，待标准层下单", "标准层已下单,待变化层下单", "变化层已下单，待归档", "项目已归档"]
              project.subproject_list.forEach(element => {
                var item = {
                  src: project.headimgurl,
                  title: element.name,
                  desc: strs[element.state],
                  url: '/project/' + state.route.params.id + '/subproject/' + element.subproject_id,
                  meta: {
                    source: "",
                    date: "",
                    other: ""
                  }
                }
                showList.push(item)
              })
            }
            return showList
          }
      }),

  },
  data () {
   return {
      states: ["", "已立项，底图待深化", "底图已深化，底图深化待审核", "底图深化已审核，待标准层下单", "标准层已下单,待变化层下单", "变化层已下单，待归档", "项目已归档"],
      keyword: '',
      isFocus: false,
      tprojects: [{
        src: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
        fallbackSrc: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
        title: '任务一',
        desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
        url: '/component/cell',
        meta: {
          source: '来源信息',
          date: '时间',
          other: '其他信息'
        }
      }, {
        src: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
        title: '任务二',
        desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
        url: {
          path: '/component/radio',
          replace: false
        },
        meta: {
          source: '来源信息',
          date: '时间',
          other: '其他信息'
        }
      }, {
        src: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
        title: '任务三',
        desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
        url: {
          path: '/component/radio',
          replace: false
        },
        meta: {
          source: '来源信息',
          date: '时间',
          other: '其他信息'
        }
      }, {
        src: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
        title: '任务四',
        desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
        url: {
          path: '/component/radio',
          replace: false
        },
        meta: {
          source: '来源信息',
          date: '时间',
          other: '其他信息'
        }
      }, {
        src: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
        title: '任务五',
        desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
        url: {
          path: '/component/radio',
          replace: false
        },
        meta: {
          source: '来源信息',
          date: '时间',
          other: '其他信息'
        }
      },{
        src: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
        fallbackSrc: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
        title: '任务一',
        desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
        url: '/component/cell',
        meta: {
          source: '来源信息',
          date: '时间',
          other: '其他信息'
        }
      }, {
        src: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
        title: '任务二',
        desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
        url: {
          path: '/component/radio',
          replace: false
        },
        meta: {
          source: '来源信息',
          date: '时间',
          other: '其他信息'
        }
      }, {
        src: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
        title: '任务三',
        desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
        url: {
          path: '/component/radio',
          replace: false
        },
        meta: {
          source: '来源信息',
          date: '时间',
          other: '其他信息'
        }
      }, {
        src: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
        title: '任务四',
        desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
        url: {
          path: '/component/radio',
          replace: false
        },
        meta: {
          source: '来源信息',
          date: '时间',
          other: '其他信息'
        }
      }, {
        src: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
        title: '任务五',
        desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
        url: {
          path: '/component/radio',
          replace: false
        },
        meta: {
          source: '来源信息',
          date: '时间',
          other: '其他信息'
        }
      }]
    }
  }
}
</script>

<style lang="less" scoped>

</style>
