import { ethers } from "hardhat";
import * as fs from "fs";

async function main() {
    // Déployer le contrat NFT
    const NFTFactory = await ethers.getContractFactory("NFTFactory");
    const nftFactory = await NFTFactory.deploy();
    await nftFactory.deploymentTransaction()?.wait();
    console.log("NFTFactory deployed to:", nftFactory.target);

    // Optionnel: Déployer un contrat NFT initial pour tester
    const NFT = await ethers.getContractFactory("NFT");
    const nft = await NFT.deploy("MyNFT", "MNFT");
    await nft.deploymentTransaction()?.wait();
    console.log("NFT deployed to:", nft.target);
}

// On gère les erreurs de manière asynchrone
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});