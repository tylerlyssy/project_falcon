<template>
  <itemlist :items="items" :component="plan_list_item" name="plan"/>
</template>

<script>
import itemlist from '../components/itemlist.vue';
import plan_list_item from '../components/plan_list_item.vue'
export default {
  components: { itemlist },
  data() {
    return {plan_list_item}
  },
  computed: {
    items() {
      return this.$store.getters.plans
    },
  }
};
</script>
