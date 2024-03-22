import React, { useState } from "react";
import { Card, CardBody, CardHeader, Modal } from "react-bootstrap";
import { getAllOrder, sendShipper } from "../../Redux/apiOrder";

import Shipper from "../Shipper";
import { useDispatch } from "react-redux";

function Orderlayout(props) {
  const dispatch = useDispatch()
  const { order, handleConfirm } = props;
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [show, setShow] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const calculateTotalPrice = (orderDetail) => {
    let totalPrice = 0;
    orderDetail?.forEach((product) => {
      totalPrice +=
        parseFloat(product.idProduct.priceOrder) *
        product.idProduct.quantityOrder;
    });
    return totalPrice.toLocaleString();
  };
  const handleConfirmChange = (idOrder) => {
    handleConfirm(idOrder);
  };

  const openModal = (index) => {
    setSelectedOrder(index);
  };

  const closeModal = () => {
    setSelectedOrder(null);
  };
  const handleShow = () => {
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
  };
  const handleSelectOrder = (idOrder) => {
    const isSelected = selectedItems.includes(idOrder);
    if (isSelected) {
      setSelectedItems(selectedItems.filter((orderId) => orderId !== idOrder));
    } else {
      setSelectedItems([...selectedItems, idOrder]);
    }
  };

  const handleSendShipper = (idShipper, idOrder) =>{
    sendShipper(idShipper, idOrder).then(() => {
      getAllOrder(dispatch)
    });

  }
  return (
    <div>
      <div>
        <button onClick={handleShow}>Chọn shipper</button>
        <Shipper
          selectedItems={selectedItems}
          show={show}
          handleClose={handleClose}
          handleSendShipper={handleSendShipper}
        />
      </div>
      <div className="table-responsive text-center">
        <table className="table  align-middle">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">
                {order.some((item) => item.status === "Đã xác nhận đơn")? (
                  <th>
                    <input
                      type="checkbox"
                      checked={selectedItems?.length === order.length}
                      onChange={() => {
                        if (selectedItems.length === order.length) {
                          setSelectedItems([]);
                        } else {
                          const allOrderIds = order.map((item) => item._id);
                          setSelectedItems(allOrderIds);
                        }
                      }}
                    />
                  </th>
                ): (
                 <th> check</th>
                )}
              </th>
              <th scope="col">Tên khách hàng</th>
              <th scope="col">Số điện thoại</th>
              <th scope="col">Địa chỉ</th>
              <th scope="col">Ngày đặt hàng</th>
              <th scope="col">Ngày xác nhận đơn</th>
              <th scope="col">Nhân viên xác nhận</th>
              <th scope="col">Shipper</th>
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
                {item.status === "Đã xác nhận đơn" ? (
                 <td>
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(item._id)}
                      onChange={() => handleSelectOrder(item._id)}
                    />
                 </td>
                ) : (
                  <td>
                   
                  </td>
                )}
                <td>{item.idUser?.nameCustomer}</td>
                <td>{item.idUser?.phoneCustomer}</td>
                <td>{item.address?.nameAddress}</td>
                <td>{new Date(item?.dayOrder).toLocaleString()}</td>
                <td>
                  {" "}
                  {item?.dayCurrent === null ? (
                    <span>...</span>
                  ) : (
                    <span> {new Date(item?.dayCurrent).toLocaleString()}</span>
                  )}
                </td>
                <td>
                  {item?.idStaff === null ? (
                    <span>...</span>
                  ) : (
                    <span>{item.idStaff?.nameStaff}</span>
                  )}
                </td>
                <td>
                  {item?.idShipper?.nameStaff}
                </td>
                <td className="">
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={() => openModal(index)}
                  >
                    Xem
                  </button>

                  <Modal show={selectedOrder !== null} onHide={closeModal}>
                    <Modal.Header closeButton></Modal.Header>
                    <Modal.Body>
                      {selectedOrder !== null &&
                        order[selectedOrder]?.orderDetail?.map(
                          (product, index) => (
                            <Card key={index} className="mb-3">
                              <CardHeader>
                                {product?.nameProduct} -{" "}
                                <span>{product?.idProduct.size}</span>
                              </CardHeader>
                              <CardBody className=" ">
                                <div
                                  className="d-flex "
                                  style={{ alignItems: "center" }}
                                >
                                  <img
                                    src={product?.idProduct.img}
                                    style={{ width: "100px" }}
                                  />
                                  <p className="mx-3">
                                    Số lương:{" "}
                                    <span style={{ color: "red" }}>
                                      {product.idProduct.quantityOrder}
                                    </span>
                                  </p>

                                  <p className="mx-3">
                                    Thành tiền:
                                    <span style={{ color: "blue" }}>
                                      {" "}
                                      {product.idProduct.priceOrder.toLocaleString()}
                                    </span>
                                  </p>
                                </div>
                              </CardBody>
                            </Card>
                          )
                        )}
                    </Modal.Body>
                  </Modal>
                </td>
                <td>{item.payMethod}</td>
                <td>{calculateTotalPrice(item.orderDetail)}</td>
                <td>
                  {" "}
                  <button
                    onClick={() => handleConfirmChange(item._id)}
                    className={`btn ${
                      item.status === "Đã xác nhận đơn" ? "btn-success" : "btn-warning"
                    }`}
                    
                  >
                    {item.status} 
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Orderlayout;
