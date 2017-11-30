<template>
  <div style="height:100%;">
    <div class="search-fix-top">
      <problem-filter></problem-filter>
    </div>
    <problem-list-view></problem-list-view>
  </div>
</template>

<script>
import ProblemFilter from '../Problem/ProblemFilter'
import ProblemListView from '../Problem/ProblemListView'
import { mapState, mapActions } from 'vuex'

export default {
  components: {
    ProblemFilter,
    ProblemListView
  },
  methods : {
     ...mapActions([
      'requestProblem',
      'clearProblem',
      'updateProblemQueryParams'
    ]),
  },
  activated () {
    this.clearProblem()
    this.requestProblem()
  },
}

</script>
