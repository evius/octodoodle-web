<template>
  <v-row>
    <v-col v-for="(member, i) of members" :key="i">
      <v-card class="mx-auto" max-width="344">
        <v-img :src="member.image"></v-img>

        <v-card-title> {{ member.slug }} </v-card-title>

        <v-card-subtitle> {{ member.description }} </v-card-subtitle>
      </v-card>
    </v-col>
  </v-row>
</template>
<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  props: {
    members: Array,
  },
});
</script>
