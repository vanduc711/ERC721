const { ethers } = require("hardhat");
const { expect } = require("chai");
const { loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers");

describe("Deployment Contract NFT", function () {

    async function deployTokenFixture() {

        const [owner, addr1, addr2] = await ethers.getSigners();
        const MyNFT = await ethers.getContractFactory("MyNFT");
        const myNft = await MyNFT.deploy(owner.address);
        await myNft.waitForDeployment()
        return { myNft, owner, addr1, addr2 };
    }

    describe("MyNFT", function () {

        it("Should set the right owner", async function () {
            const { myNft, owner } = await loadFixture(deployTokenFixture);
            expect(await myNft.owner()).to.equal(owner.address);
        });

        it("Should allow safeMint NFT by the owner", async function () {
            const { myNft, addr1 } = await loadFixture(deployTokenFixture);
            const tokenId = 1;
            const uri = "https://example.com/nft1";
            await myNft.safeMint(addr1, tokenId, uri);
            const owner = await myNft.ownerOf(tokenId);

            expect(owner).to.equal(addr1.address);

            const tokenURI = await myNft.tokenURI(tokenId);
            expect(tokenURI).to.equal(uri);
        });

        it("Should failure if safeMint NFT are not the owner", async function () {
            const { myNft, addr1, addr2 } = await loadFixture(deployTokenFixture);
            const tokenId = 1;
            const uri = "https://example.com/nft1";
            expect(myNft.connect(addr1).safeMint(addr2, tokenId, uri)).to.be.revertedWithCustomError;
        })

        it("Should allow burn NFT by the owner", async function () {
            const { myNft, addr1 } = await loadFixture(deployTokenFixture);
            const tokenId = 1;
            const uri = "https://example.com/nft1";
            await myNft.safeMint(addr1, tokenId, uri);

            expect(await myNft.connect(addr1).burn(tokenId));
        })

        it("Should failure burn NFT are not the owner", async function () {
            const { myNft, addr1, addr2 } = await loadFixture(deployTokenFixture);
            const tokenId = 1;
            const uri = "https://example.com/nft1";
            await myNft.safeMint(addr1, tokenId, uri);

            await expect(myNft.connect(addr2).burn(tokenId)).to.be.revertedWith("You are not the owner");
        })

        it("Should allow transferNFT by the owner", async function () {
            const { myNft, addr1, addr2 } = await loadFixture(deployTokenFixture);
            const tokenId = 1;
            const uri = "https://example.com/nft1";
            await myNft.safeMint(addr1, tokenId, uri);
            
            const tx = await myNft.connect(addr1).transferNFT(addr2.address, tokenId);
        
            await expect(tx).to.emit(myNft, 'Transfer')
                .withArgs(addr1.address, addr2.address, tokenId);
        })

    })
})