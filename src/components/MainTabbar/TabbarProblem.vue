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

export default {
  components: {
    ProblemFilter,
    ProblemListView
  }
}

</script>
