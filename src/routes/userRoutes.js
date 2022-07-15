const express = require('express')
const userController = require('../controllers/userController')

const router = express.Router()

router.get('/users/:userId', userController.getSingle)
router.post('/users', userController.postSingle)

module.exports = router