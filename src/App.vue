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
      >
        <v-col>
          <v-chip class="my-1">
            v2021.0.0
          </v-chip>
        </v-col>
        <v-col cols="4">
          <v-text-field 
            v-if="$_.includes($route.name, '_list')"
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
    '$vuetify.theme.dark'() {
      localStorage.dark = this.$vuetify.theme.dark
    }
  }
};
</script>
