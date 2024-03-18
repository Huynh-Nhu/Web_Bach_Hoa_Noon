const Address = require("../models/Address");
const Products = require("../models/Products");
const OrderService = require("../services/orderService");

const orderController = {
  getAllOrderAdmin: async (req, res) => {
    try {
      const getAllOrder = await OrderService.getAll();
      const ordersWithAddress = [];

      for (const order of getAllOrder) {
        const orderDetail = order.idOrderDetail.orderDetail;
        const updatedOrderDetail = [];

        for (const item of orderDetail) {
          const product = await Products.findById(item.ipProduct).populate(
            "idProductDetails"
          );

          const detail = product.idProductDetails.sizeProducts;
          const size = detail.find(
            (size) => size._id.toString() === item.idProductSize.toString()
          );

          const updatedItem = {
            idProduct: {
              size: size.size,
              price: size.price,
              img: size.img,
              quantity: size.quantity,
              state: size.state,
              priceOrder: item.priceOrder,
              quantityOrder: item.quantityOrder

              // Thêm các thuộc tính khác của sản phẩm nếu cần thiết
            },
            nameProduct: product.nameProduct,
          };

          updatedOrderDetail.push(updatedItem);
        }

        const address = await Address.findById(order.idUser.idAddress);

        const orderWithAddress = {
          ...order.toObject(),
          orderDetail: updatedOrderDetail,
          address: address,
        };
        ordersWithAddress.push(orderWithAddress);
      }

      return res.status(200).json(ordersWithAddress);
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = orderController;
