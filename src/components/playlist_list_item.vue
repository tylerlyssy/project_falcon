<template>
  <v-row align="center" class="ma-0 pa-0">
    <v-list-item-icon>
      <v-avatar
        :color="item.user.color"
        size="46"
      >
        {{item.user.initials}}
      </v-avatar>
    </v-list-item-icon>
    <v-list-item-content>
      <v-list-item-title
        v-text="item.display_name" 
      ></v-list-item-title>
      <v-list-item-subtitle
        class="ma-0"
        v-text="`
          Created At: ${new Date().toLocaleDateString('en-US')} - Last Executed At: ${new Date().toLocaleDateString('en-US')}
        `"
      ></v-list-item-subtitle>
    </v-list-item-content>
    <v-col cols=6>
      <v-row>
        <v-col
          cols=6
          class="ma-0 pa-0"
          v-for="(value, key) in item.status_map" 
          :key="key"
        >
          <v-progress-linear
            :color="get_color(key)" 
            :value="get_value(value)"
            class="ma-0 pa-0"
            :buffer-value="100"
            height="15"
          >
            <template v-slot:default="{ }">
              <strong>{{ item.status_map[key] }} ({{$_.floor(get_value(value)) }}%)</strong>
            </template>
          </v-progress-linear>
        </v-col>
      </v-row>
      <v-row class="mt-4">
        <v-progress-linear
          color="primary"
          class=""
          height="15"
          :value="get_value(num_completed)"
          :buffer-value="item.status === 'running' ? 0 : 100"
          :stream="item.status === 'running'"
          :indeterminate="item.status === 'queued'"
        >
          <template v-slot:default="{ }">
            <strong v-if="item.status === 'finished'">
              {{total}}
            </strong>
            <strong v-else-if="item.status === 'running'">
              {{`${num_completed}/${total}`}} ({{ percent_completed }}%)
            </strong>
          </template>
        </v-progress-linear>
      </v-row>
    </v-col>
  </v-row>    
</template>
<script>
export default {
  props: {
    item: Object
  },
  computed: {
    total() {
      return this.item.test_runs.length
    },
    num_completed() {
      return this.$_.sum(this.$_.values(this.item.status_map))
    },
    percent_completed() {
      return this.$_.floor(this.get_value(this.num_completed))
    }
  },
  methods: {
    get_value(value) {
      return (value / this.total) * 100
    },
    get_color(typ) {
      switch (typ) {
        case 'passed':
          return 'success'
        case 'failed':
          return 'error'
        case 'aborted':
          return 'warning'
        case 'cancelled':
          return 'secondary lighten-2'
        case 'running':
          return 'primary'
        default:
          break
      }
    }
  }
}
</script>