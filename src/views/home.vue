<template>
  <v-container fluid>
    <v-row justify="center" class="mb-6">
      <h1 class="text-center">Unified Testing Automation Platform</h1>
    </v-row>
    <v-row justify="space-between">
      <v-card 
        width="33%"
        v-for="item of items"
        :key="item.name"
      >
        <v-card-text>
          <v-col
            class="display-3 text-center"
          >
            {{item.name}}
          </v-col>
          <v-col
            class="display-3 text-center"
            
          >
            <h5 class="primary--text">{{item.num.toLocaleString('en')}}</h5>
          </v-col>
        </v-card-text>
      </v-card>
    </v-row>
     <v-row justify="space-between" class="mt-5">
      <v-card 
        width="33%"
        v-for="chart of charts"
        :key="chart.name"
      >
        <v-card-text>
          <v-col
            class="display-3 text-center"
          >
            {{chart.name}}
          </v-col>
          <v-sparkline
            :value="chart.value"
            color="primary"
            height="100"
            padding="24"
            stroke-linecap="round"
            smooth
            auto-draw
          >
            <template v-slot:label="item">
              {{ item.value }}
            </template>
          </v-sparkline>
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
let array = [...Array(10).keys()]
export default {
  data() {
    return {
      items: [
        {name: 'Completed Tests', num: 12302940},
        {name: 'Upgraded Devices', num: 13020},
        {name: 'Releases Certified', num: 120},
      ],
      charts: [
        {name: 'Last 24 hrs', value: this.$_.map(array, () => this.$_.random(0, 100))},
        {name: 'Last 2 days', value: this.$_.map(array, () => this.$_.random(100, 1000))},
        {name: 'Last 7 days', value: this.$_.map(array, () => this.$_.random(1000, 10000))},
      ],
      array,
      intervals: [null, null, null],
    }
  },
  created() {
    this.intervals[0] = window.setInterval(() => {
      this.items[0].num += this.$_.random(1, 500)
    }, 1000)
    this.intervals[1] = window.setInterval(() => {
      this.items[1].num += this.$_.random(1, 50)
    }, 3000)
    this.intervals[2] = window.setInterval(() => {
      this.items[2].num += this.$_.random(1, 5)
    }, 5000)
  },
  beforeDestroy() {
    for(let interval of this.intervals) {
      window.clearInterval(interval)
    }
  }
}
</script>