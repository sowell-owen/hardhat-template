import * as dotenv from "dotenv";

import type { EnvVars } from "./types";
dotenv.config();

export const getEnvVars = (): EnvVars => {
  return {
    ALCHEMY_KEY: process.env.ALCHEMY_KEY || "",
    INFURA_KEY: process.env.INFURA_KEY || "",
    OPTIMIZER: process.env.OPTIMIZER === "true",
    REPORT_GAS: process.env.REPORT_GAS === "true",
    PRIVATE_KEY: process.env.PRIVATE_KEY || "",
    ETHERSCAN_KEY: process.env.ETHERSCAN_KEY || "",
    FORKING_NETWORK: process.env.FORKING_NETWORK || "",
  };
};
