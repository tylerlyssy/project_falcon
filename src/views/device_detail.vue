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
        <div v-for="(value, key) in device.meta" :key="key">
          <v-text-field :label="key" :value="value"></v-text-field>
        </div>
        <v-chip-group column>
          <v-chip :color="tag.color" filter v-for="tag in device.tags" :key="tag.name">
            {{ tag.name }}
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
    <h1 class="mb-5">Actions</h1>
    <v-row class="mb-2" v-for="action of device.actions" :key="action.name">
      <v-alert width="78%">
        <v-row justify="space-between" align="center">
          <h3 class="ml-2 my-auto text-capitalize">{{$_.startCase(action.name)}}</h3>
          <v-dialog
            v-if="action.type === 'button'"
            v-model="dialog"
            persistent
            max-width="600px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                v-on="on" 
              >
                <v-icon>mdi-check-circle</v-icon>
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">Are you sure?</span>
              </v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="primary darken-1"
                  text
                  @click="dialog = false"
                >
                  No
                </v-btn>
                <v-btn
                  color="primary darken-1"
                  text
                  @click="dialog = false"
                >
                  Yes
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-select dense :style="{'max-width': '40%'}" v-else-if="action.type === 'select'"
            :items="['v1.0', 'v2.0', 'v3.0', 'v4.0']"
            :menu-props="{ top: true, offsetY: true }"
            label="Version"
          />
          <v-switch inset class="pa-0 ma-0 mt-4" v-else-if="action.type === 'switch'"/>
        </v-row>
      </v-alert>
    </v-row>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  props: {
    name: String
  },
  data() {
    return {
      dialog: false
    }
  },
  computed: {
    ...mapGetters(['devices']),
    device() {
      return this.$_.find(this.devices, ['name', this.name])
    }
  }
}
</script>