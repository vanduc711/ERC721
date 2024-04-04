const { contractERC721, web3 } = require('../config/contractERC721')
require('dotenv').config();

const burnNFT = async (req, res) => {
    const tokenId = req.body.tokenId;
    try {

        const gasPrice = await web3.eth.getGasPrice();
        const ownerPrivateKey = `0x${process.env.PRIVATE_KEY}`;
        const ownerAccount = web3.eth.accounts.privateKeyToAccount(ownerPrivateKey);
        web3.eth.accounts.wallet.add(ownerAccount);

        const tx = await contractERC721.methods.burn(tokenId)
            .send({
                from: ownerAccount.address,
                gasPrice: gasPrice
            });

        return res.status(200).json(tx.transactionHash);

    } catch (error) {
        return res.status(500).json(error);
    }
}

module.exports = { burnNFT };