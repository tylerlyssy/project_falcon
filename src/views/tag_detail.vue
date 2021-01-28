<template>
  <v-container fluid>
    <v-row>
      <h1>{{tag.display_name}}</h1> 
    </v-row> 
    <v-row justify='center'>
      <v-color-picker
        class="ma-2"
        readonly
        v-model="tag.color"
        show-swatches
      ></v-color-picker>
    </v-row>
  </v-container>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  props: {
    name: String
  },
  computed: {
    ...mapGetters(['tags']),
    tag() {
      return this.$_.find(this.tags, ['name', this.name])
    }
  }
}
</script>