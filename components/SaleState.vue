<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8" lg="6">
        <v-card elevation="20" class="text-center">
          <v-card-title class="primary white--text text-center">
            <v-container class="pa-0" fluid>
              <h2 class="text-center">{{ header }}</h2>
            </v-container>
          </v-card-title>

          <div v-if="contractState.saleState === SaleState.Pending">
            <h4 class="mb-5">{{ formattedPreSaleStartDate }} UTC</h4>
            <Countdown :countDownDate="preSaleStartDate" />
            <div class="body1 mb-3">
              Jion our Discord server, follow us on social media or add it to
              your calendar to get a reminder.
            </div>
            <v-btn
              color="primary ma-2"
              href="http://discord.gg/mW6pNkR4zs"
              target="_blank"
            >
              <v-icon left>mdi-discord </v-icon>
              Join Discord</v-btn
            >
            <v-btn color="primary ma-2" @click="downloadICS">
              <v-icon left>mdi-calendar</v-icon>
              Add to Calendar</v-btn
            >
          </div>
          <div
            v-if="
              contractState.saleState === SaleState.PreSaleOpen ||
              contractState.saleState === SaleState.SaleOpen
            "
          >
            <v-card-text>
              <div class="mt-4 text-subtitle-1">Price: {{ price }} ETH</div>
              <div class="mb-4 text-subtitle-1">
                Gas Price: {{ gasPrice }} ETH
              </div>

              <div v-if="isMintPage">
                You probably know how this works by now but here it is again.
                After you click on the Mint button your wallet should open and
                you will need to sign the transaction.
              </div>
            </v-card-text>
            <v-divider class="mx-4 mb-5"></v-divider>
            <v-container>
              <v-progress-linear
                v-model="totalSupply"
                color="secondary"
                height="35"
                rounded
              >
                <template v-slot:default="{ value }">
                  <strong>{{ value }} / {{ currentSupply }}</strong>
                </template>
              </v-progress-linear>
              <div>
                <slot></slot>
              </div>
            </v-container>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { parseISO, format } from 'date-fns';
import icsFormatter from '../utils/icsFormatter';
import { SaleState, ContractState } from '../utils/Web3Helper';
import Web3 from 'web3';

const SaleSateComponentProps = Vue.extend({
  props: {
    contractState: Object,
    isMintPage: Boolean,
  },
});

@Component
export default class SaleSateComponent extends SaleSateComponentProps {
  SaleState = SaleState;
  preSaleStartDate = parseISO('2021-11-07T19:00:00');

  get formattedPreSaleStartDate() {
    return format(this.preSaleStartDate, 'dd MMMM yyyy HH:mm');
  }

  get header(): string {
    switch (this.contractState.saleState) {
      case SaleState.Pending:
        return 'Pre-sale starting on:';
      case SaleState.PreSaleOpen:
        return 'Pre-sale is Open!';
      case SaleState.SaleOpen:
        return 'Public sale is Open!';
      case SaleState.Paused:
        return 'Sale is paused.';
      case SaleState.Closed:
        return "We're Sold Out!";
      default:
        return "Hmmm, something's wrong.";
    }
  }

  get price(): string {
    switch (this.contractState.saleState) {
      case SaleState.PreSaleOpen:
        return Web3.utils.fromWei(this.contractState.preSalePrice).toString();
      case SaleState.Pending:
      case SaleState.SaleOpen:
      case SaleState.Paused:
      case SaleState.Closed:
        return Web3.utils.fromWei(this.contractState.salePrice).toString();
      default:
        return '0';
    }
  }

  get gasPrice(): string {
    return Web3.utils.fromWei(this.contractState.gasPrice).toString();
  }

  get totalSupply(): number {
    return Number(this.contractState.totalSupply.toString());
  }

  get currentSupply(): string {
    switch (this.contractState.saleState) {
      case SaleState.PreSaleOpen:
        return this.contractState.preSaleSupply;
      case SaleState.Pending:
      case SaleState.SaleOpen:
      case SaleState.Paused:
      case SaleState.Closed:
        return this.contractState.maxSupply;
      default:
        return '0';
    }
  }

  downloadICS() {
    const calEntry = icsFormatter();

    if (!calEntry) {
      return;
    }

    const title = 'Octodoodles Pre-sale Launch';
    var place = 'https://octodoodles.com';
    var begin = this.preSaleStartDate;
    var end = new Date(begin.getTime() + 30 * 60000);

    var description =
      'Hey doodler! Octodoodles pre-sale starts. The first 2000 Octodoodle tokens can be minted for 0.04 ETH. Join Discord or see website for more details. Thanks for the interest and hope you enjoy your Octodoodle(s)!';

    calEntry.addEvent(
      title,
      description,
      place,
      begin.toUTCString(),
      end.toUTCString()
    );
    calEntry.download('Octodoodle_Presale', 'ics');
  }
}
</script>
<style lang="scss">
.mint {
  display: flex;
  justify-content: center;
}
</style>
