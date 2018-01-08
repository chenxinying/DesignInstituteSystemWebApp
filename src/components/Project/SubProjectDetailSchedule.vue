<template>
  <div style="height:100%;">
  <highcharts :options="options0" ref="highcharts"></highcharts>

  <group title="倒计时">
    <cell title="底图还剩">
      <clocker :time="subproject.dwg_end_plan">
        <span style="color:red;">%D 天</span>
        <span style="color:green;">%H 小时</span>
        <span style="color:blue;">%M 分 %S 秒</span>
      </clocker>
    </cell>
    <cell title="设计还剩">
      <clocker :time="subproject.end_time_plan">
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
    getCategories(index) {
      var subtask_list = this.totalTaskList[index].subtask_list
      var categories = []
      subtask_list.forEach(item => {
        categories.push(item.name)
      })
      return categories
    },
    getData(index){
      var data = []
      var subtask_list = this.totalTaskList[index].subtask_list
      for(var i = 0; i < subtask_list.length; ++i){
        var data_item = {}
        
        var st = subtask_list[i].start_time_plan ? new Date(subtask_list[i].start_time_plan) : new Date();
        var ed = subtask_list[i].end_time_real ? new Date(subtask_list[i].end_time_real) : new Date();
        data_item.x = st.getTime()
        data_item.x2 = ed.getTime()
        data_item.y = i
        data_item.partialFill = 0.25
        data.push(data_item)
      }
      return data
    },
    
  },
  data () {
    return {
      options0: {
        chart: {
            type: 'xrange'
        },
        title: {
            text: "底图"
        },
        credits: {
          enabled: false
        },
        tooltip: {
          dateTimeLabelFormats: {
            day: '%Y/%m/%d'
          }
        },
        xAxis: {
            type: 'datetime',
            dateTimeLabelFormats: {
              week: '%Y/%m/%d'
            },
            labels:{
              enabled : false
            }
        },
        yAxis: {
            title: {
                text: ''
            },
            categories: ["a"],
            reversed: true
        },
        series: [{
            name: this.subproject.name,
            // pointPadding: 0,
            // groupPadding: 0,
            borderColor: 'gray',
            pointWidth: 20,
            data: [{}],
            dataLabels: {
                enabled: true
            }
        }]

      }
    }
  },
  activated() {
    this.getTotalTaskList({subprj_id : this.$route.params.subproject_id}).then(() => {
        this.options0 = {
          chart: {
              type: 'xrange'
          },
          title: {
              text: "底图"
          },
          credits: {
            enabled: false
          },
          tooltip: {
            dateTimeLabelFormats: {
              day: '%Y/%m/%d'
            }
          },
          xAxis: {
              type: 'datetime',
              dateTimeLabelFormats: {
                week: '%Y/%m/%d'
              },
            labels:{
              enabled : false
            }
          },
          yAxis: {
              title: {
                  text: ''
              },
              categories: this.getCategories(0),
              reversed: true
          },
          series: [{
              name: this.subproject.name,
              // pointPadding: 0,
              // groupPadding: 0,
              borderColor: 'gray',
              pointWidth: 20,
              data: this.getData(0),
              dataLabels: {
                  enabled: true
              }
          }]

        }
      }
    )
  }
}
</script>
