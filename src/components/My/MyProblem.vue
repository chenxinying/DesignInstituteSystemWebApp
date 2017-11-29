<template>
  <div style="height:100%;">
    <div class="search-fix-top">
      <x-header>我待解决的问题</x-header>
    </div>
    <div class="search-fix-top" style="top:46px;">
      <problem-filter charger-id="ovMfqvk3Kyzg1rv96GAbNVrfXfIw" state="1"></problem-filter>
    </div>
    <problem-list-view charger-id="ovMfqvk3Kyzg1rv96GAbNVrfXfIw" state="1"></problem-list-view>
  </div>
</template>

<script>
import { XHeader} from 'vux'
import ProblemFilter from '../Problem/ProblemFilter'
import ProblemListView from '../Problem/ProblemListView'

export default {
  components: {
    XHeader,
    ProblemFilter,
    ProblemListView
  }
}
</script>

<style lang="less" scoped>


</style>
