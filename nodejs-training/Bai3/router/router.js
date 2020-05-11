const express = require('express')
var router = express.Router()
var controller = require('../controller/user-controller')

router.get('/pagehome',controller.pagehome)
router.post('/register',controller.register)
router.post('/addProduct',controller.addProduct)
router.get('/getListProducts', controller.getListProducts)
router.post('/makeOrder',controller.makeOrders)
router.get('/deleteUser', controller.deleteuser)

module.exports = router