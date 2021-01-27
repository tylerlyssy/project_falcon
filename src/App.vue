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
      <v-row
        align="center" 
        justify="space-between" 
        class="ma-0 pa-0"
        v-if="$_.includes($route.name, '_list')"
      >
        <v-col class="ma-0 pa-0">
        </v-col>
        <v-col cols="4" class="ma-0 pa-0">
          <v-text-field 
            ref="search_"
            filled
            single-line
            dense
            hide-details 
            clearable
            class="ma-auto" 
            placeholder="Search"
            @input="val => search(val)"
          />
        </v-col>
      </v-row>
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
  data () {
    return {
      search_: ''
    }
  },
  created () {
    if(!localStorage.dark){
      localStorage.dark = false
    }
    this.$vuetify.theme.dark = localStorage.dark
  },
  methods: {
    search (val) {
      this.$store.commit('set_search', val)
    }
  },
  watch: {
    '$route.name': {
      handler() {
        console.log(this.$refs['search_'].$refs['append-inner'].click())
      }
    }
  }
};
</script>
