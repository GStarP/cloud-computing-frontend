<template>
  <v-layout>
    <v-flex class="side" md2>
      <v-btn
        class="mt-8"
        width="120"
        color="primary"
        to="/home"
      >
        <v-icon class="mr-2">mdi-undo-variant</v-icon>
        Back
      </v-btn>
      <v-btn
        class="mt-5"
        width="120"
        color="success"
        :disabled="cantNext"
        @click="getNextData"
      >
        Next
      </v-btn>
      <v-btn
        class="mt-5"
        width="120"
        color="warning"
        :disabled="notOrigin"
        @click="getData"
      >
        AutoPlay
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
            <div>3.热度=(点赞数+评论数+转发数)*每条微博</div>
            <div>4.点击 Next 获取下一月份的数据</div>
            <div>5.点击 AutoPlay 开启自动定时获取</div>
            <div>6.注意！AutoPlay 在 Back 返回后不会结束！</div>
            <div></div>
          </span>
        </v-tooltip>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import echarts from 'echarts';
import axios from '../plugins/axios';

// 循环 Promise 的辅助函数
function PromiseForEach (arr, cb) {
  let realResult = [];
  let result = Promise.resolve();
  arr.forEach((a, index) => {
    result = result.then(() => {
      return cb(a).then((res) => {
        realResult.push(res);
      });
    });
  });

  return result.then(() => {
    return realResult;
  });
};

export default {
  data () {
    return {
      isAutoPlay: false,
      timeList: [],
      until: 0, // 当前加载到 timeList 的第几位
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
            show: false,
            axisType: 'category',
            autoPlay: false,
            loop: false,
            playInterval: 1500,
            left: 'center',
            width: '95%',
            data: [],
            currentIndex: 0,
            checkpointStyle: {
              symbolSize: 6,
              animationDuration: 200
            },
            controlStyle: {
              itemSize: 18
            }
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
              fontSize: 14,
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
        options: []
      }
    };
  },
  computed: {
    isOver () {
      return this.until === this.timeList.length - 1;
    },
    notOrigin () {
      return this.until !== 0;
    },
    cantNext () {
      return this.isAutoPlay || this.until === this.timeList.length - 1;
    }
  },
  methods: {
    /**
     * @param {number} year 年份    2019
     * @param {number} month 月份   8
     * @returns {string} 时间字符串 '2019-08'
     */
    generateTimeStr (year, month) {
      let res = '' + year + '-';
      if (month < 10) {
        res += '0';
      }
      res += month;
      return res;
    },
    getData () {
      this.isAutoPlay = true;
      let li = this.timeList.slice(1);
      PromiseForEach(li, (timeStr) => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            this.renderChart(timeStr);
            resolve();
          }, 1500);
        });
      });
    },
    getNextData () {
      this.until++;
      this.renderChart(this.timeList[this.until]);
    },
    renderChart (time) {
      console.log(time);
      axios.get('/hot', {
        params: {
          time
        }
      }).then((response) => {
        let res = response.data;
        if (res.code === 200) {
          this.options.baseOption.timeline.data.push(res.data.time);
          this.options.baseOption.timeline.currentIndex = this.options.baseOption.timeline.data.length - 1;
          this.options.baseOption.timeline.show = true;
          let option = {
            series: {
              data: []
            }
          };
          // for (let i = 0; i < res.data.nameList.length; i++) {
          //   let pair = [];
          //   pair.push(res.data.nameList[i]);
          //   pair.push(res.data.rankList[i]);
          //   option.series.data.push(pair);
          // }
          this.options.baseOption.xAxis.data = res.data.nameList;
          option.series.data = res.data.rankList;
          this.options.options.push(option);
        } else {
          alert(res.msg);
        }
      });
    }
  },
  mounted () {
    // 初始化时间列表
    const start = [2010, 5];
    const end = [2019, 10];
    for (let y = start[0]; y <= end[0]; y++) {
      let startM = y === start[0]
        ? start[1]
        : 1;
      let endM = y === end[0]
        ? end[1]
        : 12;
      for (; startM <= endM; startM++) {
        this.timeList.push(this.generateTimeStr(y, startM));
      }
    }

    // 定时获取数据
    // this.getData();

    this.renderChart(this.timeList[0]);
  }
};
</script>

<style lang="scss" scoped>
.chart-flex {
  display: flex;
  align-items: center;
}
.side {
  display: flex;
  flex-direction: column;
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
