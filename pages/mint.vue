<template>
  <div>
    <AppBar
      :isMintPage="true"
      :isConnected="isConnected"
      v-on:connect="connect"
    />
    <client-only>
      <SaleState
        v-if="
          contractState && !isWaitingForTransaction && !isTransactionConfirmed
        "
        :contractState="contractState"
        :isMintPage="true"
        class="mt-5"
      >
        <div class="mt-5">
          <div>How many Octodoodles would you like to mint?</div>
          <v-slider
            v-model="numberToMint"
            class="mt-3 align-center"
            :max="contractState.maxMintableTokens"
            :min="1"
            hide-details
            :thumb-size="24"
            thumb-label="always"
          >
            <template v-slot:append>
              <v-text-field
                v-model="numberToMint"
                class="mt-0 pt-0"
                type="number"
                style="width: 50px"
              ></v-text-field>
            </template>
          </v-slider>
          <div>
            <div>Total Price: {{ displayTotalPrice }} ETH</div>
            <div>Estimated Gas: {{ estimatedGas }} ETH</div>
            <div class="mb-3">
              Total (Incl. Gas): {{ displayGrandTotal }} ETH *
            </div>
            <div class="text-caption text-left">
              * Gas price will change when submitting the transaction
            </div>
          </div>
          <div class="my-5" v-if="canConnect && !isConnected">
            <div class="mb-3">Connect your wallet to mint.</div>
            <connect-wallet-button
              :isConnected="isConnected"
              v-on:connect="connect"
            />
          </div>
          <div>
            <v-btn color="primary" outlined width="100" class="ma-3" href="/"
              >Back</v-btn
            >
            <v-btn
              color="primary"
              width="100"
              :disabled="!isConnected"
              @click="mint"
              :loading="isMinting"
              >Mint</v-btn
            >
          </div>
          <div v-if="transactionHash">{{ transactionHash }}</div>
          <div v-if="mintError">{{ mintError }}</div>
        </div>
      </SaleState>
      <v-container v-if="isWaitingForTransaction">
        <v-row justify="center">
          <v-col cols="12" md="8" lg="6">
            <v-card elevation="20" class="text-center">
              <v-card-title class="primary white--text text-center">
                <v-container class="pa-0" fluid>
                  <h2 class="text-center">
                    Your transaction is being processed!
                  </h2>
                </v-container>
              </v-card-title>

              <v-card-text class="mt-5">
                <div class="text-subtitle-1">Transaction Hash:</div>
                <div class="mb-5">
                  <code>{{ this.transactionHash }}</code>
                </div>
                <v-progress-circular
                  indeterminate
                  color="secondary"
                ></v-progress-circular>
                <div class="mt-4">
                  <div class="text-subtitle-1">
                    Confirmed Blocks: {{ displayTransactionConfirmedBlocks }}
                  </div>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
      <v-container v-if="isTransactionConfirmed">
        <v-row justify="center">
          <v-col cols="12" md="8" lg="6">
            <v-card elevation="20" class="text-center">
              <v-card-title class="primary white--text text-center">
                <v-container class="pa-0" fluid>
                  <h2 class="text-center">
                    Your transaction is confirmed! Thank you!
                  </h2>
                </v-container>
              </v-card-title>

              <v-card-text class="mt-5">
                <div class="text-subtitle-1">Transaction Hash:</div>
                <div class="mb-5">
                  <code>{{ this.transactionHash }}</code>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </client-only>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Web3Helper, ContractState, SaleState } from '../utils/Web3Helper';
import Web3 from 'web3';
import BN from 'bn.js';

@Component
export default class MintPage extends Vue {
  web3: Web3Helper | null = null;
  ethereum: any = null;
  contract: any = null;

  contractState: ContractState | null = null;

  numberToMint: number = 5;

  isTransactionConfirmed = false;
  isWaitingForTransaction = false;
  isMinting = false;
  transactionHash: string | null = null;
  mintError: Error | null = null;
  transactionConfirmedBlocks: number | null | undefined = null;
  transactionTimer: NodeJS.Timer | null = null;

  async connect() {
    if (!this.web3) {
      return;
    }

    await this.web3.connect();
  }

  get canConnect(): boolean {
    if (this.web3) {
      return (<any>this.web3).canConnect;
    }

    return false;
  }

  get isConnected(): boolean {
    if (this.web3) {
      return (<any>this.web3).isConnected;
    }

    return false;
  }

  get price(): BN {
    if (!this.contractState) {
      return Web3.utils.toBN('9999');
    }

    switch (this.contractState.saleState) {
      case SaleState.PreSaleOpen:
        return this.contractState.preSalePrice;
      case SaleState.Pending:
      case SaleState.SaleOpen:
      case SaleState.Paused:
      case SaleState.Closed:
        return this.contractState.salePrice;
      default:
        return Web3.utils.toBN('9999');
    }
  }

  get displayPrice(): string {
    return Web3.utils.fromWei(this.price);
  }

  get totalPrice(): BN {
    return this.price.mul(Web3.utils.toBN(this.numberToMint));
  }

  get displayTotalPrice(): string {
    return Web3.utils.fromWei(this.totalPrice);
  }

  get estimatedGas(): BN {
    return Web3.utils.toBN(0);
  }

  get displayEstimatedGas(): string {
    return Web3.utils.fromWei(this.estimatedGas);
  }

  get grandTotal(): BN {
    return this.totalPrice.add(this.estimatedGas);
  }

  get displayGrandTotal(): string {
    return Web3.utils.fromWei(this.grandTotal);
  }

  get displayTransactionConfirmedBlocks(): string {
    if (!this.transactionConfirmedBlocks) {
      return 'Pending';
    }

    return this.transactionConfirmedBlocks.toString();
  }

  async mint() {
    try {
      this.transactionHash = null;
      this.mintError = null;
      this.transactionTimer = null;
      this.isTransactionConfirmed = false;
      this.isWaitingForTransaction = false;
      this.isMinting = true;

      const txHash = await this.web3?.mint(this.numberToMint);
      this.transactionHash = <any>txHash;
      this.isWaitingForTransaction = true;

      this.transactionTimer = setInterval(async () => {
        if (this.transactionHash) {
          this.transactionConfirmedBlocks =
            await this.web3?.getTransactionBlockNumber(this.transactionHash);

          if (
            this.transactionConfirmedBlocks &&
            this.transactionConfirmedBlocks > 6
          ) {
            clearInterval(<any>this.transactionTimer);
            this.isTransactionConfirmed = true;
            this.isWaitingForTransaction = false;
            this.isMinting = false;
          }
        } else {
          clearInterval(<any>this.transactionTimer);
        }
      }, 1000);
    } catch (err: any) {
      this.mintError = err;
    }
  }

  async mounted() {
    this.web3 = new Web3Helper();

    this.contractState = await this.web3.getContractState();

    setInterval(async () => {
      (<any>this.contractState).totalSupply = await this.web3?.getTotalSupply();
      (<any>this.contractState).saleState = await this.web3?.getSaleState();
    }, 5000);
  }
}
</script>

<style></style>
