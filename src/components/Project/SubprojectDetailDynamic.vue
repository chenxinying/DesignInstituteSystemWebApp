<template>
  <div style="height:100%;">
    <timeline>
      <timeline-item v-for="(item, index) in time_lines" :key="index">
        <h4 :class="{ recent: index==0 }"><img :src="item.headimgurl" class="flow-img"> {{item.name}}: {{item.info}}</h4>
        <p class="desc" :class="{ recent: index==0 }">{{item.content}}</p>
        <p :class="{ recent: index==0 }">{{item.time}}</p>
      </timeline-item>
    </timeline>
  </div>
</template>

<script>
import { Timeline, TimelineItem} from 'vux'
import { mapState, mapActions } from 'vuex'

export default {
  components: {
    Timeline,
    TimelineItem
  },
  computed : {
    ...mapState({
      time_lines : state => state.project_detail.subproject_time_lines,
    })
  },
}
</script>

<style scoped lang="less">

.flow-img {
height:22px;
width:22px;
border-radius:50%;
overflow:hidden;
vertical-align: middle;
}

.tab-swiper{
  p {
      color: #888;
      font-size: 0.7rem;
  }
  h4 {
    color: #666;
    font-weight: normal;
  }
  .recent {
		color: rgb(4, 190, 2)
  }
  .desc{
     font-size: 0.8rem;
  }
}
</style>
