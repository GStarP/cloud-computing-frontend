<template>
  <v-layout>
    <v-flex class='side' md2>
      <v-btn
        class='back-btn mt-8'
        width='120'
        color='primary'
        to='/home'
      >
        <v-icon class='mr-2'>mdi-undo-variant</v-icon>
        Back
      </v-btn>
      <v-btn
        class="mt-5"
        width="120"
        color="success"
        @click.stop="dialogShow = true"
      >
        <v-icon class='mr-2'>mdi-eye</v-icon>
        Graph
      </v-btn>
    </v-flex>
    <v-dialog
      class="graph-dialog"
      v-model="dialogShow"
      max-width="80%"
    >
      <v-card class="dialog-card">
        <chart
          class="graphx-chart"
          ref="graphx-chart"
          :options="options"
          :auto-resize="true"
        />
      </v-card>
    </v-dialog>
    <v-flex class='rank-flex' md3>
      <v-card class='rank-card' :elevation='3' v-if="pageRankList.length !== 0">
        <div class='rank-title'>
          <v-icon class='mr-2' large>mdi-podium</v-icon>
          <div class='rank-title-text mt-2'>PageRank</div>
        </div>
        <div class='rank-list-top'>
          <div class='rank-list-top-1'>
            <div class='rank-list-top-index mb-1'>
              <v-chip class='rank-list-top-1-index' color='warning'>No.1</v-chip>
            </div>
            <div class='rank-list-top-1-name'>{{ pageRankList[0].name }}</div>
            <div class='rank-list-top-1-rank'>{{ pageRankList[0].rank.toFixed(3) }}</div>
          </div>
          <div class='rank-list-top-23'>
            <div class='rank-list-top-2'>
              <div class='rank-list-top-index mb-1'>
                <v-chip color='primary'>No.2</v-chip>
              </div>
              <div>{{ pageRankList[1].name }}</div>
              <div>{{ pageRankList[1].rank.toFixed(3) }}</div>
            </div>
            <div class='rank-list-top-3'>
              <div class='rank-list-top-index mb-1'>
                <v-chip color='green' dark>No.3</v-chip>
              </div>
              <div>{{ pageRankList[2].name }}</div>
              <div>{{ pageRankList[2].rank.toFixed(3) }}</div>
            </div>
          </div>
        </div>
        <v-divider width='90%'></v-divider>
        <v-list class='rank-list'>
          <div
            class='rank-list-item'
            v-for='(item, i) of pageRankList.slice(3)'
            :key='i'
          >
            <div class='rank-list-item-index'>{{ i + 4 }}</div>
            <div class='rank-list-item-name'>{{ item.name }}</div>
            <div class='rank-list-item-rank'>{{ item.rank.toFixed(3) }}</div>
          </div>
        </v-list>
      </v-card>
    </v-flex>
    <v-flex class='rank-flex rank-flex-triangle' md3>
      <v-card class='rank-card' :elevation='3'>
        <div class='rank-title'>
          <v-icon class='mr-2' large>mdi-delta</v-icon>
          <div class='rank-title-text mt-2'>Triangle</div>
        </div>
        <div class='rank-list-top'>
          <div class='rank-list-top-1'>
            <div class='rank-list-top-index mb-1'>
              <v-chip class='rank-list-top-1-index' color='warning'>No.1</v-chip>
            </div>
            <div class='rank-list-top-1-name'>{{ triangleList[0].name }}</div>
            <div class='rank-list-top-1-rank'>{{ triangleList[0].rank }}</div>
          </div>
          <div class='rank-list-top-23'>
            <div class='rank-list-top-2'>
              <div class='rank-list-top-index mb-1'>
                <v-chip color='primary'>No.2</v-chip>
              </div>
              <div>{{ triangleList[1].name }}</div>
              <div>{{ triangleList[1].rank }}</div>
            </div>
            <div class='rank-list-top-3'>
              <div class='rank-list-top-index mb-1'>
                <v-chip color='green' dark>No.3</v-chip>
              </div>
              <div>{{ triangleList[2].name }}</div>
              <div>{{ triangleList[2].rank }}</div>
            </div>
          </div>
        </div>
        <v-divider width='90%'></v-divider>
        <v-list class='rank-list'>
          <div
            class='rank-list-item'
            v-for='(item, i) of triangleList.slice(3)'
            :key='i'
          >
            <div class='rank-list-item-index'>{{ i + 4 }}</div>
            <div class='rank-list-item-name'>{{ item.name }}</div>
            <div class='rank-list-item-rank'>{{ item.rank }}</div>
          </div>
        </v-list>
      </v-card>
    </v-flex>
    <v-flex class='other-flex' md3>
      <v-card class='other-card' :elevation='3'>
        <v-select
          class="service-selector"
          v-model="selectedService"
          :items="services"
          label="查看成就"
        >
        </v-select>
        <div class="service-container" v-if="selectedService === '万众瞩目'">
          <v-card-title>{{ mostIn.name }}</v-card-title>
          <v-chip
            class="service-info"
            :color="selectedColor.split('-')[2]"
            outlined
          >{{ mostIn.info }}</v-chip>
          <div :class="selectedColor">{{ mostIn.rank }}</div>
        </div>
        <div class="service-container" v-if="selectedService === '交际花'">
          <v-card-title>{{ mostOut.name }}</v-card-title>
          <v-chip
            class="service-info"
            :color="selectedColor.split('-')[2]"
            outlined
          >{{ mostOut.info }}</v-chip>
          <div :class="selectedColor">{{ mostOut.rank }}</div>
        </div>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from '../plugins/axios';
import echarts from 'echarts';

