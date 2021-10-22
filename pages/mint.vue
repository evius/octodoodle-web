<template>
  <div>
    <h1>Mint</h1>
    <client-only>
      <v-btn v-show="isConnected" @click="connect">Connect</v-btn>
      <div>Status: {{ isConnected ? 'Connected' : 'Disconnected' }}</div>
      <SaleState />
    </client-only>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import Web3 from 'web3';
import SaleState from '../components/SaleState.vue';

@Component({
  components: {
    SaleState,
  },
})
export default class MintPage extends Vue {
  web3: Web3 | null = null;
  ethereum: any = null;

  async connect() {
    if (!this.ethereum) {
      return;
    }

    await this.ethereum.enable();
    this.web3 = new Web3(this.ethereum || 'ws://localhost:8545');
  }

  get isConnected(): boolean {
    return this.web3 !== null;
  }

  async mounted() {
    this.ethereum = (<any>window).ethereum;
  }
}
</script>

<style></style>
