<template>
  <v-container fluid>
    <h1>{{event.display_name}}</h1>
    <v-row justify="center">
      <v-col cols="4">
        <v-text-field 
          class="mx-auto"
          v-if="$_.startsWith(event.name, 'every')" 
          label="Cron Schedule" 
          placeholder="* * * * *"
        />
      </v-col>
    </v-row>
    <v-row justify="center">
      <h3>{{$_.startsWith(event.name, 'every') ? 'Next Run Time' : 'Last Run Time'}}</h3>
    </v-row>
    <v-row justify="center">
      <v-date-picker class="ma-1" readonly :value="date"/>
      <v-time-picker class="ma-1" readonly :value="time" use-seconds/>
    </v-row>
  </v-container>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  props: {
    name: String
  },
  data() {
    return {
      dialog: false
    }
  },
  computed: {
    ...mapGetters(['events']),
    event() {
      return this.$_.find(this.events, ['name', this.name])
    },
    run_time() {
      return this.event.next_run_time || this.event.last_run_time
    },
    date() {
      return this.run_time.toISOString().substr(0, 10)
    },
    time() {
      return this.run_time.toISOString().substr(11, 8)
    }

  }
}
</script>