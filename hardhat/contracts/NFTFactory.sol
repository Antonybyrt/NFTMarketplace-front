// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import {NFT} from "./NFT.sol";

contract NFTFactory {

    struct Collection {
        address collectionAddress;
        string name;
        string symbol;
        address owner;
    }

    Collection[] public collections;

    event CollectionCreated(address collectionAddress, string name, string symbol);
    event Debug(string message);
    event NFTMinted(address collectionAddress, uint256 tokenId, string name, string symbol, address owner);

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

    function createCollection(string memory name, string memory symbol) public {
        emit Debug("createCollection started");
        NFT newCollection = new NFT(name, symbol);
        collections.push(Collection({
            collectionAddress: address(newCollection),
            name: name,
            symbol: symbol,
            owner: msg.sender
        }));
        emit CollectionCreated(address(newCollection), name, symbol);
        emit Debug("createCollection finished");
    }

    function addNFTToCollection(address collectionAddress, string memory name, string memory symbol) public {
        bool found = false;
        for (uint256 i = 0; i < collections.length; i++) {
            if (collections[i].collectionAddress == collectionAddress && collections[i].owner == msg.sender) {
                found = true;
                break;
            }
        }
        require(found, "Collection not found or not owned by sender");

        NFT nftInstance = NFT(collectionAddress);
        uint256 newTokenId = nftInstance.mint(msg.sender, name, symbol);

        emit NFTMinted(collectionAddress, newTokenId, name, symbol, msg.sender);
    }

    function getCollections() public view returns (Collection[] memory) {
        return collections;
    }

    function getNFTsInCollection(address collectionAddress) public view returns (string[] memory names, string[] memory symbols) {
        NFT nftInstance = NFT(collectionAddress);
        return nftInstance.getNFTs();
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
        idMarket++;

        NFT nftInstance = NFT(collection);
        nftInstance.transferFrom(msg.sender, address(this), tokenId);
    }

    function buy(uint256 marketId) public payable {
        require(marketId < idMarket, "Invalid market ID");
        require(!market[marketId].locked, "NFT already sold");

        Listed storage listedNFT = market[marketId];

        require(msg.value >= listedNFT.price, "Insufficient funds to purchase NFT");

        listedNFT.locked = true;

        payable(listedNFT.seller).transfer(listedNFT.price);

        NFT nftInstance = NFT(listedNFT.collection);
        nftInstance.transferFrom(address(this), msg.sender, marketId);

        emit Debug("NFT purchased successfully");
    }
}
