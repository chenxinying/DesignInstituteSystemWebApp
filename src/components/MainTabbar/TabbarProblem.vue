<template>
  <div style="height:100%;">
    <div class="search-fix-top">
      <problem-filter></problem-filter>
    </div>
    <list-view :list="problems" type="5" @on-scroll-end="onScrollEnd" @on-click-load-more="onClickLoadMore" ref="listView" style="padding-top:45px;"></list-view>
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
      'requestProblem'
    ]),
    onScrollEnd : function(){
      this.requestProblem().then(() => {
        this.$refs.listView.setIsLoadEnd(this.isLoadEnd)
      })
    },
    onClickLoadMore : function(){
      this.requestProblem().then(() => {
        this.$refs.listView.setIsLoadEnd(this.isLoadEnd)
        this.$refs.listView.addScrollHandler()
      })
    }
  },
  computed : {
    ...mapState({
      problems: state => {
          var showList = []
          state.problem.problems.forEach(element => {
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
      isLoadEnd : state => state.problem.loadEnd
    }),
  },
  created () {
    this.requestProblem().then(() => {
      this.$refs.listView.setIsLoadEnd(this.isLoadEnd)
    })
  },
}

</script>
