<template>
  <itemlist :items="items" :component="release_list_item" name="release"/>
</template>

<script>
import itemlist from '../components/itemlist.vue';
import release_list_item from '../components/release_list_item.vue'
export default {
  components: { itemlist },
  data() {
    return {release_list_item}
  },
  computed: {
    items() {
      return this.$store.getters.releases
    },
  }
};
</script>
