<template>
  <v-container fluid>
    <h1>{{event.display_name}}</h1>
    <v-row justify="center">
      <v-col cols="4">
        <v-text-field 
          v-if="$_.starts_with(event.name, 'every')" 
          label="Cron Schedule" 
          placeholder="* * * * *"
        />
      </v-col>
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
    }
  }
}
</script>