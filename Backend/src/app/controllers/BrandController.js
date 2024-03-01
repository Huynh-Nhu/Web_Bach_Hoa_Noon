const Brand = require("../models/Brand");
const brandService = require("../services/BrandService");
const randomstring = require("randomstring");

const brandController = {
  addBrand: async (req, res) => {
    try {
      const { nameBrand, imgBrand } = req.body;
      const brand = await brandService.findNamedBrand(nameBrand);
      if (brand) {
        return res.status(200).json({ message: "Brand đã tồn tại" });
      }
      const imgUrl = imgBrand.thisUrl;
      const img = imgUrl.toString();
      let characters = randomstring.generate(4);

      let existingBrand = await Brand.findOne({ codeBrand: characters });
      while (existingBrand) {
        characters = randomstring.generate(4);
        existingBrand = await Brand.findOne({ codeBrand: characters });
      }
      const newBrand = new Brand({
        codeBrand: characters,
        nameBrand: nameBrand,
        imgBrand: img,
      });
      const newBrands = await brandService.createBrand(newBrand);
      console.log(newBrands);
      return res
        .status(200)
        .json({ message: "Thêm thành công Brand sản phẩm", Brand: newBrands });
    } catch (error) {
      return res.status(400).json({ message: "Không thể thêm Brand" });
    }
  },
  getAllBrand: async (req, res) => {
    try {
      const allBrand = await brandService.findAllBrand();
      return res.status(200).json(allBrand);
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = brandController;
