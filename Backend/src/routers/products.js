const route = require('express').Router();

const productController = require('../app/controllers/prouductController');

route.use('/addProduct', productController.addProduct)
route.use('/allProducts', productController.getAllProduct)
route.use('/getBrandProduct', productController.getAllBrandOfProduct)
route.use('/getOnProduct', productController.getOneProduct)
module.exports = route;