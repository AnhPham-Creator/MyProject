const express = require('express')
const controller = require('../controller/controller')
const auth = require('../middleware/auth_middleware')
var router = express.Router();

router.get('/login', controller.Viewlogin)
router.post('/login', controller.login)
router.get('/pagehome',auth.checktoken, auth.checkUser, controller.pagehome)
router.get('/error', controller.error)
router.get('/success', controller.success)
router.get('/logout', controller.logout)
router.get('/list-product', controller.getlistproduct)

router.post('/makeOrder', controller.makeOrder)
router.get('/swagger', controller.swagger)
router.get('/authorize',auth.checktoken, auth.checkUser, (req, res) => {
	res.status(200).json({
		status: "authorize success"
	})
})

module.exports = router