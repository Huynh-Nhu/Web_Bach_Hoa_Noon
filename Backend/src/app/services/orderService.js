const Order = require("../models/Order");

class OrderService {
    async getAll () {
        try {
            const order = await Order.find().populate("idUser").populate("idStaff").populate("idOrderDetail").sort({_id: -1}).exec()
            return order;
        } catch (error) {
            throw new Error(error)
        }
    }
    
}

module.exports = new OrderService()