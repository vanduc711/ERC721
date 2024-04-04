const { contractERC721, web3 } = require('../config/contractERC721')
require('dotenv').config();

const mintNFT = async (req, res) => {
  const toAddress = req.body.address;
  const tokenId = req.body.tokenId;
  const uri = req.body.uri;

  try {
    const gasPrice = await web3.eth.getGasPrice();
    const ownerPrivateKey = `0x${process.env.PRIVATE_KEY}`;
    const ownerAccount = web3.eth.accounts.privateKeyToAccount(ownerPrivateKey);
    web3.eth.accounts.wallet.add(ownerAccount);

    const tx = await contractERC721.methods.safeMint(toAddress, tokenId, uri).send({
      from: ownerAccount.address,
      gasPrice: gasPrice,
  });

    await tx.wait();
    return res.status(200).json(tx.transactionHash);

  } catch (error) {
    return res.status(500).json(tx);
  }
}

module.exports = { mintNFT };
