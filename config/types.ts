export type EnvVars = {
  ALCHEMY_KEY?: string;
  INFURA_KEY?: string;
  OPTIMIZER: boolean;
  REPORT_GAS: boolean;
  PRIVATE_KEY: string;
  ETHERSCAN_KEY?: string;
  FORKING_NETWORK?: string;
};

export enum Networks {
  MAIN = "main",
  GOERLI = "goerli",
  BSC = "bsc",
  BSC_TESTNET = "bsc_testnet",
  SEPOLIA = "sepolia",
  MUMBAI = "mumbai",
  POLYGON = "polygon",
  ARBITRUM = "arbitrum",
  HARDHAT = "hardhat",
}

export type NetworkConfig = {
  url: string;
  accounts: string[];
  chainId: number;
  live?: boolean;
  saveDeployments?: boolean;
};

export type BaseNetworkConfig = Omit<NetworkConfig, "url">;

export interface ForkedNetworkConfig extends BaseNetworkConfig {
  forking: {
    url: string;
  };
}
