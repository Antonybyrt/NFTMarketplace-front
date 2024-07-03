import { ethers } from "hardhat";
import * as fs from "fs";

async function main() {
    // Déployer le contrat NFT
    const NFTFactory = await ethers.getContractFactory("NFT");
    const nft = await NFTFactory.deploy("MyNFT", "MNFT");
    await nft.deploymentTransaction()?.wait();
    console.log("NFT deployed to:", nft.target);

    updateEnvFile("ADDRESS_CONTRACT", nft.target);
}

function updateEnvFile(key: any, value: any) {
    const envFilePath = '../.env';
    let envConfig = fs.existsSync(envFilePath) ? fs.readFileSync(envFilePath, "utf-8") : "";

    const envVarRegex = new RegExp(`^${key}=.*`, "m");
    const newEnvVar = `${key}="${value}"`;

    if (envVarRegex.test(envConfig)) {
        envConfig = envConfig.replace(envVarRegex, newEnvVar);
    } else {
        envConfig += `\n${newEnvVar}\n`;
    }

    fs.writeFileSync(envFilePath, envConfig);
}

// On gère les erreurs de manière asynchrone
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});