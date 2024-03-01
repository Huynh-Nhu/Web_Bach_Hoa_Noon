import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

function UpdateProductPage() {
  const location = useLocation();
  const product = useSelector(
    (state) => state.products.getAllProducts?.allProduct
  );
 
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get("id");
    if (id) {
      const productOne = product.find((item) => item._id === id);
    }
  }, [location]);
  return
  <div>
    
  </div>;
}

export default UpdateProductPage;
