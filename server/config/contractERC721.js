const { Web3 } = require('web3');
const web3 = new Web3("https://sepolia.infura.io/v3/c2286ad6cfd043b49409d5f51f4c8157");
require('dotenv').config();
const contractABI = require('../contracts/MyNFT.json');

const contractAddress = process.env.CONTRACT_ADDRESS;

const contractERC721 = new web3.eth.Contract(contractABI, contractAddress)

module.exports = {contractERC721, web3};