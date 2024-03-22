const authService = require("../services/authService");

const ShipperController = {
  getShipper: async (req, res) => {
    try {
      const shipper = await authService.findShipper();
      return res.status(200).json(shipper);
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = ShipperController;
