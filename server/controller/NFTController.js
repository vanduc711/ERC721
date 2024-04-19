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

const listenToContractEvents = async (req, res) => {
    const eventName = req.body.events;
    try {
        contractERC721.events[eventName]({
            fromBlock: 0
        })
            .on('data', function (event) {
                console.log(event);
            })
    } catch (error) {
        console.error('Lỗi khi quét token IDs:', error);
    }
}

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

const scanAllTokenIds = async () => {
    try {
        contractERC721.getPastEvents('Minted', {
            fromBlock: 0,
            toBlock: 'latest'
        })
            .on('data', function (event) {
                const tokenId = event.returnValues.tokenId;
                console.log('Token ID:', tokenId);
            })
            contractERC721.getPastEvents('Burned', {
                fromBlock: 0,
                toBlock: 'latest'
            })
                .on('data', function (event) {
                    const tokenId = event.returnValues.tokenId;
                    console.log('Token ID:', tokenId);
                })
    } catch (error) {
        console.error('Lỗi khi quét token IDs:', error);
    }
}

const transfer = async (req, res) => {
    const toAddress = req.body.address;
    const tokenId = req.body.tokenId;
    try {

        const gasPrice = await web3.eth.getGasPrice();
        const ownerPrivateKey = `0x${process.env.PRIVATE_KEY}`;
        const ownerAccount = web3.eth.accounts.privateKeyToAccount(ownerPrivateKey);
        web3.eth.accounts.wallet.add(ownerAccount);

        const tx = await contractERC721.methods.transferNFT(toAddress, tokenId)
            .send({
                from: ownerAccount.address,
                gasPrice: gasPrice
            });

        return res.status(200).json(tx.transactionHash);

    } catch (error) {
        return res.status(500).json(error);
    }
}

module.exports = { burnNFT, scanAllTokenIds, mintNFT, listenToContractEvents, transfer };