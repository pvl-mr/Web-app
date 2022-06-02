const Router = require('express')
const router = new Router()
const passport = require('passport')
const stockController = require('../controllers/stock.controller')

router.post('/stock', passport.authenticate('jwt', {session: false}), stockController.createStock)
router.get('/stock/:id', passport.authenticate('jwt', {session: false}), stockController.getStock)
router.get('/stock', passport.authenticate('jwt', {session: false}), stockController.getStocks)
router.put('/stock', passport.authenticate('jwt', {session: false}), stockController.updateStock)
router.delete('/stock/:id', passport.authenticate('jwt', {session: false}), stockController.deleteStock)
router.post('/putstocks', stockController.putStocks)

module.exports = router