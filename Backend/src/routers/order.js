const route = require('express').Router();

const orderController = require ('../app/controllers/OrderController');

route.use('/getOrderAdmin', orderController.getAllOrderAdmin)

route.use('/confirmOrder', orderController.confirmOrderSuccess)




module.exports = route;