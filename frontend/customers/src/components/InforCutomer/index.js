import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";

import "../InforCutomer/inforCustomer.css"; // Đường dẫn đến file CSS
import { logout } from "../../service/apiCustomer";
import { Link, useNavigate } from "react-router-dom";

function InforCustomer() {
  const customer = useSelector(
    (state) => state.loginCustom?.login?.currentCustomer
  );
  const cart = useSelector((state) => state.card?.cardProduct?.cardData);

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogout =  () => {
     logout(dispatch,navigate);

  };
  const renderCustomerInfo = () => {
    if (customer === null) {
      return (
        <>
         <Link to="/login"> <button className="btn btn-primary">Login</button></Link>
         <Link to="/register"> <button className="btn btn-primary">Register</button></Link>
        </>
      );
    } else {
      return (
        <>
          <div className="customer-info-container">
            <img
              src={customer?.customer?.avatarCustomer}
              alt="Avatar"
              className="customer-avatar"
            />
            <p className="customer-name">{customer?.customer?.nameCustomer}</p>
            <button
              className=" btn-setting"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasRight"
              aria-controls="offcanvasRight"
            >
              <i className="fa-solid fa-gear"></i>
            </button>
          </div>

          <div
            className="offcanvas offcanvas-end"
            tabIndex="-1"
            id="offcanvasRight"
            aria-labelledby="offcanvasRightLabel"
            data-bs-backdrop="false"
          
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasRightLabel">
                Cài đặt
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">
              <ul>
                <li>Product 1</li>
                <li>Product 2</li>
                <li>Product 3</li>
                {/* Thêm các mục sản phẩm khác */}
              </ul>

              <button
                onClick={handleLogout}
                className="btn btn-danger logout-button"
              >
                Logout
              </button>
            </div>
          </div>
        </>
      );
    }
  };

  return <div className="customer-info-container">{renderCustomerInfo()}</div>;
}

export default InforCustomer;