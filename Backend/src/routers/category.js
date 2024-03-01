const route = require('express').Router();

const CategoryController = require ('../app/controllers/CategoryController');


route.use('/addCategory', CategoryController.addCategory)
route.use('/getAllCategory', CategoryController.getAllCategory)


module.exports = route;