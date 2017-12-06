<template>
  <div style="height:100%;">
    <div class="search-fix-top">
      <x-header>我待解决的问题</x-header>
    </div>
    <div class="search-fix-top" style="top:46px;">
      <problem-filter :filter-charger-id="openid" filter-state="1" @on-click-sure="onClickSure" ref="problemFilter"></problem-filter>
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
        problems: state => {
          var showList = []
          state.problem_my.problems.forEach(element => {

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
        isLoadEnd : state => state.problem_my.loadEnd
      }),
  },
  created () {
    this.addMyProblem().then(() => {
      this.$refs.listView.setIsLoadEnd(this.isLoadEnd)
      this.updateImage()
    })
  },
  activated () {
    //this.updateProblemQueryParams({changer_id : this.openid, state : 1})
  },
  deactivated () {
    //this.updateProblemQueryParams(this.oldQueryParams)
  },
  methods : {
     ...mapActions([
      'addMyProblem',
      'clearMyProblem',
      'updateImage'
    ]),
    onScrollEnd () {
      this.addMyProblem(this.$refs.problemFilter.queryParams).then(() => {
        this.$refs.listView.setIsLoadEnd(this.isLoadEnd)
        this.updateImage()
      })
    },
    onClickLoadMore () {
      this.addMyProblem(this.$refs.problemFilter.queryParams).then(() => {
        this.$refs.listView.setIsLoadEnd(this.isLoadEnd)
        this.$refs.listView.addScrollHandler()
        this.updateImage()
      })
    },
    onClickSure () {
      this.clearMyProblem()
      this.addMyProblem(this.$refs.problemFilter.queryParams).then(()=>{
        this.$refs.listView.setIsLoadEnd(this.isLoadEnd)
        this.updateImage()
      })
    }
  }
}
</script>
