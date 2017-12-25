<template>
  <div style="height:100%;">

    <div class="search-fix-top">
      <x-header>.../{{taskDetail.taskgroup_name}}/{{taskDetail.name}}/</x-header>
    </div>

    <div class="search-fix-top" style="top:46px;">
      <group title="任务详情">
        <cell title="任务状态">
          <div><span v-bind:class="{'ur-green':taskDetail.state==3, 'ur-yellow':taskDetail.state==2, 'ur-red':taskDetail.state==1}">{{stateArray[taskDetail.state]}}</span></div>
        </cell>
        <cell title="优先级别" >
          <div><span v-bind:class="{'ur-green':taskDetail.urgent==1, 'ur-yellow':taskDetail.urgent==2, 'ur-red':taskDetail.urgent==3}">{{urgentTextArray[taskDetail.urgent]}}</span></div>
        </cell>
        <cell title="负责人员">
          <div>
            <span v-if="taskDetail.changer_nickname!=''">
              <img :src="taskDetail.changer_headimgurl" class="flow-img"> {{taskDetail.changer_nickname}}
            </span>
            <span v-else>
              暂未指派
            </span>
          </div>
        </cell>
        <cell title="截止时间" :value="taskDetail.end_time_plan"></cell>
        <cell title="剩余时间">
          <clocker :time="clockerTime">
            <span style="color:red;">%D 天</span>
            <span style="color:green;">%H 小时</span>
            <span style="color:blue;">%M 分 %S 秒</span>
          </clocker>
        </cell>
        <cell title="参与人员" value-align="left" v-if="taskDetail.parter_list > 0">
            <div style="padding-left:10px;">
              <flexbox :gutter="0" wrap="wrap">
                <flexbox-item v-for="(item, index) in taskDetail.parter_list" :key="index" :span="1/3"><img :src="item.headimgurl" class="flow-img"> {{item.nickname}}</flexbox-item>
              </flexbox>
            </div>
        </cell>
        <cell title="参与人员" v-else>
          暂未指派
        </cell>
        <cell title="备注" :value="taskDetail.remarks"></cell>
      </group>
    </div>

  </div>
</template>

<script>
import { Search, XHeader, Group, Cell, Clocker, Flexbox, FlexboxItem } from 'vux'
import { mapState, mapActions } from 'vuex'

export default {
  components: {
    Search,
    XHeader,
    Group,
    Cell,
    Clocker,
    Flexbox,
    FlexboxItem
  },
  data () {
    return {
      urgentTextArray : ["", "普通", "紧急", "非常紧急"],
      stateArray : ["", "待完成", "待审核", "已完成"],
      clockerTime : '2008-8-8'
    }
  },
  computed: {
    ...mapState({
        taskDetail: state => state.task_detail.task_detail,
      }),
  },
  activated () {
    this.clockerTime = this.taskDetail.end_time_plan
  }
}
</script>

<style scoped lang="less">
.ur-green{
  color : #05CC91
}
.ur-yellow{
  color : #F8B65F
}
.ur-red{
  color : #F86E61
}

.flow-img {
height:22px;
width:22px;
border-radius:50%;
overflow:hidden;
vertical-align: middle;
text-align: center;
}

</style>
