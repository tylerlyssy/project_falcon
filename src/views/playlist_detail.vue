<template>
  <div>
    <v-navigation-drawer
      absolute
      permanent
      right
    >
      <v-row class="ma-2" justify="space-between">
        <h1>{{ playlist.name }}</h1>
        <v-icon>mdi-square-edit-outline</v-icon>
      </v-row>
      <v-form>
      </v-form>
      <v-row justify="center" class="mt-2">
        <v-btn-toggle
          rounded
        >
          <v-btn color='primary'>
            <v-icon>mdi-content-save</v-icon>
          </v-btn>
          <v-btn color="accent">
            <v-icon>mdi-hammer-wrench</v-icon>
          </v-btn>
          <v-btn>
            <v-icon>mdi-heart-pulse</v-icon>
          </v-btn>
          <v-btn color='error'>
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-btn-toggle>
      </v-row>
    </v-navigation-drawer>
    <v-row justify="center" width="80%">
      <barchart :chartdata="chartdata" :options="options"/>
    </v-row>
    <v-list two-lines width="80%">
      <v-list-item-group>
        <template v-for="(test_run, index) in playlist.test_runs">
          <v-list-item 
            active="false"
            :key="test_run.test.name"
          >
            <template v-slot:default="">
              <v-list-item-content>
                <v-list-item-title
                  v-text="test_run.test.display_name"
                ></v-list-item-title>
              </v-list-item-content>
              <v-chip :color="color_from_status(test_run.status)">
                {{test_run.status}}
              </v-chip>
              <!-- <v-chip-group column>
                <v-chip :color="tag.color" filter v-for="tag in test_run.test.tags" :key="tag.name">
                  {{ tag.name }}
                </v-chip>
              </v-chip-group> -->
            </template>
          </v-list-item>

          <v-divider v-if="index < playlist.test_runs.length - 1" :key="index"></v-divider>
        </template>
      </v-list-item-group>
    </v-list>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import barchart from '../components/bar_chart'

export default {
  props: {
    name: String
  }, 
  data: () => ({
    options: {
      responsive: true,
      maintainAspectRatio: false,
      horizontalBar: true,
      scales: {
            xAxes: [{
                stacked: true
            }],
            yAxes: [{
                stacked: true
            }]
        }
    }
  }),
  components: {
    barchart
  },
  computed: {
    ...mapGetters(['playlists']),
    chartdata() {
      return {
        // labels: this.$_.keys(this.playlist.status_map),
        datasets: this.$_.map(this.$_.entries(this.playlist.status_map), ([key, value]) => {
          let color = '#'
          if(key === 'failed') {
            color += 'F44336'
          } else if(key === 'passed') {
            color += '4CAF50'
          } else if(key === 'aborted') {
            color += 'FF9800'
          } else if(key === 'cancelled') {
            color += 'BDBDBD'
          }
          return {
            label: key,
            backgroundColor: color,
            data: [value]
          }
        })
      }
    },
    playlist() {
      return this.$_.find(this.playlists, ['name', this.name])
    }
  },
  methods: {
    color_from_status(status) {
      switch (status) {
        case 'passed':
          return 'success'
        case 'failed':
          return 'error'
        case 'aborted':
          return 'warning'
        case 'cancelled':
          return 'secondary lighten-2'
      }
    }
  }
}
</script>