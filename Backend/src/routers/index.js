const staffRouter = require('./staff')
const customerRouter = require('./customer')
const BrandRouter = require('./brand')
const CategoryRouter = require('./category')
const ProductRouter = require('./products')
const CartRouter = require('./cart')
const PayRouter = require('./pay')
function route(app) {
    app.use('/staffs',staffRouter )
    app.use('/customer',customerRouter)
    app.use('/brand',BrandRouter )
    app.use('/category',CategoryRouter)
    app.use('/products',ProductRouter )
    app.use('/cart',CartRouter )
    app.use('/pay',PayRouter )

    


}

module.exports = route;