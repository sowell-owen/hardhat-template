import type { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-ethers";

import "./tasks/tasks";

import { getEnvVars } from "./config/getEnvVars";
import { getNetworkConfig } from "./config/getNetworkConfig";

import "hardhat-gas-reporter";
import "hardhat-contract-sizer";

const { OPTIMIZER, REPORT_GAS, ETHERSCAN_KEY } = getEnvVars();

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.8.17",
        settings: {
          optimizer: {
            enabled: OPTIMIZER,
            runs: 200,
          },
        },
      },
    ],
  },
  networks: {
    main: getNetworkConfig("main"),
    goerli: getNetworkConfig("goerli"),
    testnet: getNetworkConfig("testnet"),
  },
  contractSizer: {
    runOnCompile: OPTIMIZER,
  },
  gasReporter: {
    enabled: REPORT_GAS,
  },
  etherscan: {
    apiKey: ETHERSCAN_KEY,
  },
};

export default config;
