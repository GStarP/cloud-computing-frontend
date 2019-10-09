<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title>CLOUD-COMPUTING</v-toolbar-title>
      <div class="flex-grow-1"></div>
      <v-btn dark href="https://github.com/GStarP/cloud-computing-2019">
        GITHUB
        <v-icon class="ml-2">mdi-github-circle</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    //
  })
};
</script>
