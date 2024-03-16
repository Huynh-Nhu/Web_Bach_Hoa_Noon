import { useState } from "react";
import RegisterLayout from "../../components/RegisterLayout";
import { registerCustomer } from "../../service/apiCustomer";
import ModalMessage from "../../components/ModalMessage";

function Register() {
  const [nameCustomer, setNameCustomer] = useState("");
  const [passwordCustomer, setPasswordCustomer] = useState("");
  const [phoneCustomer, setPhoneCustomer] = useState("");
  const [emailCustomer, setEmailCustomer] = useState("");
  const [nameAddress, setNameAddress] = useState("");
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const handleNameCustomer = (name) => {
    setNameCustomer(name);
  };

  const handlePasswordCustomer = (password) => {
    setPasswordCustomer(password);
  };

  const handlePhoneCustomer = (phone) => {
    setPhoneCustomer(phone);
  };

  const handleEmailCustomer = (email) => {
    setEmailCustomer(email);
  };

  const handleAddressCustomer = (address) => {
    setNameAddress(address);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newCustomer = {
      nameCustomer: nameCustomer,
      phoneCustomer: phoneCustomer,
      passwordCustomer: passwordCustomer,
      emailCustomer: emailCustomer,
      nameAddress: nameAddress,
    };

    registerCustomer(newCustomer).then((data) => {
      setMessage(data);
      setShow(true);
    });
  };

  return (
   <div>
        <RegisterLayout
          nameCustomer={nameCustomer}
          passwordCustomer={passwordCustomer}
          phoneCustomer={phoneCustomer}
          emailCustomer={emailCustomer}
          nameAddress={nameAddress}
          handleNameCustomer={handleNameCustomer}
          handlePasswordCustomer={handlePasswordCustomer}
          handlePhoneCustomer={handlePhoneCustomer}
          handleEmailCustomer={handleEmailCustomer}
          handleAddressCustomer={handleAddressCustomer}
          handleSubmit={handleSubmit}
        />
    
        <ModalMessage message={message} show={show} handleClose={handleClose}/>
   </div>
  );
}

export default Register;
