// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import {NFT} from "./NFT.sol";

contract NFTFactory {

    NFT[] public list;

    event createdNFT(address adresse, string name, string symbol);
    event Debug(string message);

    struct Listed {
        uint256 price;
        address seller;
        address collection;
        uint256 timestamp;
        bool locked;
    }

    mapping(uint256 => Listed) public market;

    uint256 public idMarket;

    error ALREADY_LISTED(address collection);

    constructor() {}

    function generateNFT(string memory name, string memory symbol) public {
        emit Debug("generateNFT started");
        NFT newNFT = new NFT(name, symbol);
        list.push(newNFT);
        emit createdNFT(address(newNFT), name, symbol);
        emit Debug("generateNFT finished");
    }

    function getNFT () public view returns (NFT[] memory){
        NFT[] memory tmpList = new NFT[](list.length);
        for (uint i = 0; i < list.length; i ++) {
            tmpList[i] = list[i];
        }

        return tmpList;
    }

    function getNFTNameById (uint256 id) public view returns (string memory){
        return list[id].name();
    }

    function getIdMarket() public view returns(uint256) {
        return idMarket;
    }

    function getAlreadyListed (address collection) public view returns (bool){
        for (uint i = 0; i < idMarket; i ++) {
            if(market[i].collection == collection) {
                return true;
            }
        }

        return false;
    }

    function sell(uint256 price, address collection, uint256 tokenId) public {
        if(getAlreadyListed(collection) == true) {
            revert ALREADY_LISTED(collection);
        }
        market[idMarket] = Listed(price, msg.sender, collection, block.timestamp, false);
        idMarket ++;

        NFT nftInstance = NFT(collection);
        nftInstance.transferFrom(msg.sender, address(this), tokenId);
    }

}