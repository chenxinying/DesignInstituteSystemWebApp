<template>
  <div style="height:100%;">

    <div class="search-fix-top">
      <x-header :right-options="{showMore: true}" @on-click-more="showMenus = true">{{projectName}}/{{subproject.name}}/</x-header>
    </div>

    <div class="search-fix-top" style="top:46px;">
      <tab :line-width=2 active-color='#20b907' v-model="index">
        <tab-item class="vux-center" :selected="demo === item" v-for="(item, index) in list" @click="demo = item" :key="index">{{item}}</tab-item>
      </tab>
    </div>
      <swiper v-model="index" height="650px" :show-dots="false" style="padding-top:90px;" ref="swiper">
        <swiper-item :key="0">
          <div class="tab-swiper">
            <group title="底图时间" style="margin-top:-10px;padding-top:10px;">
              <cell title="收到底图时间" :value="subproject.start_time_plan" @click.native="onClick"></cell>
              <cell title="出终版底图成果时间" :value="subproject.dwg_end_plan" @click.native="onClick"></cell>
              <cell title="离底图结束还剩">
                <clocker :time="subproject.dwg_end_plan">
                  <span style="color:red;">%D 天</span>
                  <span style="color:green;">%H 小时</span>
                  <span style="color:blue;">%M 分 %S 秒</span>
                </clocker>
              </cell>
            </group>
            <group title="设计时间" style="margin-top:-10px;padding-top:10px;">
              <cell title="签字确认底图时间" :value="subproject.design_start_plan" @click.native="onClick"></cell>
              <cell title="项目结束节点时间" :value="subproject.end_time_plan" @click.native="onClick"></cell>
              <cell title="离设计结束还剩">
                <clocker :time="subproject.end_time_plan">
                  <span style="color:red;">%D 天</span>
                  <span style="color:green;">%H 小时</span>
                  <span style="color:blue;">%M 分 %S 秒</span>
                </clocker>
              </cell>
            </group>
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
                    <span>{{problem_statistics.addTodayCountProblemlist}}</span>
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
        </swiper-item>
        <swiper-item :key="1">
          <div class="tab-swiper">
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
        </swiper-item>
        <swiper-item :key="2">
          <div class="tab-swiper">
            <timeline>
            <timeline-item v-for="(item, index) in time_lines" :key="index">
              <h4 :class="{ recent: index==0 }"><img :src="item.headimgurl" class="flow-img"> {{item.name}}: {{item.info}}</h4>
              <p class="desc" :class="{ recent: index==0 }">{{item.content}}</p>
              <p :class="{ recent: index==0 }">{{item.time}}</p>
            </timeline-item>
          </timeline>
          </div>
        </swiper-item>
      </swiper>

    <div v-transfer-dom>
      <actionsheet :menus="menus" v-model="showMenus" @on-click-menu="click"></actionsheet>
    </div>

  </div>
</template>

<script>
import { XHeader, Group, Cell, Flow, FlowState, FlowLine, Clocker, Actionsheet, TransferDom, Tab, TabItem, Swiper, SwiperItem, Card, Timeline, TimelineItem} from 'vux'
import { mapState, mapActions } from 'vuex'

export default {
  directives: {
    TransferDom
  },
  components: {
    XHeader, Group, Cell, Flow, FlowState, FlowLine, Clocker, Actionsheet ,Tab, TabItem, Swiper, SwiperItem, Card, Timeline, TimelineItem
  },
  methods: {
    ...mapActions(['getSubprojectFlowState', 'getProjectTrailInfo', 'getSubprojectProblemStatistics', 'getSubprojectTaskStatistics']),
    click (key) {
      if(key == 'task'){
        this.$router.push(this.$route.params.subproject_id + "/taskgroup")
      }else if(key == 'problem'){
        this.$router.push(this.$route.params.subproject_id + "/problem")
      }
    }
  },
  activated () {
    this.getSubprojectFlowState({subproject_id : this.$route.params.subproject_id})
    this.getProjectTrailInfo({prj_id : this.$route.params.project_id, subproject_id : this.$route.params.subproject_id})
    this.getSubprojectProblemStatistics({subproject_id : this.$route.params.subproject_id})
    this.getSubprojectTaskStatistics({subproject_id : this.$route.params.subproject_id})
  },
  watch: {
    index: function (newIndex) {
      if(newIndex == 2){
        var h = this.$refs.swiper.$children[2].$el.scrollHeight
        this.$refs.swiper.xheight = h + "px"
      }else if(newIndex == 0){
        this.$refs.swiper.xheight = "650px"
      }else{
        this.$refs.swiper.xheight = "600px"
      }
    }
  },
  computed : {
    ...mapState({
        subproject : state => {
          var subproject;
          var project = state.project.subprojectList.find(item => item.project_id == state.route.params.project_id)
          if(project){
            subproject = project.data.find(item => item.id == state.route.params.subproject_id)
          }
          if(!subproject){
            subproject = state.project_my.projects.find(item => item.id == state.route.params.subproject_id)
          }
          return subproject
      },
      projectName : state => {
        var project = state.project.projectList.find(item => item.project_id == state.route.params.project_id)
        if(project) return project.name;
        project = state.project_my.projects.find(item => item.id == state.route.params.subproject_id)
        if(project) return project.projet_name;
        return ""
      },
      flow_states : state => state.project.subproject_flow_states,
      time_lines : state => state.project.subproject_time_lines,
      problem_statistics : state => state.project.subproject_problem_statistics,
      task_statistics : state => state.project.subproject_task_statistics
    })
  },
  data () {
   return {
      menus: {
          task: '任务列表',
          problem: '问题列表',
        },

      showMenus: false,
      showDraw: false,
      showDesign: false,

      list: ['统计信息', '节点记录','动态记录'],
      demo: '统计信息',
      index: 0
    }
  }
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

.flow-img {
height:22px;
width:22px;
border-radius:50%;
overflow:hidden;
vertical-align: middle;
}

.tab-swiper {
  background-color: #fff;
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

