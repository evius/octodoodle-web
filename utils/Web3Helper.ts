import Web3 from 'web3';
import BN from 'bn.js';

const CONTRACT_ADDRESS = '0x595A24C6b3420ED9026EF470f5fE88abD3D0AD0B';

export enum SaleState {
  Pending,
  PreSaleOpen,
  SaleOpen,
  Paused,
  Closed,
}

export interface ContractState {
  maxSupply: BN;
  preSaleSupply: BN;
  totalSupply: BN;
  preSalePrice: BN;
  salePrice: BN;
  saleState: SaleState;
  gasPrice: BN;
  maxMintableTokens: number;
}

export class Web3Helper {
  private _web3: Web3 | null = null;
  private accounts: string[] = [];

  get ethereum(): any {
    return (<any>window).ethereum;
  }

  get canConnect(): boolean {
    return typeof this.ethereum !== 'undefined';
  }

  get networkVersion(): string | null {
    if (this.canConnect) {
      return this.ethereum.networkVersion;
    }

    return null;
  }

  get selectedAddress(): string | null {
    if (this.canConnect) {
      return this.ethereum.selectedAddress;
    }

    return null;
  }

  get web3() {
    if (!this._web3) {
      this._web3 = new Web3(this.ethereum || 'ws://localhost:8545');
    }

    return this._web3;
  }

  async getContractProperty(
    property: string,
    solidityReturnType: string
  ): Promise<any> {
    const value = await this.web3.eth.call({
      to: CONTRACT_ADDRESS,
      data: this.web3.eth.abi.encodeFunctionCall(
        {
          name: property,
          type: 'function',
          inputs: [],
        },
        []
      ),
    });

    return this.web3.eth.abi.decodeParameter(solidityReturnType, value);
  }

  async getMaxSupply(): Promise<BN> {
    return this.web3.utils.toBN(
      await this.getContractProperty('maxSupply', 'uint256')
    );
  }

  async getPreSaleSupply(): Promise<BN> {
    return this.web3.utils.toBN(
      await this.getContractProperty('preSaleSupply', 'uint256')
    );
  }

  async getTotalSupply(): Promise<BN> {
    return this.web3.utils.toBN(
      await this.getContractProperty('totalSupply', 'uint256')
    );
  }

  async getPreSalePrice(): Promise<BN> {
    return this.web3.utils.toBN(
      await this.getContractProperty('preSalePrice', 'uint256')
    );
  }

  async getSalePrice(): Promise<BN> {
    return this.web3.utils.toBN(
      await this.getContractProperty('salePrice', 'uint256')
    );
  }

  async getSaleState(): Promise<number> {
    return Number(await this.getContractProperty('saleState', 'uint8'));
  }

  async getGasPrice(): Promise<BN> {
    return this.web3.utils.toBN(await this.web3.eth.getGasPrice());
  }

  async getMaxMintableTokens(): Promise<number> {
    return Number(
      await this.getContractProperty('MAX_MINTABLE_TOKENS', 'uint8')
    );
  }

  async getContractState(): Promise<ContractState> {
    return {
      maxSupply: await this.getMaxSupply(),
      preSaleSupply: await this.getPreSaleSupply(),
      totalSupply: await this.getTotalSupply(),
      preSalePrice: await this.getPreSalePrice(),
      salePrice: await this.getSalePrice(),
      saleState: <SaleState>await this.getSaleState(),
      gasPrice: await this.getGasPrice(),
      maxMintableTokens: await this.getMaxMintableTokens(),
    };
  }

  get isConnected(): boolean {
    return this.selectedAddress !== null;
  }

  async connect(): Promise<void> {
    if (this.canConnect) {
      this.accounts = await this.ethereum.request({
        method: 'eth_requestAccounts',
      });
    }
  }

  async getMintParameters(quantity: number) {
    const contractState = await this.getContractState();

    if (
      !(
        contractState.saleState === SaleState.PreSaleOpen ||
        contractState.saleState === SaleState.SaleOpen
      )
    ) {
      throw Error('Sale is not open.');
    }

    let price = null;

    if (contractState.saleState === SaleState.PreSaleOpen) {
      price = contractState.preSalePrice;
    } else if (contractState.saleState === SaleState.SaleOpen) {
      price = contractState.salePrice;
    }

    if (!price) {
      throw Error('Unknown error');
    }

    return {
      to: CONTRACT_ADDRESS, // Required except during contract publications.
      from: this.ethereum.selectedAddress, // must match user's active address.
      value: this.web3.utils.toHex(
        this.web3.utils.toBN(quantity).mul(price).toString()
      ),
      data: this.web3.eth.abi.encodeFunctionCall(
        {
          name: 'mintFromPublic',
          type: 'function',
          inputs: [
            {
              type: 'uint8',
              name: 'quantity',
            },
          ],
        },
        [quantity.toString()]
      ),
    };
  }

  async mint(quantity: number): Promise<string> {
    if (!this.isConnected) {
      throw Error('Not connected to wallet.');
    }

    console.info(`Minting ${quantity} tokens`);

    const transactionParams = await this.getMintParameters(quantity);
    console.info('Sending transaction with: ', transactionParams);

    const txHash = await this.ethereum.request({
      method: 'eth_sendTransaction',
      params: [transactionParams],
    });

    return txHash;
  }

  async getTransactionBlockNumber(txHash: string): Promise<number | null> {
    const transaction = await this.web3.eth.getTransaction(txHash);

    return transaction.blockNumber;
  }
}
