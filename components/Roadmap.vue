<template>
  <v-timeline :dense="$vuetify.breakpoint.smAndDown" align-top>
    <v-timeline-item
      v-for="(item, i) in roadmap"
      :key="i"
      :color="item.color ? item.color : colors[i % colors.length]"
      fill-dot
      :right="i % 2 === 0"
      :small="i % 2 !== 0"
    >
      <v-card dark :color="item.color ? item.color : colors[i % colors.length]">
        <v-card-title
          :class="item.color ? item.color : colors[i % colors.length]"
        >
          <h2 class="text-h6 white--text">
            {{ item.title }}
          </h2>
        </v-card-title>
        <v-card-text class="pa-0 text--primary">
          <v-sheet class="pa-3">
            <nuxt-content :document="item" />
          </v-sheet>
        </v-card-text>
      </v-card>
    </v-timeline-item>
  </v-timeline>
</template>
<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    roadmap: Array,
  },
  data() {
    return {
      colors: [
        'purple lighten-1',
        'amber lighten-1',
        'green lighten-1',
        'red lighten-1',
        'cyan lighten-1',
      ],
    };
  },
});
</script>
