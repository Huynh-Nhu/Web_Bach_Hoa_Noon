import LoginWithGoogle from "../../components/LoginWithGoogle";
// import LoginLayout from "../../components/LoginLayout";
import { useState } from "react";
import LoginLayout from "../../components/loginLayout";
import { loginCustomers } from "../../service/apiCustomer";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

function LoginPage() {
  const [nameCustomer, setNameCustomer] = useState("");
  const [passwordCustomer, setPasswordCustomer] = useState("");
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleEmailOrPhone = (email) => {
    setNameCustomer(email);
  }
  const handlePassword = (password) => {
    setPasswordCustomer(password);
  }

  const handlSubmit = (e) => {
    e.preventDefault();
    const newCustomer = {
      emailOrPhone: nameCustomer,
      password: passwordCustomer
    }
    loginCustomers(newCustomer,dispatch,navigate)
  }
  return (
    <div>
     <LoginLayout 
      nameCustomer={nameCustomer}
      passwordCustomer={passwordCustomer}
      handleEmailOrPhone={handleEmailOrPhone}
      handlePassword={handlePassword}
      handlSubmit={handlSubmit}
/>
      <LoginWithGoogle />
    </div>
  );
}

export default LoginPage;
