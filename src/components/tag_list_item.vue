<template>
  <v-row align="center" class="ma-0 pa-0">
    <v-list-item-icon class="my-auto ml-2">
      <v-icon size="40px">mdi-{{ item.icon }}</v-icon>
    </v-list-item-icon>
    <v-list-item-content>
      <v-list-item-title
        v-text="item.display_name"
      ></v-list-item-title>
    </v-list-item-content>
    <v-chip-group column>
      <v-chip :color="item.color">
        {{ item.display_name }}
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