const Router = require('express')
const router = new Router()
const passport = require('passport')
const stockController = require('../controllers/portfolioStock.controller')

router.post('/portfolioStock', passport.authenticate('jwt', {session: false}), stockController.addStockToPortfolio)
router.get('/portfolioStocks/:id', passport.authenticate('jwt', {session: false}), stockController.getPortfolioStocks)
router.get('/portfolioStock/:id', passport.authenticate('jwt', {session: false}), stockController.getPortfolioStock)
router.put('/portfolioStock', passport.authenticate('jwt', {session: false}), stockController.updatePortfolioStock)
router.delete('/portfolioStock/:id', passport.authenticate('jwt', {session: false}), passport.authenticate('jwt', {session: false}), stockController.deleteStockFromPortfolio)

module.exports = router
