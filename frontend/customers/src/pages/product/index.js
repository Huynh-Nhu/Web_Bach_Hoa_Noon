import { useLocation } from "react-router-dom";
import ProductPage from "../../components/productPage";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "../product/productPage.css";
function Product() {
  const location = useLocation();
  const [isCategory, setIsCategory] = useState("");
  const [productCategory, setProductCategory] = useState([]);
  const productPage = useSelector(
    (state) => state.product?.allProduct?.productData
  );
  const categoryGet = useSelector(
    (state) => state.category?.allCategory?.categoryData
  );
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get("id");
    const category = searchParams.get("category");
    setIsCategory(category);
    const filterProduct = productPage.filter(
      (item) => item?.idCategory._id === id
    );
    const filterCategory = categoryGet.filter((item) => item._id === id);
    // console.log(filterCategory);
    setProductCategory(filterCategory);
  }, [location, productPage]);

  return (
    <div className="product-page">
      <div className="sidebar-product">
        <h5>{isCategory}</h5>
        <hr />
        {productCategory.map((category, index) => (
        category.categoryDetails.map((detail, i) => (
          <p key={i}>{detail.name}</p>
        ))
      ))}
      </div>
      <div className="content-product">
        <ProductPage />
      </div>
    </div>
  );
}

export default Product;
