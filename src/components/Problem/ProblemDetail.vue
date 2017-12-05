<template>
  <div>
    <x-header class="search-fix-top">问题详情</x-header>

    <div>
      <group>
        <cell title="问题名称" primary="content" :value="problem_info.title"></cell>
        <cell title="问题状态" :value="problem_info.state_name"></cell>
        <cell title="问题阶段" value="配模阶段"></cell>
        <cell title="问题部位" :value="problem_info.subtype_name"></cell>
        <cell title="问题等级" :value="problem_info.problemGrade"></cell>
        <cell title="问题详情" primary="content" :value="problem_info.description" value-align="left"></cell>
      </group>

      <group title="问题截图">
        <flexbox :gutter="0" wrap="wrap">
          <flexbox-item :span="1/3" v-for="(item, index) in problem_info.file_list" :key="item.id">
            <div class="flex-demo">
              <img class="previewer-demo-img" :src="item" @click="show(index)" width="100" height="100">
            </div>
          </flexbox-item>
        </flexbox>
      </group>
    </div>

    <div v-transfer-dom>
      <previewer :list="list" ref="previewer" :options="options"></previewer>
    </div>

  </div>
</template>

<script>
import { Group, Selector, XHeader, Cell, Previewer, TransferDom, Flexbox, FlexboxItem } from 'vux'
import { mapState, mapActions } from 'vuex'

export default {
  directives: {
    TransferDom
  },
  components: {
    Group,
    Selector,
    XHeader,
    Cell,
    Previewer,
    Flexbox,
    FlexboxItem
  },
  methods: {
    show (index) {
      this.$refs.previewer.show(index)
    }
  },
  mounted () {
    if(!this.problem_info){
      this.$router.push('/problem')
    }
  },
  computed : {
    ...mapState({
      problem_info : state => {
        var realProblems =  (state.problem.problems && state.problem.problems.length > 0) ? state.problem.problems : JSON.parse(sessionStorage.getItem('problems'))
        return realProblems && realProblems.find(item => item.id == state.route.params.id)
      }
    }),
    list () {
      var list = []
      this.problem_info.file_list.forEach( (value, index, array) => list.push({src: value}))
      return list
    }
  },
  data () {
   return {
      options: {
        getThumbBoundsFn (index) {
          // find thumbnail element
          let thumbnail = document.querySelectorAll('.previewer-demo-img')[index]
          // get window scroll Y
          let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
          // optionally get horizontal scroll
          // get position of element relative to viewport
          let rect = thumbnail.getBoundingClientRect()
          // w = width
          return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
          // Good guide on how to get element coordinates:
          // http://javascript.info/tutorial/coordinates
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>

.flex-demo {
  text-align: center;
}
</style>
