import React, { useState } from "react";

function Orderlayout(props) {
  const { order, handleConfirm } = props;
  console.log(order);
  const [activeCollapseIndex, setActiveCollapseIndex] = useState(null);

  const calculateTotalPrice = (orderDetail) => {
    let totalPrice = 0;
    orderDetail.forEach((product) => {
      totalPrice +=
        parseFloat(product.idProduct.priceOrder) *
        product.idProduct.quantityOrder;
    });
    return totalPrice;
  };
  const handleConfirmChange = (idOrder) => {
    handleConfirm(idOrder);
  };

  const toggleCollapse = (index) => {
    if (activeCollapseIndex === index) {
      setActiveCollapseIndex(null);
    } else {
      setActiveCollapseIndex(index);
    }
  };

  return (
    <div className="table-responsive text-center">
      <table className="table  align-middle">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Tên khách hàng</th>
            <th scope="col">Số điện thoại</th>
            <th scope="col">Địa chỉ</th>
            <th scope="col">Ngày đặt hàng</th>
            <th scope="col">Ngày xác nhận đơn</th>
            <th scope="col">Nhân viên xác nhận</th>
            <th scope="col">Đơn hàng chi tiết</th>
            <th scope="col">Phương thức thanh toán</th>
            <th scope="col">Tổng giá tiền</th>
            <th scope="col">Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {order?.map((item, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{item.idUser.nameCustomer}</td>
              <td>{item.idUser.phoneCustomer}</td>
              <td>{item.address.nameAddress}</td>
              <td>{new Date(item.dayOrder).toLocaleString()}</td>
              <td>
                {" "}
                {item.dayCurrent === null ? (
                  <span>Trống</span>
                ) : (
                  <span> {new Date(item.dayCurrent).toLocaleString()}</span>
                )}
              </td>
              <td>
                {item.idStaff === null ? (
                  <span>Trống</span>
                ) : (
                  <span>{item.idStaff?.nameStaff}</span>
                )}
              </td>
              <td className="">
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={() => toggleCollapse(index)}
                >
                  Xem
                </button>
                <div
                  className={`collapse ${
                    activeCollapseIndex === index ? "show" : ""
                  }  mt-3`}
                >
                  <table className="table-bordered align-middle">
                    <thead>
                      <tr>
                        <th>Sản phẩm</th>
                        <th>Số lượng</th>
                        <th>Giá</th>
                      </tr>
                    </thead>
                    <tbody>
                      {item?.orderDetail?.map((product, index) => (
                        <tr key={index}>
                          <td>
                            {product.nameProduct} -{" "}
                            <span>{product.idProduct.size}</span>
                          </td>
                          <td>{product.idProduct.quantityOrder}</td>
                          <td>{product.idProduct.priceOrder}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </td>
              <td>{item.payMethod}</td>
              <td>{calculateTotalPrice(item.orderDetail)}</td>
              <td>
                {" "}
                <button
                  onClick={() => handleConfirmChange(item._id)}
                  className={`btn ${
                    item.status === "Đã xác nhận đơn"
                      ? "btn-success"
                      : "btn-dark"
                  }`}
                  s
                >
                  {item.status}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Orderlayout;
