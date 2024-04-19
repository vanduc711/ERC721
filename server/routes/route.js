const { burnNFT, listenToContractEvents, mintNFT, scanAllTokenIds, transfer } = require("../controller/NFTController")


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