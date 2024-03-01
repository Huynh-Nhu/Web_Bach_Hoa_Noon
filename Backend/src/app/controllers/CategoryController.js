const Brand = require('../models/Brand');
const Category = require('../models/Category');
const CategoryService = require('../services/CategoryService')
const CategoryController = {
    addCategory: async (req,res) => {
        try {
          const {nameBrand,categoryDetails,nameCategory,imgCategory} = req.body
          // Chuyển đổi các giá trị codeBrand thành các ObjectId
          const brandIds = await Brand.find({ _id: { $in: nameBrand } }).distinct(
            "_id"
          );
          const category = await CategoryService.findNamedCategory(nameCategory)
          if(category) {
            return res.status(200).json({message: 'Loại sản phẩm đã tồn tại'})
          }
          const img = imgCategory.toString()
          const newCategory = new Category({
            codeBrand: brandIds,
            nameCategory: nameCategory,
            categoryDetails:categoryDetails,
            imgCategory: img
          })
          const result = await CategoryService.createBrand(newCategory)
          return res.status(200).json({message: 'Thêm loại sản phẩm thành công', saveCategory : result})
        } catch (error) {
          console.log(error);
        }
      },
      getAllCategory: async (req,res) => {
       try {
        const allCategory = await CategoryService.getAllCate();
        return res.status(200).json(allCategory)
       } catch (error) {
        console.log(error);
       }
      },
 
};

module.exports = CategoryController;
