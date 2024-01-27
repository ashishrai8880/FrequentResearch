const express = require('express')
const router = express.Router()
const AuthController = require('../Controllers/AddressController')

router.get('/country/list', AuthController.country)
router.get('/state/state_by_country', AuthController.stateByCountry)
router.get('/city/city_by_state', AuthController.cityByState)



module.exports = router
