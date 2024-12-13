export class MetaMaskService {


    static async addNFTToMetaMask(contractAddress: string, tokenId: string | number) {
        if (typeof window.ethereum === 'undefined') {
            console.error('MetaMask is not installed');
            return;
        }

        try {
            const result = await window.ethereum.request({
                method: 'wallet_watchAsset',
                params: {
                    type: 'ERC721',
                    options: {
                        address: contractAddress,
                        tokenId: tokenId.toString(), 
                    },
                },
            });

            if (result) {
                console.log('NFT added to MetaMask');
            } else {
                console.log('NFT not added');
            }
        } catch (error) {
            console.error(error);
        }
    }


}