import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addPay, deleteCartAll } from "../../service/apiCustomer";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ModalConfetti from "../ModalConfetti";
import Congrat from "../Congrat";
import PayLayout from "../PayLayout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function PaymentMethod(props) {
  const navigate = useNavigate();
  const { calculateTotalPrice, productCartState, customer, address, phone } =
    props;
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [show, setShow] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isAddressAndPhoneValid, setIsAddressAndPhoneValid] = useState(false);

  const [paymentOption, setPaymentOption] = useState("COD");

  const handlePaymentOptionChange = (event) => {
    setPaymentOption(event.target.value);
    setIsAddressAndPhoneValid(!!address && !!phone);
  };
  const handleClose = () => {
    setShow(false);
    setIsSuccess(false);
    navigate("/");
  };

  const handleCashPayment = () => {
    if (address != undefined) {
      setShowModal(true);
    } else {
      toast.warn("Vui lòng điền địa chỉ trước khi thanh toán", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
     
        });
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handlePayCOD = (id, address) => {
    // Thực hiện logic lưu thay đổi
    setShowModal(false);
    addPay(id, address, phone, paymentOption).then((data) => {
      setMessage(data.message);
      setShow(true);
      setIsSuccess(true);
      deleteCartAll(data.id);
    });
  };

  const handlePaypal = (res) => {
    if (res) {
      if (isAddressAndPhoneValid) {
        addPay(customer?.customer?._id, address, phone, paymentOption).then((data)=> {
          setMessage(data.message);
          setShow(true);
          setIsSuccess(true);
          deleteCartAll(data.id);
        });
      }
    }
  };
  useEffect(() => {
    setIsAddressAndPhoneValid(true);
  }, [address]);
  const renderPaymentForm = () => {
    if (paymentOption === "COD") {
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
                onClick={() => handlePayCOD(customer.customer._id, address)}
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
          {isAddressAndPhoneValid ? (
            <PayLayout
              handlePaypal={handlePaypal}
              calculateTotalPrice={calculateTotalPrice}
            />
          ) : (
            <p>Vui lòng điền địa chỉ và số điện thoại trước khi thanh toán</p>
          )}
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
              value="COD"
              checked={paymentOption === "COD"}
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
      <div>
        <ToastContainer />
      </div>
    </div>
  );
}

export default PaymentMethod;
