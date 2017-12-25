<template>
  <div style="height:100%;">
    <div class="search-fix-top">
      <problem-filter @on-click-sure="onClickSure" ref="problemFilter"></problem-filter>
    </div>
    <list-view header="问题列表" :list="showList" type="5" @on-scroll-end="onScrollEnd" @on-click-load-more="onClickLoadMore" ref="listView" style="padding-top:45px;"></list-view>
  </div>
</template>

<script>
import ProblemFilter from '../Problem/ProblemFilter'
import ListView from '../ListView'

import { mapState, mapActions } from 'vuex'

export default {
  components: {
    ProblemFilter,
    ListView
  },
  methods : {
     ...mapActions([
      'addProblem',
      'clearProblem',
      'updateImage',
      'updateProblemDetail',
    ]),
    onScrollEnd () {
      setTimeout(() => {
        this.addProblem(this.$refs.problemFilter.queryParams).then(() => {
          this.$refs.listView.setIsLoadEnd(this.isLoadEnd)
          this.updateImage()
        })
      }, 500)
    },
    onClickLoadMore () {
      this.$refs.listView.setIsLoadEnd(false)
      setTimeout(() => {
        this.clearProblem()
        this.addProblem(this.$refs.problemFilter.queryParams).then(() => {
          this.$refs.listView.setIsLoadEnd(this.isLoadEnd)
          this.$refs.listView.addScrollHandler()
          this.updateImage()
        })
      }, 500)
    },
    onClickSure () {
      this.clearProblem()
      this.$refs.listView.setIsLoadEnd(false)
      this.onScrollEnd()
    }
  },
  computed : {
    ...mapState({
      problems: state => state.problem.problems,
      showList: state => {
          var showList = []
          state.problem.problems.forEach(element => {

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
      isLoadEnd : state => state.problem.loadEnd
    }),
  },
  created () {
    setTimeout(() => {
      this.addProblem().then(() => {
        this.$refs.listView.setIsLoadEnd(this.isLoadEnd)
        this.updateImage()
      })
    }, 500)
  },
  watch: {
    '$route' (to, from) {
      if(to.params.id){
        //设置问题详细信息
        var problem = this.problems.find(item => item.id == to.params.id)
        this.updateProblemDetail(problem)
      }
    }
  }
}

</script>
