const { contractERC721 } = require('../config/contractERC721');

const listenToContractEvents = async (req, res) => {
    const eventName = req.body.events;
        try {
            contractERC721.events[eventName]({
                fromBlock: 0
            })
            .on('data', function(event) {
                console.log(event);
            })
        } catch (error) {
            console.error('Lỗi khi quét token IDs:', error);
        }
}

module.exports = { listenToContractEvents };
