<template>
  <v-row align="center" class="ma-0 pa-0">
    <v-list-item-icon>
      <v-icon>
        mdi-{{$_.startsWith(item.name, 'every') ? 'update' : 'plus-network'}}
      </v-icon>
    </v-list-item-icon>
    <v-list-item-content>
      <v-list-item-title
        v-text="item.display_name"
      ></v-list-item-title>
    </v-list-item-content>
    <v-chip :color="item.color">
      <v-avatar left>
        <v-icon>{{$_.startsWith(item.name, 'every') ? 'mdi-clock-start' : 'mdi-history'}}</v-icon>
      </v-avatar>
      {{item.next_run_time || item.last_run_time }}
    </v-chip>
  </v-row>    
</template>
<script>
export default {
  props: {
    item: Object
  }
}
</script>