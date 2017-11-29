<template>
  <div style="height:100%;">
    <div class="search-fix-top">
      <x-header>我待解决的问题</x-header>
    </div>
    <div class="search-fix-top" style="top:46px;">
      <problem-filter :filter-charger-id="openid" filter-state="1"></problem-filter>
    </div>
    <problem-list-view></problem-list-view>
  </div>
</template>

<script>
import { XHeader} from 'vux'
import { mapState, mapActions } from 'vuex'
import ProblemFilter from '../Problem/ProblemFilter'
import ProblemListView from '../Problem/ProblemListView'

export default {
  components: {
    XHeader,
    ProblemFilter,
    ProblemListView
  },
  computed:{
    ...mapState({
        openid: state => state.openid
      }),
  },
  activated () {
    this.updateProblemQueryParams({changer_id : this.openid, state : 1})
    this.clearProblem()
    this.requestProblem()
  },
  deactivated () {
    this.updateProblemQueryParams({})
  },
  methods : {
     ...mapActions([
      'requestProblem',
      'clearProblem',
      'updateProblemQueryParams'
    ]),
  }
}
</script>

<style lang="less" scoped>


</style>
