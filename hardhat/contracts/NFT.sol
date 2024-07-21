// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract NFT is ERC721 {
    struct NFTData {
        string name;
        string symbol;
        string tokenURI;
        uint256 tokenId;
    }

    NFTData[] public nfts;
    event NFTAdded(uint256 tokenId, string name, string symbol, string tokenURI);

    constructor(string memory name, string memory symbol) ERC721(name, symbol) {}

    function mint(address to, string memory name, string memory symbol, string memory tokenURI) public {
        uint256 tokenId = nfts.length;
        _mint(to, tokenId);
        nfts.push(NFTData({name: name, symbol: symbol, tokenURI: tokenURI, tokenId: tokenId}));
        emit NFTAdded(tokenId, name, symbol, tokenURI);
    }

    function getNFTs() public view returns (string[] memory names, string[] memory symbols) {
        names = new string[](nfts.length);
        symbols = new string[](nfts.length);
        for (uint256 i = 0; i < nfts.length; i++) {
            names[i] = nfts[i].name;
            symbols[i] = nfts[i].symbol;
        }
        return (names, symbols);
    }

    function transferFrom(address from, address to, uint256 tokenId) public override {
        super.transferFrom(from, to, tokenId);
    }
}
