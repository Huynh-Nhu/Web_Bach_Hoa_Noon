import React, { useState } from "react";
import { addPay, deleteCartAll } from "../../service/apiCustomer";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ModalConfetti from "../ModalConfetti";
import Congrat from "../Congrat";
import { useNavigate } from "react-router-dom";

function PaymentMethod(props) {
  const navigate = useNavigate()
  const { calculateTotalPrice, productCartState, customer, address ,phone } = props;
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [paymentOption, setPaymentOption] = useState("cash");

  const handlePaymentOptionChange = (event) => {
    setPaymentOption(event.target.value);
  };
  const handleClose = () => {
    setShow(false);
    setIsSuccess(false);
    navigate("/")
    
  };

  const handleCashPayment = () => {
    if (address != undefined) {
      setShowModal(true);
    } else {
      alert("Vui lòng điền địa chỉ trước khi thanh toán");
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSaveChanges = (id, address) => {
    console.log(id, address);
    // Thực hiện logic lưu thay đổi
    setShowModal(false);
    addPay(id, address , phone).then((data) => {
      setMessage(data.message);
      setShow(true);
      setIsSuccess(true);
      deleteCartAll(data.id);
    });
  };

  const renderPaymentForm = () => {
    if (paymentOption === "cash") {
      return (
        <div>
          <button onClick={() => handleCashPayment(customer?.customer._id)}>
            Mua
          </button>

          <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>Đơn Hàng</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              {productCartState.map((item, index) => (
                <div key={index}>
                  <ul>
                    <li> {item.product.nameProduct} </li>
                    <li>Loại: {item.size.size}</li>
                    <li>Số lượng: {item.quantityCart}</li>
                    <li>Giá tiền: {parseInt(item.price).toLocaleString()}</li>
                  </ul>
                  <p> Tổng tiền: {calculateTotalPrice()} </p>
                </div>
              ))}
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Hủy
              </Button>
              <Button
                variant="primary"
                onClick={() =>
                  handleSaveChanges(customer.customer._id, address)
                }
              >
                Thanh Toán
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      );
    } else if (paymentOption === "online") {
      return (
        <div>
          {/* Thêm mã HTML hoặc component liên quan đến phương thức thanh toán trực tuyến */}
          <p>Của VNPAY</p>
        </div>
      );
    }
  };

  return (
    <div>
      {isSuccess && <Congrat />}
      <div>
        <p>Phương thức thanh toán</p>
        <div className="row">
          <label>
            <input
              type="radio"
              value="cash"
              checked={paymentOption === "cash"}
              onChange={handlePaymentOptionChange}
            />
            Tiền mặt
          </label>

          <label>
            <input
              type="radio"
              value="online"
              checked={paymentOption === "online"}
              onChange={handlePaymentOptionChange}
            />
            Online
          </label>
        </div>

        {renderPaymentForm()}
      </div>

      <ModalConfetti message={message} show={show} handleClose={handleClose} />
    </div>
  );
}

export default PaymentMethod;
