import chalk from "chalk";
import type { HardhatRuntimeEnvironment } from "hardhat/types";

const WAIT_BLOCKS = 5;
const VERIFY_TASK = "verify";

export const verify = async (
  { network, config, run, ethers }: HardhatRuntimeEnvironment,
  contractAddress: string,
  deployTxHash: string,
  args: unknown[]
): Promise<void> => {
  if (
    network.name === "hardhat" ||
    network.name === "localhost" ||
    !config.etherscan?.apiKey
  ) {
    return console.log(chalk.bold.yellow("No need to verify."));
  }

  try {
    console.log(
      chalk.bold.yellow(`Waiting ${WAIT_BLOCKS} blocks after deployment.`)
    );

    const tx = await ethers.provider.getTransaction(deployTxHash);
    await tx.wait(WAIT_BLOCKS);

    console.log(chalk.bold.yellow("Verifying..."));

    await run(VERIFY_TASK, {
      address: contractAddress,
      constructorArguments: args,
    });

    console.log(chalk.bold.green("Verified."));
  } catch (e) {
    if (
      e instanceof Error &&
      e.message.toLowerCase().includes("already verified")
    ) {
      console.log(chalk.bold.red(e.message));
      return console.log(chalk.bold.green("Already verified."));
    }
    throw e;
  }
};
