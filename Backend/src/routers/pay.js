const route = require('express').Router();

const payController = require ('../app/controllers/PayController');

route.use('/address', payController.addOrder)




module.exports = route;