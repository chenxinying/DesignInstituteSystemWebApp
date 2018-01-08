<template>
  <div style="height:100%;">
  <highcharts :options="options0" ref="highcharts0"></highcharts>
  <highcharts :options="options1" ref="highcharts1" style="height:600px;"></highcharts>
  <highcharts :options="options2" ref="highcharts2"></highcharts>

  <group title="倒计时">
    <cell title="底图任务还剩">
      <clocker :time="dwgEndTime">
        <span style="color:red;">%D 天</span>
        <span style="color:green;">%H 小时</span>
        <span style="color:blue;">%M 分 %S 秒</span>
      </clocker>
    </cell>
    <cell title="设计任务还剩">
      <clocker :time="designEndTime">
        <span style="color:red;">%D 天</span>
        <span style="color:green;">%H 小时</span>
        <span style="color:blue;">%M 分 %S 秒</span>
      </clocker>
    </cell>
    <cell title="工程任务还剩">
      <clocker :time="projectEndTime">
        <span style="color:red;">%D 天</span>
        <span style="color:green;">%H 小时</span>
        <span style="color:blue;">%M 分 %S 秒</span>
      </clocker>
    </cell>
  </group>
  
  </div>
</template>

<script>
import { Group, Cell, Clocker} from 'vux'
import Vue from 'vue'
import VueHighcharts from 'vue-highcharts';
import Highcharts from 'highcharts';
import loadHighchartsMore from 'highcharts/highcharts-more';
import loadXrange from 'highcharts/modules/xrange';
import { mapState, mapActions } from 'vuex'
loadHighchartsMore(Highcharts);
loadXrange(Highcharts)
Vue.use(VueHighcharts, { Highcharts });

export default {
  components: {
    Group, Cell, Clocker
  },
  computed: {
    ...mapState({
      totalTaskList : state => state.project_detail.totalTaskList,
    }),
  },
  props: ['subproject'],
  methods: {
    ...mapActions(['getTotalTaskList']),
    getCategories(subtask_list) {
      var categories = ["全部"]
      subtask_list.forEach(item => {
        categories.push(item.name)
      })
      return categories
    },
    getData(subtask_list){
      var data = []
      var total_st = this.getMinTime(subtask_list)
      var total_ed = this.getMaxTime(subtask_list)
      data.push({
        x : new Date(total_st).getTime(),
        x2 : new Date(total_ed).getTime(),
        y : 0,
        partialFill : this.calcTotalPartialFill(subtask_list)
      })

      for(var i = 0; i < subtask_list.length; ++i){
        var data_item = {}
        var st = new Date(subtask_list[i].start_time_plan) 
        var ed = new Date(subtask_list[i].end_time_real)
        data_item.x = st.getTime()
        data_item.x2 = ed.getTime()
        data_item.y = i + 1
        if(subtask_list[i].state == 1)
          data_item.partialFill = 0
        else if(subtask_list[i].state == 2)
          data_item.partialFill = 0.5
        else
          data_item.partialFill = 1.0
        data.push(data_item)
      }
      return data
    },
    getMinTime(subtask_list){
      var st = new Date(subtask_list[0].start_time_plan)
      var st_time = subtask_list[0].start_time_plan
      for(var i = 1; i < subtask_list.length; ++i){
        var tmp = new Date(subtask_list[i].start_time_plan)
        if(tmp < st) {
          st = tmp;
          st_time = subtask_list[i].start_time_plan
        }
      }
      return st_time; 
    },
    getMaxTime(subtask_list){
      var ed = new Date(subtask_list[0].end_time_real)
      var ed_time = subtask_list[0].end_time_real
      for(var i = 1; i < subtask_list.length; ++i){
        var tmp = new Date(subtask_list[i].end_time_real)
        if(tmp > ed) {
          ed = tmp;
          ed_time = subtask_list[i].end_time_real;
        }
      }
      return ed_time;
    },
    calcTotalPartialFill(subtask_list){
      var partialFill = 0
      for(var i = 0; i < subtask_list.length; ++i){
        if(subtask_list[i].state == 1)
          partialFill += 0
        else if(subtask_list[i].state == 2)
          partialFill += 0.5
        else
          partialFill += 1.0
      }
      return (partialFill / subtask_list.length).toFixed(2)
    }
  },
  data () {
    return {
      options0: {},
      options1: {},
      options2: {},
      dwgEndTime : '2019-01-01',
      designEndTime : '2019-01-01',
      projectEndTime : '2019-01-01',
    }
  },
  activated() {
    this.getTotalTaskList({subprj_id : this.$route.params.subproject_id}).then(() => {
        this.options0 = {
          chart: {
              type: 'xrange'
          },
          title: {
              text: this.totalTaskList[0].name
          },
          credits: {
            enabled: false
          },
          tooltip: {
            dateTimeLabelFormats: {
              hour: "%Y/%m/%d %H:%M"
            }
          },
          xAxis: {
              type: 'datetime',
              dateTimeLabelFormats: {
                day: '%Y/%m/%d'
              },
            labels:{
              enabled : true
            }
          },
          yAxis: {
              title: {
                  text: ''
              },
              categories: this.getCategories(this.totalTaskList[0].subtask_list),
              reversed: true
          },
          series: [{
              name: this.subproject.name,
              // pointPadding: 0,
              // groupPadding: 0,
              borderColor: 'gray',
              pointWidth: 20,
              data: this.getData(this.totalTaskList[0].subtask_list),
              dataLabels: {
                  enabled: true
              }
          }]

        }
        this.options1 = {
          chart: {
              type: 'xrange'
          },
          title: {
              text: this.totalTaskList[1].name
          },
          credits: {
            enabled: false
          },
          tooltip: {
            dateTimeLabelFormats: {
              hour: "%Y/%m/%d %H:%M"
            }
          },
          xAxis: {
              type: 'datetime',
              dateTimeLabelFormats: {
                day: '%Y/%m/%d'
              },
            labels:{
              enabled : true
            }
          },
          yAxis: {
              title: {
                  text: ''
              },
              categories: this.getCategories(this.totalTaskList[1].subtask_list),
              reversed: true
          },
          series: [{
              name: this.subproject.name,
              // pointPadding: 0,
              // groupPadding: 0,
              borderColor: 'gray',
              pointWidth: 20,
              data: this.getData(this.totalTaskList[1].subtask_list),
              dataLabels: {
                  enabled: true
              }
          }]

        }
        this.options2 = {
          chart: {
              type: 'xrange'
          },
          title: {
              text: this.totalTaskList[2].name
          },
          credits: {
            enabled: false
          },
          tooltip: {
            dateTimeLabelFormats: {
              hour: "%Y/%m/%d %H:%M"
            }
          },
          xAxis: {
              type: 'datetime',
              dateTimeLabelFormats: {
                day: '%Y/%m/%d'
              },
            labels:{
              enabled : true
            }
          },
          yAxis: {
              title: {
                  text: ''
              },
              categories: this.getCategories(this.totalTaskList[2].subtask_list),
              reversed: true
          },
          series: [{
              name: this.subproject.name,
              // pointPadding: 0,
              // groupPadding: 0,
              borderColor: 'gray',
              pointWidth: 20,
              data: this.getData(this.totalTaskList[2].subtask_list),
              dataLabels: {
                  enabled: true
              }
          }]

        }
        this.dwgEndTime = this.getMaxTime(this.totalTaskList[0].subtask_list)
        this.designEndTime = this.getMaxTime(this.totalTaskList[1].subtask_list)
        this.projectEndTime = this.getMaxTime(this.totalTaskList[2].subtask_list)
      })
  }
}
</script>
