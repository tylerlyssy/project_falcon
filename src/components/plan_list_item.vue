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
    <v-chip-group column>
      <v-chip :color="event.color" filter v-for="event in item.events" :key="event.name">
        <v-icon>
          mdi-{{$_.startsWith(event.name, 'every') ? 'update' : 'plus-network'}}
        </v-icon>
        {{ event.display_name }}
      </v-chip>
    </v-chip-group>
  </v-row>    
</template>
<script>
export default {
  props: {
    item: Object
  }
}
</script>