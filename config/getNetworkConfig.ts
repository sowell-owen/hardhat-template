import { HardhatNetworkUserConfig } from "hardhat/types";

import { getEnvVars } from "./getEnvVars";
import { BaseNetworkConfig, NetworkConfig, Networks } from "./types";

const { ALCHEMY_KEY, INFURA_KEY, PRIVATE_KEY, FORKING_NETWORK } = getEnvVars();

const networkChainIDs: Record<Networks, number> = {
  [Networks.MAIN]: 1,
  [Networks.GOERLI]: 5,
  [Networks.BSC_TESTNET]: 97,
  [Networks.BSC]: 56,
  [Networks.ARBITRUM]: 42161,
  [Networks.POLYGON]: 137,
  [Networks.MUMBAI]: 80001,
  [Networks.SEPOLIA]: 11155111,
  [Networks.HARDHAT]: 31337,
};

type Prfx = "eth" | "polygon" | "arb" | "arbitrum";

const alchemyRpc = (
  network: Networks | "mainnet" = "mainnet",
  prfx: Exclude<Prfx, "arbitrum"> = "eth"
) => `https://${prfx}-${network}.g.alchemy.com/v2/${ALCHEMY_KEY}`;

const infuraRpc = (
  network: Networks | "mainnet" = "mainnet",
  prfx: Extract<Prfx, "polygon" | "arbitrum"> | undefined = undefined
) =>
  !prfx
    ? `https://${network}.infura.io/v3/${INFURA_KEY}`
    : `https://${prfx}-${network}.infura.io/v3/${INFURA_KEY}`;

const ternaryWrapper = (truthy: string, falsy: string) =>
  ALCHEMY_KEY ? truthy : falsy;

const networkRpc: Record<Networks, string> = {
  [Networks.MAIN]: ternaryWrapper(alchemyRpc(), infuraRpc()),
  [Networks.GOERLI]: ternaryWrapper(
    alchemyRpc(Networks.GOERLI),
    infuraRpc(Networks.GOERLI)
  ),
  [Networks.SEPOLIA]: ternaryWrapper(
    alchemyRpc(Networks.SEPOLIA),
    infuraRpc(Networks.SEPOLIA)
  ),
  [Networks.BSC_TESTNET]: "https://data-seed-prebsc-1-s1.binance.org:8545",
  [Networks.BSC]: "https://bsc-dataseed.binance.org/",
  [Networks.MUMBAI]: ternaryWrapper(
    alchemyRpc(Networks.MUMBAI, "polygon"),
    infuraRpc(Networks.MUMBAI, "polygon")
  ),
  [Networks.POLYGON]: ternaryWrapper(
    alchemyRpc("mainnet", "polygon"),
    infuraRpc("mainnet", "polygon")
  ),
  [Networks.ARBITRUM]: ternaryWrapper(
    alchemyRpc("mainnet", "arb"),
    infuraRpc("mainnet", "arbitrum")
  ),
  [Networks.HARDHAT]: "http://localhost:8545",
};

const getBaseNetworkConfig = (network: Networks): BaseNetworkConfig => ({
  chainId: networkChainIDs[network],
  accounts: [PRIVATE_KEY],
});

export const getNetworkConfig = (network: Networks): NetworkConfig => ({
  ...getBaseNetworkConfig(network),
  url: networkRpc[network],
});

export const getHardhatNetworkConfig = (): HardhatNetworkUserConfig => {
  const network = FORKING_NETWORK
    ? (FORKING_NETWORK as Networks)
    : Networks.HARDHAT;

  const hardhatNetworkConfig = {
    ...getBaseNetworkConfig(network),
    saveDeployments: true,
    live: false,
    accounts: [
      {
        privateKey: PRIVATE_KEY,
        balance: "1000000000000000000",
      },
    ],
  };

  if (FORKING_NETWORK) {
    return {
      ...hardhatNetworkConfig,
      forking: {
        url: networkRpc[network],
      },
    };
  }

  return hardhatNetworkConfig;
};
