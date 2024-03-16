import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

function Address(props) {
  const { customer, handleAddressSave, address } = props;
  const [showModal, setShowModal] = useState(!address);

  const handleAddressUpdate = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleAddressSaveChange = (newAddress) => {
    // Thực hiện logic lưu địa chỉ mới vào database hoặc trạng thái của component
    handleAddressSave(newAddress);
    setShowModal(false);
  };

  return (
    <div>
      {address ? (
        <p>Địa chỉ: {address}</p>
      ) : (
        <p className="">
          Địa chỉ:{" "}
          <i className="fa-solid fa-user-pen" onClick={handleAddressUpdate}></i>
        </p>
      )}

      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Cập nhật địa chỉ</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Form cập nhật địa chỉ */}
          <input
            type="text"
            value={address}
            onChange={(e) => handleAddressSaveChange(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Hủy
          </Button>
          <Button variant="primary" onClick={() => handleAddressSaveChange(address)}>
            Lưu
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Address;