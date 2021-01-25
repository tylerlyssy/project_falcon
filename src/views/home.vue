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
            {{item.num.toLocaleString('en')}}
          </v-col>
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
// import { tween } from 'femtotween'
export default {
  data() {
    return {
      items: [
        {name: 'Completed Tests', num: 12302940},
        {name: 'Upgraded Devices', num: 13020},
        {name: 'Released Certified', num: 120},
      ],
      intervals: [null, null, null]
    }
  },
  created() {
    this.intervals[0] = window.setInterval(() => {
      this.items[0].num += this.$_.random(1, 500)
    }, 1000)
    this.intervals[0] = window.setInterval(() => {
      this.items[1].num += this.$_.random(1, 50)
    }, 3000)
    this.intervals[0] = window.setInterval(() => {
      this.items[2].num += this.$_.random(1, 5)
    }, 5000)
  },
  watch: {
    items(n, o){
      console.log(n, o)
    }
  },
  beforeDestroy() {
    for(let interval of this.intervals) {
      window.clearInterval(interval)
    }
  }
}
</script>