<template>
  <v-layout>
    <v-flex md2>
      <v-btn
        class="ml-6 mt-5"
        color="primary"
        to="/home"
      >
        <v-icon class="mr-2">mdi-undo-variant</v-icon>
        Back
      </v-btn>
    </v-flex>
    <v-flex md8 class="chart-flex">
      <v-card class="chart-card" :elevation="5">
        <div class="chart-title">高校官微热度排行</div>
        <chart
          class="streaming-chart"
          ref="streaming-chart"
          :options="options"
          :auto-resize="true"
        />
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-icon
              class="chart-help"
              color="primary"
              v-on="on"
              large
            >mdi-star-circle</v-icon>
          </template>
          <span>
            <div>提示</div>
            <div>1.只显示热度最高的五所学校，顺序为从左向右递减</div>
            <div>2.时间轴指示统计数据的最新时间</div>
            <div>3.热度=(点赞数+评论数+转发数)*每条微博+粉丝数</div>
            <div></div>
          </span>
        </v-tooltip>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import echarts from 'echarts';
export default {
  data () {
    return {
      options: {
        baseOption: {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          grid: {
            bottom: 80
          },
          timeline: {
            axisType: 'category',
            data: [
              '2019-10',
              '2019-09',
              '2019-08'
            ]
          },
          xAxis: {
            type: 'category',
            // name: '高校名称',
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              fontSize: 16,
              fontWeight: 'bold'
            }
          },
          yAxis: {
            type: 'value',
            // name: '热度',
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              fontSize: 14
            }
          },
          series: [{
            name: '热度',
            type: 'bar',
            barWidth: 80,
            itemStyle: {
              emphasis: {
                barBorderRadius: 10
              },
              normal: {
                barBorderRadius: 10,
                color: new echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    { offset: 1, color: '#3977E6' },
                    { offset: 0, color: '#37BBF8' }
                  ]
                )
              }
            }
          }]
        },
        options: [
          {
            series: {
              data: [
                ['南京大学', 500],
                ['复旦大学', 400],
                ['清华大学', 300],
                ['北京大学', 200],
                ['东南大学', 100]
              ]
            }
          },
          {
            series: {
              data: [
                ['南京大学', 450],
                ['复旦大学', 350],
                ['清华大学', 450],
                ['北京大学', 250],
                ['东南大学', 300]
              ]
            }
          },
          {
            series: {
              data: [
                ['南京大学', 250],
                ['复旦大学', 300],
                ['清华大学', 600],
                ['北京大学', 150],
                ['东南大学', 450]
              ]
            }
          }
        ]
      }
    };
  }
};
</script>

<style lang="scss" scoped>
.chart-flex {
  display: flex;
  align-items: center;
}
.chart-card {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 0;
  height: 94%;
  width: 100%;
  .streaming-chart {
    margin-left: 3%;  // 略微调整图标横向位置
    height: 100%;
    width: 100%;
  }
  .chart-title {
    position: absolute;
    top: 15px;
    font-size: 18px;
    font-weight: bold;
  }
  .chart-help {
    position: absolute;
    top: 15px;
    right: 17px;
  }
}
</style>
