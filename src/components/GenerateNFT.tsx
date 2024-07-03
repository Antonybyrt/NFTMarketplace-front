import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import NFTFactoryABI from '../../hardhat/artifacts/contracts/NFT.sol/NFT.json';
import {config} from "dotenv";
config();

const CONTRACT_ADDRESS = process.env.ADDRESS_CONTRACT;

const GenerateNFT: React.FC = () => {
    const { signer } = metamaskConnect();
    const [nftName, setNftName] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const generateNFT = async () => {
        if (!signer) return;
        if (!CONTRACT_ADDRESS) {
            setError("L'adresse du contrat n'est pas définie.");
            return;
        }

        try {
            const contract = new ethers.Contract(CONTRACT_ADDRESS, NFTFactoryABI.abi, signer);
            await contract.generateNFT("Nom", "Symbol");
            const name = await contract.getNFTNameById(0);
            setNftName(name);
        } catch (err) {
            console.error(err);
            setError("Erreur lors de la génération du NFT.");
        }
    };

    return (
        <div>
            <button onClick={generateNFT}>Generate NFT</button>
            {nftName && <div>NFT Name: {nftName}</div>}
        </div>
    );
};

export default GenerateNFT;