const express = require('express')
const router = express.Router()
const AuthController = require('../Controllers/AuthController')

router.post('/register', AuthController.register)

// router.post('/country', AuthController.country)
// router.post('/state', AuthController.state)
// router.post('/city', AuthController.city)

router.post('/login', AuthController.login)

router.post('/details', AuthController.login)


module.exports = router
