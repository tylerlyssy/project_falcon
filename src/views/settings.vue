<template>
  <v-row class="mt-4 ml-4">
    <v-col cols="2">
      <v-switch 
        v-model="$vuetify.theme.dark" 
        label="DARK MODE!!!"
        inset
        @input="v => localStorage.dark = v"
      />
    </v-col>
    <v-col cols="10">
      <v-row>
        <v-color-picker
          class="mx-2"
          v-for="(value, key) in colors"
          :key="key"
          dot-size="25"
          swatches-max-height="100"
          :value="$vuetify.theme.themes[theme][key]"
          @input="v => $vuetify.theme.themes[theme][key] = v"
        />
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'settings',
  computed: {
    theme() {
      return this.$vuetify.theme.dark ? 'dark' : 'light'
    },
    colors() {
      return {
        primary: this.$vuetify.theme.themes[this.theme].primary,
        secondary: this.$vuetify.theme.themes[this.theme].secondary,
      }
    }
  }
}
</script>