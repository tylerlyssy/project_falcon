<template>
  <v-list two-lines>
    <v-list-item-group>
      <template v-for="(item, index) in filtered_items">
        <v-list-item 
          active="false"
          :key="item.name"
          @click="$router.push({name: `${name}_detail`, params: {name: item.name}})"
        >
          <template v-slot:default="">
            <component :is="component" :item="item"/>
          </template>
        </v-list-item>

        <v-divider v-if="index < items.length - 1" :key="index"></v-divider>
      </template>
    </v-list-item-group>
  </v-list>
</template>

<script>
export default {
  props: {
    name: String,
    items: Array,
    component: Object,
  },
  computed: {
    filtered_items() {
      let f_tags = this.$store.getters.tags_for_filtering
      if(f_tags.length) {
        return this.$_.filter(
          this.items, 
          i => {
            if(!i.tags.length) {
              return false
            }
            return this.$_.every(
              f_tags, 
              t => this.$_.includes(this.$_.map(i.tags, 'display_name'), t)
            )
          }
        )
      } else {
        return this.items
      }
    }
  }
}
</script>