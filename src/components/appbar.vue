<template>
  <v-app-bar
    app
    color="primary"
    clipped-left
  >
    <v-row align="center">
      <v-col cols="1">
        <h1 @click="$router.push('/')">UTAP</h1>
      </v-col>
      <v-col cols="5">
        <v-card>
          <v-breadcrumbs 
            class="ml-2 pa-1" 
            :items="items"
            v-if="$_.includes($route.name, '_list') || $_.includes($route.name, 'detail')"
          >
            <template v-slot:item="{ item }">
              <v-breadcrumbs-item
                :to="item.to"
                exact
                :disabled="item.disabled"
              >
                <h2>{{ item.text }}</h2>
              </v-breadcrumbs-item>
            </template>
          </v-breadcrumbs>
        </v-card>
      </v-col>
      <v-col cols=4>
        <v-combobox
          v-if="$_.includes(['device_list', 'test_list'], $route.name)"
          dense
          class="mt-7"
          v-model="f_tags"
          :items="$_.map($store.getters.tags, 'display_name')"
          chips
          clearable
          multiple
          prepend-icon="mdi-tag-multiple"
          solo
        >
          <template v-slot:selection="{ attrs, item, select, selected }">
            <v-chip
              v-bind="attrs"
              :input-value="selected"
              close
              @click="select"
              @click:close="f_tags.splice($_.findIndex(f_tags, item),1)"
            >
              <strong>{{ item }}</strong>&nbsp;
            </v-chip>
          </template>
        </v-combobox>
      </v-col>
      <v-col cols="2" class="mx-auto">
        <v-hover v-for="page in $constants.user_pages" :key="page.name">
          <v-btn 
            class="ml-1"
            fab
            color="secondary"
            :to="page.path"
            elevation="5"
          >
            <v-icon large>mdi-{{page.icon}}</v-icon>
          </v-btn>
        </v-hover>
      </v-col>
    </v-row>
  </v-app-bar>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
export default {
  name: 'appbar',
  data() {
    return {f_tags: []}
  },
  computed: {
    ...mapGetters(['tags_for_filtering']),
    items() {
      let routes = this.$route.path.split('/').slice(1)
      
      return this.$_.map(routes, r => {
        return {
          text: this.$_.startCase(r),
          disabled: r === this.$_.last(routes),
          to: `/${r}`
        }
      })
    }
  },
  methods: {
    ...mapMutations(['set_tags_for_filtering'])
  },
  watch: {
    f_tags() {
      this.set_tags_for_filtering(this.f_tags)
    }
  }
}
</script>

<style scoped>
.v-breadcrumbs__item--disabled {
  text-decoration: underline !important;
}
</style>