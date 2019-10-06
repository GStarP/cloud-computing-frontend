<template>
  <v-layout id="menu-container">
    <div id="menu">
      <v-responsive
        v-for="(item, i) of menu"
        :key="i"
        :aspect-ratio="1"
        class="menu-item"
      >
        <v-card class="menu-item-card" :to="item.path">
          <v-icon class="menu-item-card-img mb-3" large>{{ item.img }}</v-icon>
          <div class="menu-item-card-text">{{ item.name }}</div>
        </v-card>
      </v-responsive>
    </div>
  </v-layout>
</template>

<script>
export default {
  data () {
    return {
      menu: [
        {
          name: '流计算',
          path: '/home/streaming',
          img: 'mdi-weather-windy'
        },
        {
          name: '图计算',
          path: '/home/graph-x',
          img: 'mdi-merge'
        },
        {
          name: '机器学习',
          path: '/home/machine-learning',
          img: 'mdi-robot'
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
#menu-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
#menu {
  display: flex;
  flex-direction: row;
  width: $menuWidth;
  margin-bottom: $topBarHeight;
}
.menu-item {
  width: $menuItemWidth;
  border-radius: 10px;
  box-shadow: 0 1px 2px 0 rgba(60,64,67,.08), 0 1px 3px 2px rgba(60,64,67,.16);
  &:nth-child(2) {
    margin: 0 $menuItemMargin;
  }
  @keyframes select {
    100% {
      transform: translate(-10px, -10px);
      box-shadow: 0 1px 5px 0 rgba(60,64,67,.08), 0 1px 3px 5px rgba(60,64,67,.16);
    }
  }
  &:hover {
    animation-name: select;
    animation-duration: 0.5s;
    animation-fill-mode: forwards;
  }
}
.menu-item-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: white;
}
.menu-item-card-img {
  color: black;
}
.menu-item-card-text {
  color: black;
  font-size: $cardFontSize;
}
</style>
