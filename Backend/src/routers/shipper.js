const route = require('express').Router();

const shipperController = require ('../app/controllers/ShipperController');

route.use('/getShipper', shipperController.getShipper)







module.exports = route;