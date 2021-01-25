<template>
  <itemlist :items="items" :component="device_list_item" name="device"/>
</template>

<script>
import itemlist from '../components/itemlist.vue';
import device_list_item from '../components/device_list_item.vue'
export default {
  components: { itemlist },
  data() {
    return {device_list_item}
  },
  computed: {
    items() {
      return this.$store.getters.devices
    },
  }
};
</script>
