import type { HardhatRuntimeEnvironment } from "hardhat/types";

export const setBalance = async (
  hre: HardhatRuntimeEnvironment,
  address: string,
  hexBalance: string
) => {
  await hre.network.provider.send("hardhat_setBalance", [address, hexBalance]);
};
