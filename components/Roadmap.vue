<template>
  <v-timeline :dense="$vuetify.breakpoint.smAndDown" align-bottom>
    <v-timeline-item
      v-for="(item, i) in roadmap"
      :key="i"
      :color="item.color ? item.color : colors[i % colors.length]"
      :right="i % 2 === 0"
      :small="i % 2 !== 0"
    >
      <v-card :color="item.color ? item.color : colors[i % colors.length]">
        <v-card-title class="grey lighten-4">
          <v-img :alt="item.title" :src="item.image"></v-img>
        </v-card-title>
        <v-card-text :class="`pa-0 text-subtitle-1 text--primary transparent`">
          <v-sheet class="pa-3 transparent">
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
