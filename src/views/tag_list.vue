<template>
  <itemlist :items="items" :component="tag_list_item" name="tag"/>
</template>

<script>
import itemlist from '../components/itemlist.vue';
import tag_list_item from '../components/tag_list_item.vue'
export default {
  components: { itemlist },
  data() {
    return {tag_list_item}
  },
  computed: {
    items() {
      return this.$store.getters.tags
    },
  }
};
</script>
