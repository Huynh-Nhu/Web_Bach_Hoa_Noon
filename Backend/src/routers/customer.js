const router = require('express').Router();


const customerController = require('../app/controllers/customerController')

router.use('/register', customerController.registerCustomer )
router.use('/login', customerController.loginCustomer )
router.use('/google', customerController.googleCustomer )




module.exports = router;