const { contractERC721 } = require('../config/contractERC721');

const scanAllTokenIds = async () => {
    try {
        contractERC721.events.Minted({
            fromBlock: 0
        })
        .on('data', function(event) {
            const tokenId = event.returnValues.tokenId;
            console.log('Token ID:', tokenId);
        })
    } catch (error) {
        console.error('Lỗi khi quét token IDs:', error);
    }
}

module.exports = { scanAllTokenIds };
