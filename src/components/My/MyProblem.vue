<template>
  <div style="height:100%;">
    <div class="search-fix-top">
      <x-header>我待解决的问题</x-header>
    </div>
    <div class="search-fix-top" style="top:46px;">
      <problem-filter :filter-charger-id="openid" filter-state="1" :is-my-problem="true"></problem-filter>
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
        openid: state => state.openid,
        queryParams: state => state.problem.queryParams,
        problems: state => {
          var showList = []
          state.problem.myProblems.forEach(element => {
            var item = {
              src: element.file_list[0],
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
        isLoadEnd : state => state.problem.myLoadEnd
      }),
  },
  created () {
    this.oldQueryParams = {...this.queryParams}
    this.updateProblemQueryParams({changer_id : this.openid, state : 1})
    this.requestProblem(true).then(() => {
        this.$refs.listView.setIsLoadEnd(this.isLoadEnd)
    })
  },
  activated () {
    this.oldQueryParams = {...this.queryParams}
    this.updateProblemQueryParams({changer_id : this.openid, state : 1})
  },
  deactivated () {
    this.updateProblemQueryParams(this.oldQueryParams)
  },
  methods : {
     ...mapActions([
      'requestProblem',
      'updateProblemQueryParams'
    ]),
    onScrollEnd : function(){
      this.requestProblem(true).then(() => {
        this.$refs.listView.setIsLoadEnd(this.isLoadEnd)
      })
    },
    onClickLoadMore : function(){
      this.requestProblem(true).then(() => {
        this.$refs.listView.setIsLoadEnd(this.isLoadEnd)
        this.$refs.listView.addScrollHandler()
      })
    }
  },
  data () {
    return {
      oldQueryParams : {}
    }
  }
}
</script>
