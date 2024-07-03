import {
    time,
    loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import hre from "hardhat";
//import { BigNumber } from "ethers";

describe("Lock", function () {
    // Compile contracts before testing
    async function context() {
        // Contracts are deployed using the first signer/account by default
        const [owner, otherAccount] = await hre.ethers.getSigners();

        const Factory = await hre.ethers.getContractFactory("NFTFactory");
        const factoryDeployed = await Factory.deploy();

        return { factoryDeployed, owner, otherAccount };
    }

    describe("NFT Generation", function () {
        it("Check if the right data has been registered", async function () {

            const {factoryDeployed, owner} = await loadFixture(context);
            await factoryDeployed.generateNFT("Nom", "Symbol");
            expect(await factoryDeployed.getNFTNameById(0)).to.equal("Nom");
        });

        /*it("Check if ID Market increments well", async function() {
            const {factoryDeployed, owner} = await loadFixture(context);
            expect(await factoryDeployed.getIdMarket()).to.equal(0);

            await factoryDeployed.generateNFT("Nom", "Symbol");

            const price = BigNumber.from(100000);
            await factoryDeployed.sell(price,);

            expect()
        })*/
    });
});
