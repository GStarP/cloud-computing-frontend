<template>
  <v-layout justify-space-between wrap>
    <v-flex md3>
      <v-card>

      </v-card>
    </v-flex>
    <v-flex md3>
      <v-card>

      </v-card>
    </v-flex>
    <v-flex md3>
      <v-card>

      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data () {
    return {
      menu: [
        {
          name: '流计算',
          path: '/streaming'
        },
        {
          name: '图计算',
          path: '/graph-x'
        },
        {
          name: '机器学习',
          path: '/machine-learning'
        }
      ]
    };
  }
};
</script>
