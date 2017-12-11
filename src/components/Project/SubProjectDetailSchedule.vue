<template>
  <div style="height:100%;">
  <highcharts :options="options" ref="highcharts"></highcharts>

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
loadHighchartsMore(Highcharts);
loadXrange(Highcharts)
Vue.use(VueHighcharts, { Highcharts });

export default {
  components: {
    Group, Cell, Clocker
  },
  computed: {
    options : function() {

      return {

        chart: {
            type: 'xrange'
        },
        title: {
            text: '项目进度图'
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
            }
        },
        yAxis: {
            title: {
                text: ''
            },
            categories: ['底图', '设计'],
            reversed: true
        },
        series: [{
            name: this.subproject.name,
            // pointPadding: 0,
            // groupPadding: 0,
            borderColor: 'gray',
            pointWidth: 20,
            data: [{
                x: (new Date(this.subproject.start_time_plan)).getTime(),
                x2: (new Date(this.subproject.dwg_end_plan)).getTime(),
                y: 0,
                partialFill: parseFloat(this.subproject.dwgPercent)
            }, {
                color: '#ffcb80',
                x: (new Date(this.subproject.design_start_plan)).getTime(),
                x2: (new Date(this.subproject.end_time_plan)).getTime(),
                y: 1,
                partialFill: parseFloat(this.subproject.designPercent)
            }],
            dataLabels: {
                enabled: true
            }
        }]

      }
    }
  },
  props: ['subproject'],
}
</script>
