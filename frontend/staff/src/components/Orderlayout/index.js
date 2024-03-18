function Orderlayout(props) {
  const { order, staff } = props;
  console.log(order);
  const calculateTotalPrice = (orderDetail) => {
    let totalPrice = 0;
    orderDetail.forEach((product) => {
      totalPrice += parseFloat(product.idProduct.priceOrder) * product.idProduct.quantityOrder;
    });
    return totalPrice;
  };
  return (
    <div>
      Hien order
      {order.map((item, index) => (
        <div key={index}>
          <p className="bg-dark">{index}</p>
          <p>{item.idUser.nameCustomer}</p>
          <p>{item.idUser.phoneCustomer}</p>
          <p>{item.address.nameAddress}</p>
          <p>Ngày đặt hàng: {new Date(item.dayOrder).toLocaleString()}</p>
          {item.orderDetail.map((product, index) => (
            <div key={index}>
              <p>
                {product.nameProduct} - <span>{product.idProduct.size}</span>{" "}
              </p>
              <p>{product.idProduct.quantityOrder}</p>
              <p>{product.idProduct.priceOrder}</p>
            </div>
          ))}
           <p>Tổng giá tiền: {calculateTotalPrice(item.orderDetail)}</p>
          <p>{item.status}</p>
        </div>
      ))}
    </div>
  );
}

export default Orderlayout;
