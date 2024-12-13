import {
    time,
    loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import hre from "hardhat";
import { utils } from "ethers";

describe("NFTFactory", function () {
    // Compile contracts before testing
    async function context() {
        // Contracts are deployed using the first signer/account by default
        const [owner, otherAccount] = await hre.ethers.getSigners();

        const Factory = await hre.ethers.getContractFactory("NFTFactory");
        const factoryDeployed = await Factory.deploy();

        return { factoryDeployed, owner, otherAccount };
    }

    describe("Create Collection", function (){
        it("Check if the collection has been register in the list", async function(){
            const {factoryDeployed, owner} = await loadFixture(context);

            // Créer la Collection
            await factoryDeployed.createCollection("RyukCollection","RKC");

            // Vérifie que la Collection a bien été ajouter a  la liste de Collections
            expect((await factoryDeployed.getCollections()).length).to.equal(1);
        });
        it("Check if the collection has been created with the good name", async function(){
            const {factoryDeployed, owner} = await loadFixture(context);

            // Créer la Collection
            await factoryDeployed.createCollection("RyukCollection","RKC");

            // Vérifie que le nom de la Collection que l'on vient de rajouter est bien le bon
            expect((await factoryDeployed.getCollections())[0].name).to.equal("RyukCollection");
        });
        it("Check if the collection has been created with the good symbol", async function(){
            const {factoryDeployed, owner} = await loadFixture(context);

            // Créer la Collection
            await factoryDeployed.createCollection("RyukCollection","RKC");

            // Vérifie que le symbol de la Collection que l'on vient de rajouter est bien le bon
            expect((await factoryDeployed.getCollections())[0].symbol).to.equal("RKC");
        });
        it("Check if the Collection not Listed", async function () {
            const {factoryDeployed,owner} = await loadFixture(context);

            // Créer la Collection
            await factoryDeployed.createCollection("RyukCollection","RKC");

            // Récupérez l'adresse de la collection
            const collections = await factoryDeployed.getCollections();
            const addressCollection = collections[0].collectionAddress;

            // Vérifie si la Collection n'est pas Listée
            expect(await factoryDeployed.getAlreadyListed(addressCollection)).to.equal(false);
        });
    });

    describe("Interact with the Collection", function () {
        /*
            IMPORTANT : Format de retour de getNFTsInCollection = [ [name1,name2,...],[symbol1,symbol2,...]]
         */
        describe("Add NFT in the list of the Collection", function(){
            it("Check if the NFT has been added in the list of the Collection", async function(){
                const {factoryDeployed, owner} = await loadFixture(context);
                // Créez la collection
                await factoryDeployed.createCollection("RyukCollection","RKC");

                // Récupérez l'adresse de la collection
                const collections = await factoryDeployed.getCollections();
                const addressCollection = collections[0].collectionAddress;

                // Ajoutez un NFT à la collection
                await factoryDeployed.addNFTToCollection(addressCollection, "RyukSpicyDonut", "RSD", "ryukspicydonut");

                // Vérifiez que le NFT a été ajouté à la collection
                const nftsInCollection = await factoryDeployed.getNFTsInCollection(addressCollection);
                expect(nftsInCollection[0].length).to.equal(nftsInCollection[1].length).to.equal(1);
            });

            it("Check if the NFT has been added in the list of the Collection with the good name", async function(){
                const {factoryDeployed, owner} = await loadFixture(context);
                // Créez la collection
                await factoryDeployed.createCollection("RyukCollection","RKC");

                // Récupérez l'adresse de la collection
                const collections = await factoryDeployed.getCollections();
                const addressCollection = collections[0].collectionAddress;

                // Ajoutez un NFT à la collection
                await factoryDeployed.addNFTToCollection(addressCollection, "RyukSpicyDonut", "RSD", "ryukspicydonut");

                // Vérifiez que le NFT a été ajouté à la collection avec le bon nom
                const nftsInCollection = await factoryDeployed.getNFTsInCollection(addressCollection);
                expect(nftsInCollection[0][0]).to.equal("RyukSpicyDonut");
            });

            it("Check if the NFT has been added in the list of the Collection with the good symbol", async function(){
                const {factoryDeployed, owner} = await loadFixture(context);
                // Créez la collection
                await factoryDeployed.createCollection("RyukCollection","RKC");

                // Récupérez l'adresse de la collection
                const collections = await factoryDeployed.getCollections();
                const addressCollection = collections[0].collectionAddress;

                // Ajoutez un NFT à la collection
                await factoryDeployed.addNFTToCollection(addressCollection, "RyukSpicyDonut", "RSD", "ryukspicydonut");

                // Vérifiez que le NFT a été ajouté à la collection avec le bon symbol
                const nftsInCollection = await factoryDeployed.getNFTsInCollection(addressCollection);
                expect(nftsInCollection[1][0]).to.equal("RSD");
            });
        });
        /*
        describe("Listed the Collection in the Market", function (){
            it("Check if the Collection has been Listed after the offer of sale", async function () {
                const { factoryDeployed,owner } = await loadFixture(context);

                // Créez la collection
                await factoryDeployed.createCollection("RyukCollection", "RKC");

                // Récupérez l'adresse de la collection
                const collections = await factoryDeployed.getCollections();
                const addressCollection = collections[0].collectionAddress;

                // Ajout de l'offre de vente de la Collection
                const price  = 100000;
                await factoryDeployed.sell(price, addressCollection, 1);

                // Vérifie que l'offre est bien listée
                const isListed: boolean = await factoryDeployed.getAlreadyListed(addressCollection);
                expect(isListed).to.equal(true);
            });
        });
        */
    });

});
