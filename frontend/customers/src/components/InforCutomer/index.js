import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";

import "../InforCutomer/inforCustomer.css"; // Đường dẫn đến file CSS
import { logout } from "../../service/apiCustomer";
import { useNavigate } from "react-router-dom";

function InforCustomer() {
  const customer = useSelector(
    (state) => state.loginCustom?.login?.currentCustomer
  );
  // console.log(customer);
  const [isGoogleLogin, setIsGoogleLogin] = useState(false);
  const [isSetting, setIsSettingOpen] = useState(false);
  const [token, setToken] = useState("");
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const checkProvider = () => {
    if (customer?.userObject?.iss === "https://accounts.google.com") {
      setIsGoogleLogin(true);
    }
  };

  const handleLogout =  () => {
    
     logout(dispatch,navigate);
  };

  useEffect(() => {
    checkProvider();
    if (isGoogleLogin) {
      setToken(customer?.userObject?.jti);
    } else {
      setToken(customer?.accessToken)
    }
  }, [customer]);
  const renderCustomerInfo = () => {
    if (isGoogleLogin) {
      return (
        <>
          <img
            src={customer?.userObject?.picture}
            alt="Avatar"
            className="customer-avatar"
          />
          <p className="customer-name">{customer?.userObject?.name}</p>
        </>
      );
    } else {
      return (
        <>
          <img
            src={customer?.customer?.avatarCustomer}
            alt="Avatar"
            className="customer-avatar"
          />
          <p className="customer-name">{customer?.customer?.nameCustomer}</p>
        </>
      );
    }
  };
  return (
    <div className="customer-info-container">
      {renderCustomerInfo()}
      <button
        className=" btn-setting"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasRight"
        aria-controls="offcanvasRight"
      >
        <i className="fa-solid fa-gear"></i>
      </button>

      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
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
    </div>
  );
}

export default InforCustomer;
