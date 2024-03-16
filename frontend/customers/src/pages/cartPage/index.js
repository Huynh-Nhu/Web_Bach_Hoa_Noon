import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartLayout from "../../components/cartLayout";
import CartNotFound from "../../components/cartNotFound";
import { deleteCart, getProductCart, updateQuantity } from "../../service/apiCustomer";
import { useNavigate } from "react-router-dom";
import { cardSuccess } from "../../Redux/cardSlice";

function CartPage() {
  const [cartShow, setCartShow] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [update, setUpdate] = useState("");
  const customer = useSelector(
    (state) => state.loginCustom?.login?.currentCustomer
  );
  const cart = useSelector((state) => state.card?.cardProduct?.cardData);

  useEffect(() => {
    if (customer === null) {
      alert("Vui lòng đăng nhập trước");
      navigate("/login");
      return;
    }

    getProductCart(customer?.customer?._id, dispatch).then((data) => {
      dispatch(cardSuccess(data));
      handleShowCart(data);
    });
  }, [dispatch, customer, navigate]);

  const handleShowCart = (cartData) => {
    const productCart = cartData?.[0]?.cartItems?.reduce((acc, item) => {
      const product = cartData?.Product?.find((p) => p._id === item?.idProduct);
      const size = product?.idProductDetails?.sizeProducts.find(
        (s) => s._id === item?.idProductDetailSize
      );
      if (product && size) {
        acc.push({
          ...item,
          product,
          size,
        });
      }
      return acc;
    }, []);
    setCartShow(productCart);
    setIsLoading(false); // Đánh dấu đã tải xong
  };

  const handleDelete = (itemId) => {
    deleteCart(itemId).then(() => {
      // Xóa thành công, cập nhật lại giao diện
      const updatedCart = cartShow.filter((item) => item._id !== itemId);
      setCartShow(updatedCart);
    });
  };

  const handleUpdateCart = (itemId, newQuantity) => {
    updateQuantity(itemId, newQuantity, customer?.customer?._id, dispatch).then(
      (data) => {
        setUpdate(data);
      }
    );
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return cartShow?.length > 0 ? (
    <CartLayout
      customer={customer}
      cart={cart}
      productCart={cartShow}
      handleUpdateCart={handleUpdateCart}
      handleDelete={handleDelete}
    />
  ) : (
    <CartNotFound />
  );
}

export default CartPage;