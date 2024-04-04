const { ethers } = require("hardhat");

async function main() {

    const [deployer] = await ethers.getSigners();
    console.log('deploy from address: ', deployer.address);
    const MyNFT = await ethers.getContractFactory("MyNFT");
    const myNft = await MyNFT.deploy(deployer.address);
    await myNft.waitForDeployment();
    
    console.log("Contract at address: " + (await myNft.getAddress()).toString())
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })