<template>
  <div style="height:100%;">

    <div class="weui-wepay-flow weui-wepay-flow_vertical" style="height: 400px;padding:40px;margin-left:60px;">
    <div class="weui-wepay-flow__bd">

      <div class="weui-wepay-flow__li weui-wepay-flow__li_done">
        <div class="weui-wepay-flow__state">1</div>
        <p class="weui-wepay-flow__title-left" v-if="flow_states[1]"><img :src="flow_states[1].headimgurl" class="flow-img"> {{flow_states[1].time}}</p>
        <p class="weui-wepay-flow__title-right">项目已立项</p>
      </div>

      <div class="weui-wepay-flow__line" :class="{'weui-wepay-flow__line_done': flow_states[2], 'weui-wepay-flow__line_ing': flow_states[1] && !flow_states[2]}">
        <div class="weui-wepay-flow__process"></div> <!---->
        <div class="weui-wepay-flow__info-left">正在进行底图深化</div>
      </div>

      <div class="weui-wepay-flow__li" :class="{'weui-wepay-flow__li_done': flow_states[2], 'weui-wepay-flow__li_ing': !flow_states[2]}">
        <div class="weui-wepay-flow__state">2</div>
        <p class="weui-wepay-flow__title-left" v-if="flow_states[2]"><img :src="flow_states[2].headimgurl" class="flow-img"> {{flow_states[2].time}}</p>
        <p class="weui-wepay-flow__title-right">底图已深化</p>
      </div>

      <div class="weui-wepay-flow__line" :class="{'weui-wepay-flow__line_done': flow_states[3], 'weui-wepay-flow__line_ing': flow_states[2] && !flow_states[3]}">
        <div class="weui-wepay-flow__process"></div> <!---->
        <div class="weui-wepay-flow__info-left">正在进行底图深化审核</div>
      </div>

      <div class="weui-wepay-flow__li" :class="{'weui-wepay-flow__li_done': flow_states[3], 'weui-wepay-flow__li_ing': !flow_states[3]}">
        <div class="weui-wepay-flow__state">3</div>
        <p class="weui-wepay-flow__title-left" v-if="flow_states[3]"><img :src="flow_states[3].headimgurl" class="flow-img"> {{flow_states[3].time}}</p>
        <p class="weui-wepay-flow__title-right">底图深化已审核</p>
      </div>

      <div class="weui-wepay-flow__line" :class="{'weui-wepay-flow__line_done': flow_states[4], 'weui-wepay-flow__line_ing': flow_states[3] && !flow_states[4]}">
        <div class="weui-wepay-flow__process"></div>
        <div class="weui-wepay-flow__info-left">正在进行标准层设计</div>
      </div>

      <div class="weui-wepay-flow__li" :class="{'weui-wepay-flow__li_done': flow_states[4], 'weui-wepay-flow__li_ing': !flow_states[4]}">
        <div class="weui-wepay-flow__state">4</div>
        <p class="weui-wepay-flow__title-left" v-if="flow_states[4]"><img :src="flow_states[4].headimgurl" class="flow-img"> {{flow_states[4].time}}</p>
        <p class="weui-wepay-flow__title-right">标准层已下单</p>
      </div>

      <div  class="weui-wepay-flow__line" :class="{'weui-wepay-flow__line_done': flow_states[5], 'weui-wepay-flow__line_ing': flow_states[4] && !flow_states[5]}">
        <div class="weui-wepay-flow__process"></div> <!---->
        <div class="weui-wepay-flow__info-left">正在进行变化层设计</div>
      </div>

      <div class="weui-wepay-flow__li" :class="{'weui-wepay-flow__li_done': flow_states[5], 'weui-wepay-flow__li_ing': !flow_states[5]}">
          <div class="weui-wepay-flow__state">5</div>
          <p class="weui-wepay-flow__title-left" v-if="flow_states[5]"><img :src="flow_states[5].headimgurl" class="flow-img"> {{flow_states[5].time}}</p>
          <p class="weui-wepay-flow__title-right">变化层已下单</p>
      </div>

      <div class="weui-wepay-flow__line" :class="{'weui-wepay-flow__line_done': flow_states[6], 'weui-wepay-flow__line_ing': flow_states[5] && !flow_states[6]}">
        <div class="weui-wepay-flow__process"></div> <!---->
        <div class="weui-wepay-flow__info-left">正在进行项目归档</div>
      </div>

      <div class="weui-wepay-flow__li" :class="{'weui-wepay-flow__li_done': flow_states[6], 'weui-wepay-flow__li_ing': !flow_states[6]}">
        <div class="weui-wepay-flow__state">6</div>
        <p class="weui-wepay-flow__title-left" v-if="flow_states[6]"><img :src="flow_states[6].headimgurl" class="flow-img"> {{flow_states[6].time}}</p>
        <p class="weui-wepay-flow__title-right">项目已归档</p>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import { Group, Card, Flow, FlowState, FlowLine} from 'vux'
import { mapState, mapActions } from 'vuex'

export default {
  components: {
    Group,
    Card,
    Flow,
    FlowState,
    FlowLine
  },
  computed : {
    ...mapState({
      flow_states : state => state.project_detail.subproject_flow_states,
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

</style>
