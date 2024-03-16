import { useEffect, useState } from "react";
import ProductDetailLayout from "../../components/ProductDetailLayout";
import { useLocation, useNavigate } from "react-router-dom";
import { addProductCart, getProductDetail } from "../../service/apiCustomer";
import { useDispatch, useSelector } from "react-redux";
import RelatedProduct from "../../components/RelatedProduct";

function ProductDetail() {
  const location = useLocation();
  const dispatch = useDispatch();
  const[isId, setId] = useState("")
  const [idDetail, setIdDetail] = useState("");
  const [cart, setCart] = useState([]);
  const [related, setRelated] = useState([]);
  const [showRelated, setShowRelated] = useState(false);
  const navigate = useNavigate()
  const customer = useSelector(
    (state) => state?.loginCustom?.login?.currentCustomer
  );
  const detail = useSelector(
    (state) => state.detail?.allDetail?.detailData.product
  );
  const nameDetail = useSelector(
    (state) => state.detail?.allDetail?.detailData.products
  );

  const product = useSelector(
    (state) => state.product?.allProduct?.productData
  );
  // console.log(product);

  const addCart = (product) => {
    // setCart([product]);
    if(customer) {

      addProductCart(product)
    } else {
      alert("Vui lòng đăng nhập trước khi thêm sản phẩm vào giỏ hàng")
      navigate("/login")
    }
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get("id");
    const idProductDetail = searchParams.get("idDetail");
    setId(id)
   
    setIdDetail(idProductDetail);
    if (id && idProductDetail) {
      getProductDetail(id, idProductDetail, dispatch).then(() => {
        setShowRelated(true)
      });
    }
  }, [location, dispatch,nameDetail,product]);
  useEffect(() => {
    if(detail) {
      const productRelated = product.filter((item) =>
      item.idCategory && item.idCategory.nameCategory === nameDetail
      );
      setRelated(productRelated)
      
    }
  } , [detail, product, nameDetail])

  return (
   <div>
      <ProductDetailLayout
        detail={detail}
        idDetail={idDetail}
        addCart={addCart}
        customer={customer}
      />
      {showRelated &&  <RelatedProduct  id={isId} related={related} /> }
     
   </div>
  );
}

export default ProductDetail;
