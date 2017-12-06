<template>
  <div style="height:100%;">

    <div class="search-fix-top">
      <x-header>.../{{taskgroupName}}/{{task.name}}/</x-header>
    </div>

    <div class="search-fix-top" style="top:46px;">
      <group title="任务详情">
        <cell title="任务状态">
          <div><span v-bind:class="{'ur-green':task.state==3, 'ur-yellow':task.state==2, 'ur-red':task.state==1}">{{stateArray[task.state]}}</span></div>
        </cell>
        <cell title="优先级别" >
          <div><span v-bind:class="{'ur-green':task.urgent==1, 'ur-yellow':task.urgent==2, 'ur-red':task.urgent==3}">{{urgentTextArray[task.urgent]}}</span></div>
        </cell>
        <cell title="负责人员">
          <div><span><img :src="task.changer_headimgurl" class="flow-img"> {{task.changer_nickname}}</span></div>
        </cell>
        <cell title="截止时间" :value="task.end_time_plan"></cell>
        <cell title="剩余时间">
          <clocker :time="task.end_time_plan">
            <span style="color:red;">%D 天</span>
            <span style="color:green;">%H 小时</span>
            <span style="color:blue;">%M 分 %S 秒</span>
          </clocker>
        </cell>
        <cell title="参与人员" value-align="left">
            <div style="padding-left:10px;">
              <flexbox :gutter="0" wrap="wrap">
                <flexbox-item v-for="(item, index) in task.parter_list" :key="index" :span="1/3"><img :src="item.headimgurl" class="flow-img"> {{item.nickname}}</flexbox-item>
              </flexbox>
            </div>
        </cell>
        <cell title="备注" :value="task.remarks"></cell>
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
  methods: {
  },
  data () {
    return {
      urgentTextArray : ["", "普通", "紧急", "非常紧急"],
      stateArray : ["", "待解决", "待审核", "已解决"]
    }
  },
  computed: {
    ...mapState({
        task: state => {
            var taskDetail;
            var taskInfo = state.task.taskList.find(item => item.taskgroup_id == state.route.params.taskgroup_id)
            if(taskInfo)
              taskDetail = taskInfo.data.find(item => item.id == state.route.params.task_id)
            return taskDetail
          },
        isLoadEnd : state =>  {
          var taskInfo = state.task.taskList.find(item => item.taskgroup_id == state.route.params.taskgroup_id)
          return taskInfo ? taskInfo.loadEnd : false
        },
        taskgroupName : state => {
          var taskInfo = state.task.taskgroupList.find(item => item.id == state.route.params.taskgroup_id)
          return taskInfo.name
        }
      }),
  },
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
