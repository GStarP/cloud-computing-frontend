<template>
  <v-layout>
    <v-flex md2>
      <v-btn
        class="ml-8 mt-6"
        color="primary"
        to="/home"
      >
        <v-icon class="mr-2">mdi-undo-variant</v-icon>
        Back
      </v-btn>
    </v-flex>
    <v-flex md8 class="chart-flex">
      <v-card class="chart-card" :elevation="5">
        <chart
          class="streaming-chart"
          ref="streaming-chart"
          :options="options"
          :auto-resize="true"
        />
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data () {
    return {
      options: {
        xAxis: {
          type: 'category',
          data: ['南京大学', '复旦大学', '北京大学', '清华大学', '东南大学']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [820, 932, 901, 934, 1290],
          type: 'bar',
          smooth: true
        }]
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
  margin-bottom: $topBarHeight / 2;
  height: 80%;
  width: 100%;
  .streaming-chart {
    height: 100%;
    width: 100%;
  }
}
</style>
