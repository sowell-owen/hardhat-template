import type { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-ethers";

import { getEnvVars } from "./config/getEnvVars";
import {
  getHardhatNetworkConfig,
  getNetworkConfig,
} from "./config/getNetworkConfig";
import "hardhat-deploy";
import "hardhat-gas-reporter";
import "hardhat-contract-sizer";
import "hardhat-docgen";
import "hardhat-watcher";
import { Networks } from "./config/types";

const { OPTIMIZER, REPORT_GAS, ETHERSCAN_KEY, FORKING_NETWORK } = getEnvVars();

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
  namedAccounts: {
    deployer: 0,
  },
  paths: {
    deploy: "deploy/",
    deployments: "deployments/",
  },
  networks: {
    main: getNetworkConfig(Networks.MAIN),
    goerli: getNetworkConfig(Networks.GOERLI),
    sepolia: getNetworkConfig(Networks.SEPOLIA),
    polygon: getNetworkConfig(Networks.POLYGON),
    mumbai: getNetworkConfig(Networks.MUMBAI),
    bsc: getNetworkConfig(Networks.BSC),
    bsc_testnet: getNetworkConfig(Networks.BSC_TESTNET),
    arbitrum: getNetworkConfig(Networks.ARBITRUM),
    hardhat: getHardhatNetworkConfig(),
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
  docgen: {
    path: "./docs",
    clear: true,
    runOnCompile: true,
  },
  watcher: {
    compilation: {
      tasks: ["compile"],
      files: ["./contracts"],
      verbose: true,
      clearOnStart: true,
      start: "echo Running my compilation task now..",
      runOnLaunch: true,
    },
  },
  external: FORKING_NETWORK
    ? {
        deployments: {
          hardhat: ["deployments/" + FORKING_NETWORK],
          local: ["deployments/" + FORKING_NETWORK],
        },
      }
    : undefined,
};

export default config;
