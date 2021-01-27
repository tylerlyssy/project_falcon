<template>
  <v-chip-group column>
    <v-chip :color="tag.color" filter v-for="tag in item.tags" :key="tag.name">
      <v-icon left>
        mdi-tag
      </v-icon>
      {{ tag.display_name }}
    </v-chip>
  </v-chip-group>
</template>

<script>
export default {
  props: {
    item: Object
  }
}
</script>