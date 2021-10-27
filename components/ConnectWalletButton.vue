<template>
  <v-btn color="primary" @click="connect">
    <v-icon left :color="isConnected ? 'success' : 'error'">mdi-wallet</v-icon>
    Connect Wallet</v-btn
  >
</template>
<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  props: ['isConnected'],
  methods: {
    connect() {
      this.$emit('connect');
    },
  },
});
</script>
