<template>
  <itemlist :items="items" :component="event_list_item" name="event"/>
</template>

<script>
import itemlist from '../components/itemlist.vue';
import event_list_item from '../components/event_list_item.vue'
export default {
  components: { itemlist },
  data() {
    return {event_list_item}
  },
  computed: {
    items() {
      return this.$store.getters.events
    },
  }
};
</script>
