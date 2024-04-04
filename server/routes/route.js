const { burnNFT } = require("../controller/BurnController")
const { listenToContractEvents } = require("../controller/ListenEventController")
const { mintNFT } = require("../controller/MinterController")
const { scanAllTokenIds } = require("../controller/ScanTokenIdController")
const { transfer } = require("../controller/TransferController")

const routers = (app) => {
  app.get('/', (_req, res) => res.status(200).json('Finentic centralized server is running.'))
  app.post('/minter', mintNFT)
  app.post('/transfer', transfer)
  app.post('/burn', burnNFT)
  app.get('/event', listenToContractEvents)
  app.get('/scan', scanAllTokenIds)
}

module.exports = {
  routers
}