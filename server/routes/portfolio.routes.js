const Router = require('express')
const router = new Router()
const passport = require('passport')
const portfolioController = require('../controllers/portfolio.controller')

router.post('/portfolio', passport.authenticate('jwt', {session: false}), portfolioController.createPortfolio)
router.get('/portfolio/:id', passport.authenticate('jwt', {session: false}), portfolioController.getPortfolio)
router.get('/portfolioDetails/:id', passport.authenticate('jwt', {session: false}), portfolioController.getPortfolioDetails)
router.get('/portfolios/:id', passport.authenticate('jwt', {session: false}), portfolioController.getPortfolios)
router.put('/portfolio', passport.authenticate('jwt', {session: false}), portfolioController.updatePortfolio)
router.delete('/portfolio/:id', passport.authenticate('jwt', {session: false}), portfolioController.deletePortfolio)
router.post('/sendPortfolio/:id', passport.authenticate('jwt', {session: false}), portfolioController.sendPortfolio)
router.get('/analystPortfolio/:id', passport.authenticate('jwt', {session: false}), portfolioController.getPortfoliosForAnalyst)
router.post('/message', passport.authenticate('jwt', {session: false}), portfolioController.sendMessage)
router.get('/getAnalysis/:id', passport.authenticate('jwt', {session: false}), portfolioController.getAnalysis)

module.exports = router