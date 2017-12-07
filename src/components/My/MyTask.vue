<template>
  <div>
    <x-header class="search-fix-top">待完成的任务</x-header>
      <tab :line-width=2 active-color='#20b907' v-model="index" class="tab-fix-top">
        <tab-item class="vux-center" :selected="demo2 === item" v-for="(item, index) in list2" @click="demo2 = item" :key="index">{{item}}</tab-item>
      </tab>
      <swiper v-model="index" height="500px" :show-dots="false" style="padding-top:44px;">
        <swiper-item v-for="(item, index) in list2" :key="index">
          <div class="tab-swiper">{{item}}任务</div>
        </swiper-item>
      </swiper>
  </div>
</template>

<script>
import { XHeader,Tab, TabItem, Swiper, SwiperItem } from 'vux'
const list = () => ['统计信息', '节点记录','动态记录']
export default {
  components: {
    XHeader,
    Tab,
    TabItem ,
    Swiper,
    SwiperItem
  },
  data () {
    return {
      list2: list(),
      demo2: '待完成',
      index: 0
    }
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
@import '~vux/src/styles/1px.less';
@import '~vux/src/styles/center.less';
.tab-swiper {
  background-color: #fff;
  height: 500px;
}
.tab-fix-top{
  width: 100%;
  position: absolute;
  left: 0px;
  top: 45px;
  z-index: 100;
}
</style>
