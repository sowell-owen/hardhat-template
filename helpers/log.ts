import colors from "colors";

type LogType = {
  deploy: (contractName: string, contractAddress: string) => void;
  preDeploy: (contractName: string) => void;
};

const prettyDeploy = (contractName: string, contractAddress: string) => {
  console.log(
    colors.bold(colors.green(`🌐 ${contractName} successfully deployed.`))
  );

  console.log(colors.bold(colors.yellow("Address:")), contractAddress);
};

const prettyPreDeploy = (contractName: string) => {
  console.log("⌛ Deploying", colors.bold(colors.green(contractName)) + "...");
};

export const log: LogType = {
  deploy: prettyDeploy,
  preDeploy: prettyPreDeploy,
};
