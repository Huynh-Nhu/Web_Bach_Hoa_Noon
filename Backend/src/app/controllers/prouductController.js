const ImageProducts = require("../models/ImageProducts");
const productService = require("../services/productService");
const Products = require("../models/Products");
const ProductDetails = require("../models/ProductDetails");
const CategoryService = require("../services/CategoryService");
const productController = {
  addProduct: async (req, res) => {
    try {
      const {
        idCategory,
        nameProduct,
        sizeProduct,
        imageProduct,
        quantityProduct,
        decriptionProduct,
        nameCategoryDetail,
        brandChonse,
      } = req.body;

      const existingCategory = await CategoryService.findIdCategory(idCategory);
      if (existingCategory) {
        const existringProduct = await productService.findNamedProduct(
          nameProduct
        );
        if (existringProduct) {
          return res.status(200).json({ message: "Sản phẩm này đã tồn tại" });
        }
        const productDetails = new ProductDetails({
          descriptionProducts: decriptionProduct,
          sizeProducts: sizeProduct,
          quantityProducts: quantityProduct,
        });
        const saveProductDetails = await productService.createProductDetail(
          productDetails
        );
        const image = new ImageProducts({
          nameImageProduct: imageProduct,
        });
        const saveImage = await productService.createImageProduct(image);

        const product = new Products({
          idCategory: idCategory,
          idImageProduct: saveImage._id,
          categoryDetailChosen: nameCategoryDetail,
          idProductDetails: saveProductDetails._id,
          nameProduct: nameProduct,
          brandChonse: brandChonse,
        });

        const saveProducts = await productService.createProduct(product);
        return res
          .status(200)
          .json({ message: "Thêm sản phẩm thành công", saveProducts });
      } else {
        return res.status(200).json({ message: "Không có loại sản phẩm này" });
      }
    } catch (error) {
      console.log(error);
      return res.status(200).json({ message: "Thêm sản phẩm thất bại" });
    }
  },
  getAllBrandOfProduct: async (req, res) => {
    try {
      const categoryId = req.query.categoryId;
      const allBrandOfProduct = await productService.brandOfProductDetails(
        categoryId
      );
      const brands = allBrandOfProduct.codeBrand.map((brand) => {
        return {
          nameBrand: brand.nameBrand,
          codeBrand: brand.codeBrand,
        };
      });
      return res.status(200).json(brands);
    } catch (error) {
      return res.status(400).json(error);
    }
  },
  getAllProduct: async (req, res) => {
    try {
      const categoryId = req.query.categoryId;
      const products = await productService.getAllProducts(categoryId);
      return res.status(200).json(products);
    } catch (error) {
      return res.status(400).json(error);
    }
  },
  getOneProduct: async (req, res) => {
    try {
      const idProduct = req.query.productId;
      console.log(idProduct);
      const product = await productService.getOneProduct(idProduct);
      return res.status(200).json(product);
    } catch (error) {
      return res.status(400).json(error);
    }
  },
};

module.exports = productController;
