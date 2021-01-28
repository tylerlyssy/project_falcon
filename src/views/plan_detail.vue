<template>
  <div>
    <v-navigation-drawer
      absolute
      permanent
      right
    >
      <v-row class="ma-2" justify="space-between">
        <h1>{{$_.startCase(name)}}</h1>
        <v-icon>mdi-square-edit-outline</v-icon>
      </v-row>
      <v-form>
        <v-chip-group column>
          <v-chip :color="event.color" filter v-for="event in plan.events" :key="event.name">
            {{ event.name }}
          </v-chip>
        </v-chip-group>
      </v-form>
      <v-row justify="center" class="mt-2">
        <v-btn-toggle
          rounded
        >
          <v-btn color='primary'>
            <v-icon>mdi-content-save</v-icon>
          </v-btn>
          <v-btn color="accent">
            <v-icon>mdi-hammer-wrench</v-icon>
          </v-btn>
          <v-btn>
            <v-icon>mdi-heart-pulse</v-icon>
          </v-btn>
          <v-btn color='error'>
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-btn-toggle>
      </v-row>
    </v-navigation-drawer>
    <h1>Test Cases</h1>
    <v-list class="overflow-y-auto" max-height="72vh" two-lines width="80%">
      <v-list-item-group>
        <template v-for="(test, index) in tests">
          <v-divider v-if="index" :key="index-1"></v-divider>
          <v-list-item 
            active="false"
            :key="test.name"
          >
            <template v-slot:default="">
              <v-list-item-action>
                <v-checkbox
                  :input-value="test.is_selected"
                  @change="test.is_selected = !test.is_selected"
                  color="primary"
                ></v-checkbox>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title
                  v-text="$_.startCase(test.name)"
                ></v-list-item-title>
              </v-list-item-content>
              <v-chip-group column>
                <v-chip :color="tag.color" filter v-for="tag in test.tags" :key="tag.name">
                  {{ tag.display_name }}
                </v-chip>
              </v-chip-group>
              <v-col cols=3 class="pa-0 ma-0">
                <v-slider
                  dense
                  min="1"
                  width="100%"
                  :disabled="!test.is_selected"
                  v-model="test.iterations"
                  thumb-label="always"
                  thumb-size="20"
                >
                </v-slider>
              </v-col>
            </template>
          </v-list-item>
          <v-divider v-if="index < tests.length - 1" :key="index"></v-divider>
        </template>
      </v-list-item-group>
    </v-list>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  props: {
    name: String
  },
  computed: {
    ...mapGetters(['plans', 'tests']),
    plan() {
      return this.$_.find(this.plans, ['name', this.name])
    }
  }
}
</script>