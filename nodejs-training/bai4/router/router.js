const express = require('express')
const router = express.Router()
var usersController = require('../controller/users_controller')
var groupController = require('../controller/groups_controller')
var commentController = require('../controller/comment_controller')
var statusController = require('../controller/status_controller')
var subcommentController = require('../controller/subcomment_controller')
var middlewareController = require('../middleware/middleware_verify_signup')

router.post('/users/register', usersController.register)
router.get('/users/listusers', usersController.listUsers)
router.get('/users/confirmation', middlewareController.verifySignup)
router.post('/users/resendtokens', middlewareController.resendToken)

router.post('/group/createGroup', groupController.createGroup)
router.put('/group/update', groupController.update)
router.delete('/group/delete', groupController.delete)

router.post('/status/postStatus', statusController.postStatus)
router.put('/status/update', statusController.update)
router.delete('/status/delete', statusController.delete)
router.get('/status/show', statusController.showpost)

router.post('/comment/postComment', commentController.postComment)
router.put('/comment/update', commentController.update)
router.delete('/comment/delete', commentController.delete)

router.post('/subcomment/postSubcomment', subcommentController.postSubcomment)
router.put('/subcomment/update', subcommentController.update)
router.delete('/subcomment/delete', subcommentController.delete)


module.exports = router