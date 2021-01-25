<template>
  <v-navigation-drawer
    app
    expand-on-hover
    clipped
  >
   <v-list shaped>
      <v-list-item-group
        color="primary"
      >
        <v-list-item
          v-for="(item, i) in $constants.pages"
          :key="i"
          :to="item.path"
        >
          <v-list-item-icon>
            <v-icon>mdi-{{item.icon}}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.path.toUpperCase().slice(1)"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'navdrawer'
}
</script>