export default {
  data () {
    return {
      pageRankList: [],
      triangleList: [],
      services: [
        '万众瞩目',
        '交际花'
      ],
      selectedService: '万众瞩目',
      mostIn: {
        name: '',
        rank: 0,
        info: '被@次数'
      },
      mostOut: {
        name: '',
        rank: 0,
        info: '@其他大学次数'
      },
      dialogShow: false,
      options: {
        title: {
          text: '高校官微关注&艾特关系图',
          left: 'center'
        },
        toolbox: {
          show: true
        },
        series: {
          type: 'graph',
          layout: 'force',
          focus: {
            initLayout: 'circular',
            gravity: 0.001,
            edgeLength: [10, 120]
          },
          data: [],
          edges: [],
          edgeSymbol: ['none', 'arrow'],
          emphasis: {
            label: {
              show: true,
              position: 'inside',
              color: '#111',
              fontWeight: 'bold',
            },
            lineStyle: {
              width: 3
            }
          },
          roam: true,
          focusNodeAdjacency: true,
          itemStyle: {
            normal: {
              borderColor: '#FFF',
              borderWidth: 1,
              shadowBlur: 10,
              shadowColor: 'rgba(0, 0, 0, 0.3)'
            }
          },
          lineStyle: {
            normal: {
              color: 'source',
              width: 0.5,
              curveness: 0.3,
              opacity: 0.6
            }
          }
        }
      }
    };
  },
  computed: {
    selectedColor () {
      switch (this.selectedService) {
        case '万众瞩目':
          return 'service-rank-purple';
        case '交际花':
          return 'service-rank-red';
        default:
          return '';
      }
    }
  },
  methods: {
    getPageRankList () {
      axios.get('/page-rank').then(res => {
        if (res.data.code === 200) {
          this.pageRankList = res.data.data;
        } else {
          alert(res.data.msg);
        }
      });
    },
    getTriangleRankList () {
      axios.get('/triangle-rank').then(res => {
        if (res.data.code === 200) {
          this.triangleList = res.data.data;
        } else {
          alert(res.data.msg);
        }
      });
    },
    getMostInDegree () {
      axios.get('/most-in-degree').then(res => {
        if (res.data.code === 200) {
          this.mostIn.name = res.data.data.name;
          this.mostIn.rank = res.data.data.rank;
        } else {
          alert(res.data.msg);
        }
      });
    },
    getMostOutDegree () {
      axios.get('/most-out-degree').then(res => {
        if (res.data.code === 200) {
          this.mostOut.name = res.data.data.name;
          this.mostOut.rank = res.data.data.rank;
        } else {
          alert(res.data.msg);
        }
      });
    },
    getGraph () {
      axios.get('/graph').then(res => {
        if (res.data.code === 200) {
          this.options.series.data = res.data.data.data;
          this.options.series.edges = res.data.data.edge;
        } else {
          alert(res.data.msg);
        }
      });
    }
  },
  mounted () {
    this.getPageRankList();
    this.getTriangleRankList();
    this.getMostInDegree();
    this.getMostOutDegree();
    this.getGraph();
  }
};
</script>

<style lang='scss' scoped>
.side {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.rank-flex {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  &:not(first) {
    margin-left: 30px;
  }
  .rank-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 95%;
    .rank-title {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      height: 8%;
      margin-bottom: 3%;
      .rank-title-text {
        font-size: 18px;
        font-weight: bold;
        color: rgba(0, 0, 0, 0.54);
      }
    }
    .rank-list-top {
      width: 100%;
      height: 28%;
      margin-bottom: 2%;
      align-items: center;
      .rank-list-top-index {
        font-style: italic;
        font-family: 'Trebuchet MS';
        font-size: 18px;
        .rank-list-top-1-index {
          width: 80px;
          display: flex;
          justify-content: center;
          font-size: 18px;
        }
      }
      .rank-list-top-1 {
        height: 53%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-size: 22px;
      }
      .rank-list-top-23 {
        height: 42%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;
        font-size: 18px;
        >div {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
      }
    }
    .rank-list {
      width: 100%;
      height: 58%;
      min-width: 210px;
      .rank-list-item {
        height: 10%;
        padding: 14px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        color:rgba(0, 0, 0, 0.8);
        &:not(last-child) {
          margin-bottom: 2.5%;
        }
        .rank-list-item-index {
          width: 10%;
          min-width: 20px;
          text-align: center;
          margin-right: 12px;
          .rank-list-top-1-index {
            width: 80px;
          }
        }
        .rank-list-item-name {
          width: 57%;
          min-width: 120px;
        }
        .rank-list-item-rank {
          width: 25%;
          min-width: 50px;
        }
      }
    }
  }
}
.other-flex {
  display: flex;
  justify-content: center;
  margin-left: 30px;
}
.other-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 40%;
  margin-top: 5%;
}
.service-selector {
  position: absolute;
}
.service-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .service-info {
    font-size: 20px;
    margin-top: 15px;
    display: flex;
    justify-content: center;
  }
  .service-rank-purple {
    margin-top: 20px;
    border-radius: 50%;
    width: 80px;
    height: 80px;
    text-align: center;
    line-height: 80px;
    font-size: 36px;
    background-color: purple;
    color: white;
  }
  .service-rank-red {
    margin-top: 20px;
    border-radius: 50%;
    width: 80px;
    height: 80px;
    text-align: center;
    line-height: 80px;
    font-size: 36px;
    background-color: red;
    color: white;
  }
}
.dialog-card {
  height: 840px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #F3F3F3;
  .graphx-chart {
    width: 100%;
    height: 100%;
  }
}
</style>
