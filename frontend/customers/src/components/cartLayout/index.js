import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import "../cartLayout/cartLayou.css";
import PayLayout from "../PayLayout";
import Address from "../Address";
import PaymentMethod from "../PaymentMethod";

function CartLayout(props) {
  const { productCart, handleUpdateCart, customer, handleDelete } = props;
  // console.log(customer.customer.idAddress.nameAddress);
  const [productCartState, setProductCartState] = useState(productCart);
  const [address, setAddress] = useState(customer.customer?.idAddress?.nameAddress);
  const handleQuantityChange = async (itemId, newQuantity) => {
    try {
      const itemIndex = productCartState.findIndex(
        (item) => item.size._id === itemId
      );
      const updatedProductCart = [...productCartState];
      updatedProductCart[itemIndex].quantityCart = newQuantity;

      setProductCartState(updatedProductCart);

      await handleUpdateCart(itemId, newQuantity);
    } catch (error) {
      console.log("Lỗi khi cập nhật số lượng sản phẩm", error);
    }
  };

  const handleDeleteChange = async (itemId) => {
    try {
      handleDelete(itemId);
    } catch (error) {
      console.log("lỗi không thể xóa sản phẩm", error);
    }
  };

  useEffect(() => {
    setProductCartState(productCart);
  }, [productCart]);

  const calculateItemPrice = (item) => {
    const price = item.size.price * item.quantityCart * 1000;
    return price.toLocaleString(undefined, { minimumFractionDigits: 0 });
  };

  const handleAddressSave = (address) => {
    setAddress(address)
  }
  const calculateTotalPrice = () => {
    let totalPrice = 0;
    productCartState.forEach((item) => {
      totalPrice += parseInt(calculateItemPrice(item).replace(/,/g, ""));
    });
    return totalPrice.toLocaleString();
  };
  return (
    <div className="row justify-content-center ">
      <div className=" col-6 mt-3 ">
        <h3>Cart</h3>
        <div className="cart-info-user">
          <Address customer={customer} address={address} handleAddressSave={handleAddressSave}/>
          <p>Mã khách hàng: {customer.customer._id} </p>
          <p>Khách hàng : {customer.customer.nameCustomer}</p>
          <p>Email: {customer.customer.emailCustomer}</p>
          <p>Hạng:{customer.customer.membershipLevel}</p>
        </div>
        <hr />
       <PaymentMethod/>
        <hr/>
        <div className="row">
          <div className="col-6">
            <PayLayout address={address} customer={customer} />
          </div>
          <div className="col-6">
            <p className="total">Tổng: {calculateTotalPrice()}</p>
          </div>
        </div>
      </div>
      <div className="col-6 cart-layout">
        <Card.Body className="cart-content-show-item">
          {productCartState?.map((item) => (
            <Card key={item._id} className="cart-item-product mt-3">
              <Card.Header className="cart-header">
                <div className="name-header">{item.product.nameProduct}</div>
              </Card.Header>
              <Card.Body className="cart-content">
                <div className="cart-item-image">
                  <Card.Img
                    className="cart-image"
                    src={item.size.img}
                    alt="Product"
                  />
                </div>
                <div className="cart-info">
                  <p>
                    Size: {item.size.size} <span>: ${item.size.price}</span>
                  </p>

                  <div className="quantity-update ">
                    <button
                      onClick={() =>
                        handleQuantityChange(
                          item.size._id,
                          item.quantityCart - 1
                        )
                      }
                      disabled={item.quantityCart <= 1}
                    >
                      <i className="fa-solid fa-minus"></i>
                    </button>
                    <p> {item.quantityCart} </p>
                    <button
                      onClick={() =>
                        handleQuantityChange(
                          item.size._id,
                          item.quantityCart + 1
                        )
                      }
                      disabled={
                        parseInt(item.quantityCart) >= item.size.quantity
                      }
                    >
                      <i className="fa-solid fa-plus"></i>
                    </button>
                  </div>
                  <div className=" ">
                    <p>Thành tiền: {calculateItemPrice(item)}</p>
                  </div>
                </div>
              </Card.Body>
              <button
                className="btn-delete-cart"
                onClick={() => handleDeleteChange(item._id)}
              >
                Xóa
              </button>
            </Card>
          ))}
        </Card.Body>
      </div>
    </div>
  );
}

export default CartLayout;
