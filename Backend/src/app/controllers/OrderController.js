const Address = require("../models/Address");
const Order = require("../models/Order");
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
        delete orderWithAddress.idOrderDetail;
        ordersWithAddress.push(orderWithAddress);
      }

      return res.status(200).json(ordersWithAddress);
    } catch (error) {
      console.log(error);
    }
  },

  confirmOrderSuccess: async (req, res) => {
    try {
      const { idOrder, idStaff } = req.body;
      const order = await Order.findById(idOrder);
  
      if (!order) {
        // Đơn hàng không tồn tại
        console.log('Đơn hàng không tồn tại');
        return res.status(404).json({ message: 'Đơn hàng không tồn tại' });
      }
  
      if (order.status !== 'Đang chờ xử lý') {
        // Đơn hàng đã được xác nhận trước đó
        console.log("Đơn hàng đã được xác nhận trước đó");
        return res.status(400).json({ message: 'Đơn hàng đã được xác nhận trước đó' });
      }
  
      const updatedOrder = await Order.findByIdAndUpdate(
        idOrder,
        {
          dayCurrent: new Date().toISOString(),
          idStaff: idStaff,
          status: 'Đã xác nhận đơn'
        },
        { new: true }
      );
  
      return res.status(200).json({message: "Cập nhật thành công"})
      
    } catch (error) {
      console.log(error);
      
    }
  },

  sendShipper: async (req, res) => {
    try {
      const { idShipper, idOrder } = req.body;
      console.log(idShipper, idOrder);
      
      // Kiểm tra đơn hàng có idShipper hay chưa
      const ordersToUpdate = await Order.find({ _id: { $in: idOrder }, idShipper: { $exists: false } });
  
      if (ordersToUpdate.length === 0) {
        console.log("Đơn hàng đã có idShipper, không thể thêm");
        return res.status(400).json({ error: "Đơn hàng đã có idShipper, không thể thêm." });
      }
  
      // Cập nhật shipper cho các đơn hàng có id trùng khớp
      await Order.updateMany({ _id: { $in: idOrder }, idShipper: { $exists: false } },  { $set: { status: "Đã gửi Ship", idShipper: idShipper } });
  
      res.status(200).json({ message: "Gán shipper cho các đơn hàng thành công." });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Lỗi máy chủ nội bộ." });
    }
  }
};

module.exports = orderController;
