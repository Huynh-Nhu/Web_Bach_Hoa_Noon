const route = require('express').Router();

const productController = require('../app/controllers/prouductController');

route.use('/addProduct', productController.addProduct)
route.use('/allProducts', productController.getAllProduct)
route.use('/updateProduct', productController.updateProduct)
route.use('/getBrandProduct', productController.getAllBrandOfProduct)
route.use('/deleteProduct', productController.deleteProduct)
route.use('/resetProduct', productController.resetProduct)
route.use('/deleteDetailProduct', productController.deleteDetailProduct)
route.use('/resetDetailProduct', productController.resetDetailProduct)





module.exports = route;