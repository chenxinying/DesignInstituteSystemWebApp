<template>
  <div style="height:100%;">
  <task-filter></task-filter>
  <!--<highcharts :options="options"></highcharts>-->
  </div>
</template>

<script>
import { Panel, ViewBox } from 'vux'
import TaskFilter from '../Task/TaskFilter'
import Tabbar from './Tabbar'
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
    Panel,
    ViewBox,
    TaskFilter,
    Tabbar
  },
  methods: {
  },
  data () {
    return {
      options : {

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
            name: 'Project 1',
            // pointPadding: 0,
            // groupPadding: 0,
            borderColor: 'gray',
            pointWidth: 20,
            data: [{
                x: Date.UTC(2014, 10, 21),
                x2: Date.UTC(2014, 11, 2),
                y: 0,
                partialFill: 0.25
            }, {
                x: Date.UTC(2014, 11, 2),
                x2: Date.UTC(2014, 11, 5),
                y: 1
            }, {
                x: Date.UTC(2014, 11, 9),
                x2: Date.UTC(2014, 11, 19),
                y: 1
            }],
            dataLabels: {
                enabled: true
            }
        }]

      }
    }
  }
}
</script>
