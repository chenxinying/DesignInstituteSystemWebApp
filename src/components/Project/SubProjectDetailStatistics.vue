<template>
  <div style="height:100%;">
    <group title="任务统计" >
      <card>
        <div slot="content" class="card-demo-flex card-demo-content01">
          <div class="vux-1px-r">
            <span>{{task_statistics.TaskCount}}</span>
            <br/>
            总任务数
          </div>
          <div class="vux-1px-r">
            <span>{{task_statistics.TaskFinish}}</span>
            <br/>
            已完成数
          </div>
          <div class="vux-1px-r">
            <span>{{task_statistics.TodayCountTasklist}}</span>
            <br/>
            今日完成
          </div>
          <div>
            <span>{{task_statistics.addTodayCountTasklist}}</span>
            <br/>
            今日新增
          </div>
        </div>
      </card>
    </group>
    <group title="人员统计">
      <card>
        <div slot="content" class="card-demo-flex card-demo-content01">
          <div class="vux-1px-r">
            <span>5</span>
            <br/>
            参与人数
          </div>
          <div class="vux-1px-r">
            <span>8</span>
            <br/>
            人均任务
          </div>
          <div class="vux-1px-r">
            <span>2</span>
            <br/>
            今日人均完成
          </div>
          <div>
            <span>1</span>
            <br/>
            本周人均完成
          </div>
        </div>
      </card>
    </group>

    <group title="问题统计">
      <card>
        <div slot="content" class="card-demo-flex card-demo-content01">
          <div class="vux-1px-r">
            <span>{{problem_statistics.CountProblem}}</span>
            <br/>
            问题总数
          </div>
          <div class="vux-1px-r">
            <span>{{problem_statistics.ProblemFinish}}</span>
            <br/>
            已解决数
          </div>
          <div class="vux-1px-r">
            <span>{{problem_statistics.TodayCountProblemlist}}</span>
            <br/>
            今日解决
          </div>
          <div>
            <span>{{problem_statistics.addTodayCountProblemlist}}</span>
            <br/>
            今日新增
          </div>
        </div>
      </card>
    </group>
  </div>
</template>

<script>
import { Group, Card} from 'vux'
import { mapState, mapActions } from 'vuex'

export default {
  components: {
    Group,
    Card
  },
  computed : {
    ...mapState({
      problem_statistics : state => state.project.subproject_problem_statistics,
      task_statistics : state => state.project.subproject_task_statistics
    })
  },
}
</script>

<style scoped lang="less">
@import '~vux/src/styles/1px.less';
.card-demo-flex {
  display: flex;
}
.card-demo-content01 {
  padding: 10px 0;
}
.card-padding {
  padding: 15px;
}
.card-demo-flex > div {
  flex: 1;
  text-align: center;
  font-size: 12px;
}
.card-demo-flex span {
  color: #f74c31;
}
</style>
