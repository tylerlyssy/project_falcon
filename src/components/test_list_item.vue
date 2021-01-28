<template>
  <v-row align="center" class="ma-0 pa-0">
    <v-list-item-icon class="my-auto ml-2">
      <v-icon size="40px">mdi-{{ item.icon }}</v-icon>
    </v-list-item-icon>
    <v-list-item-content>
      <v-list-item-title
        v-text="$_.startCase(item.name)"
      ></v-list-item-title>
      <v-list-item-subtitle
        class="ma-0"
        v-text="`Created At: ${item.created_at}`"
      />
      <v-list-item-subtitle
        class="ma-0"
        v-text="`Started At: ${item.started_at}`"
      />
    </v-list-item-content>
    <taggroup :tags="item.tags"/>
    <v-list-item-action>
      <v-icon :color="item.status ? 'success' : 'error'">{{item.status ? 'mdi-check-circle' : 'mdi-close-circle'}} </v-icon>
    </v-list-item-action>
  </v-row>    
</template>
<script>
import taggroup from "./taggroup.vue"

export default {
  components: { taggroup },
  props: {
    item: Object
  }
}
</script>