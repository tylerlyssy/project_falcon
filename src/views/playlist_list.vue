<template>
  <itemlist :items="items" :component="playlist_list_item" name="playlist"/>
</template>

<script>
import itemlist from '../components/itemlist.vue';
import playlist_list_item from '../components/playlist_list_item.vue'
export default {
  components: { itemlist },
  data() {
    return {playlist_list_item}
  },
  computed: {
    items() {
      return this.$store.getters.playlists
    },
  }
};
</script>
