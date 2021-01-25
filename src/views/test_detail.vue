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
          <v-chip :color="tag.color" filter v-for="tag in test.tags" :key="tag.name">
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
    <div id="blocklyDiv" style="height:610px; width: 945px;"></div>
  </div>
  
</template>

<script>
import {mapGetters} from 'vuex'
import Blockly from 'blockly';


export default {
  props: {
    name: String
  },
  async mounted(){
    let xml = `
      <xml xmlns="https://developers.google.com/blockly/xml" id="toolbox" style="display: none">
        <block type="controls_if"></block>
        <block type="logic_compare"></block>
        <block type="controls_repeat_ext"></block>
        <block type="math_number">
          <field name="NUM">123</field>
        </block>
        <block type="math_arithmetic"></block>
        <block type="text"></block>
        <block type="text_print"></block>
      </xml>
    `
    await Blockly.inject('blocklyDiv',
    {
      comments: true,
      disable: true,
      collapse: true,
      grid: {
        spacing: 25,
        length: 3,
        colour: '#ccc',
        snap: true
      },
      readOnly: false,
      realtime: true,
      scrollbars: true,
      toolbox: xml,
      zoom:{
        enabled: true,
        controls: true,
        wheel: true,
        maxScale: 2,
        minScale: .1,
        scaleSpeed: 1.1
      }
    });
  },
  computed: {
    ...mapGetters(['tests']),
    test() {
      return this.$_.find(this.tests, ['name', this.name])
    }
  }
}
</script>