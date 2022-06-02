const Router = require('express')
const router = new Router()
const passport = require('passport')
const bondController = require('../controllers/portfolioBond.controller')

router.post('/portfolioBond', passport.authenticate('jwt', {session: false}), bondController.addBondToPortfolio)
router.get('/portfolioBonds/:id', passport.authenticate('jwt', {session: false}), bondController.getPortfolioBonds)
router.get('/portfolioBond/:id', passport.authenticate('jwt', {session: false}), bondController.getPortfolioBond)
router.put('/portfolioBond', passport.authenticate('jwt', {session: false}), bondController.updatePortfolioBond)
router.delete('/portfolioBond/:id', passport.authenticate('jwt', {session: false}), bondController.deleteBondFromPortfolio)

module.exports = router
