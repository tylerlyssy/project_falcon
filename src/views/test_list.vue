<template>
  <itemlist :items="items" :component="test_list_item" name="test"/>
</template>

<script>
import itemlist from '../components/itemlist.vue';
import test_list_item from '../components/test_list_item.vue'
export default {
  components: { itemlist },
  data() {
    return {test_list_item}
  },
  computed: {
    items() {
      return this.$store.getters.tests
    },
  }
};
</script>
