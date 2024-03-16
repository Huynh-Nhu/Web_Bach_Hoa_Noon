const route = require('express').Router();

const payController = require ('../app/controllers/PayController');

route.use('/address', payController.addAdress)




module.exports = route;