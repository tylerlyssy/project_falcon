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
        v-text="
          $_.map(item.meta, (v, k) => {
            return `${$_.startCase(k)}: ${v}`;
          }).join(' | ')
        "
      ></v-list-item-subtitle>
    </v-list-item-content>
    <taggroup :tags="item.tags"/>
    <v-list-item-action>
      <v-icon :color="item.health ? 'success' : 'error'"> mdi-heart </v-icon>
    </v-list-item-action>
  </v-row>    
</template>
<script>
import taggroup from './taggroup.vue'
export default {
  components: { taggroup },
  props: {
    item: Object,
  }
}
</script>