<template>
  <v-app>
    <appbar/>
    <navdrawer/>
    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
    <v-footer app>
      <h4>UTAP</h4>
    </v-footer>
  </v-app>
</template>

<script>
import appbar from './components/appbar'
import navdrawer from './components/navdrawer'

export default {
  name: 'app',
  components: {
    appbar,
    navdrawer
  },
  created () {
    if(!localStorage.dark){
      localStorage.dark = false
    }
    this.$vuetify.theme.dark = localStorage.dark
  }
};
</script>
