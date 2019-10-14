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
      >
        <v-icon class='mr-2'>mdi-eye</v-icon>
        Graph
      </v-btn>
    </v-flex>
    <v-flex class='rank-flex' md3>
      <v-card class='rank-card' :elevation='3'>
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
export default {
  data () {
    return {
      pageRankList: [
        {
          'name': '兰州大学',
          'rank': 2.261964602068338
        }, {
          'name': '中南财经政法大学',
          'rank': 2.2050218423457113
        }, {
          'name': '华南理工大学',
          'rank': 2.131462488215795
        }, {
          'name': '东北师范大学',
          'rank': 2.109678162602549
        }, {
          'name': '大连理工大学',
          'rank': 2.0891515392622892
        }, {
          'name': '中央民族大学',
          'rank': 1.9832924105823564
        }, {
          'name': '云南大学',
          'rank': 1.9690137002374515
        }, {
          'name': '大连海事大学',
          'rank': 1.851633026118661
        }, {
          'name': '中国人民大学',
          'rank': 1.7544855186606716
        }, {
          'name': '南昌大学',
          'rank': 1.7240188681635649
        }, {
          'name': '河海大学',
          'rank': 1.711742584605579
        }
      ],
      triangleList: [
        {
          'name': '兰州大学',
          'rank': 1829
        }, {
          'name': '中南财经政法大学',
          'rank': 1426
        }, {
          'name': '华南理工大学',
          'rank': 1426
        }, {
          'name': '四川大学',
          'rank': 1294
        }, {
          'name': '大连理工大学',
          'rank': 1248
        }, {
          'name': '南京大学',
          'rank': 1216
        }, {
          'name': '中国人民大学',
          'rank': 1199
        }, {
          'name': '云南大学',
          'rank': 1141
        }, {
          'name': '河海大学',
          'rank': 1110
        }, {
          'name': '吉林大学',
          'rank': 1081
        }, {
          'name': '南昌大学',
          'rank': 1065
        }
      ],
      services: [
        '万众瞩目',
        '交际花'
      ],
      selectedService: '',
      mostIn: {
        name: '上海交通大学',
        rank: '75',
        info: '被@次数'
      },
      mostOut: {
        name: '东北大学',
        rank: '70',
        info: '@其他大学次数'
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
</style>
