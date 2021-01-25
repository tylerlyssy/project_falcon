<template>
  <v-row align="center" class="ma-0 pa-0">
    <v-list-item-icon class="my-auto ml-2">
      <v-chip :color="color_from_status(item.status)">
        <strong>{{ item.version }}</strong>
      </v-chip>
    </v-list-item-icon>
    <v-list-item-content>
      <v-list-item-title
        v-text="item.display_name"
      ></v-list-item-title>
    </v-list-item-content>
    <v-col cols=8>
      <v-stepper>
        <v-stepper-header>
          <template v-for="(step, index) in item.steps">
            <v-stepper-step
              :rules="step.status === 'failed' ? [() => false] : []"
              :key="step.label"
              color="success"
              :complete="step.complete"
              :step="index + 1"
            >
              {{step.stage}}
            </v-stepper-step>
            <v-divider
              :key="index + 1"
            ></v-divider>
          </template>
        </v-stepper-header>
      </v-stepper>
    </v-col>
  </v-row>    
</template>
<script>
export default {
  props: {
    item: Object
  },
  methods: {
    color_from_status(status) {
      switch (status) {
        case 'passed':
          return 'success'
        case 'failed':
          return 'error'
        case 'running':
          return 'primary'
      }
    }
  }
}
</script>