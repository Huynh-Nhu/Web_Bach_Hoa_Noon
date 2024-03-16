import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
function RegisterLayout(props) {
  const {
    nameCustomer,
    passwordCustomer,
    phoneCustomer,
    emailCustomer,
    nameAddress,
    handleNameCustomer,
    handlePasswordCustomer,
    handlePhoneCustomer,
    handleEmailCustomer,
    handleAddressCustomer,
    handleSubmit,
  } = props;

  const handleNameCustomerChange = (e) => {
    const name = e.target.value;
    handleNameCustomer(name)
  }

  const handlePasswordCustomerChange = (e) => {
    const password = e.target.value;
    handlePasswordCustomer(password)
  }

  const handleEmailCustomerChange = (e) => {
    const email = e.target.value;
    handleEmailCustomer(email)
  }

  const handleAddressCustomerChange = (e) => {
    const address = e.target.value;
    handleAddressCustomer(address)
  }

  const handlePhoneCustomerChange = (e) => {
    const phone = e.target.value;
    handlePhoneCustomer(phone)
  }
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="nameRegister">
        <Form.Label>Ten</Form.Label>
        <Form.Control value={nameCustomer} onChange={handleNameCustomerChange} type="text" placeholder="" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="phoneRegister">
        <Form.Label>SĐT</Form.Label>
        <Form.Control value={phoneCustomer} onChange={handlePhoneCustomerChange} type="text" placeholder="" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="emailRegister">
        <Form.Label>Emails</Form.Label>
        <Form.Control value={emailCustomer} onChange={handleEmailCustomerChange} type="email" placeholder="" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="addressRegister">
        <Form.Label>Địa chỉ</Form.Label>
        <Form.Control value={nameAddress} onChange={handleAddressCustomerChange} type="text" placeholder="" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="passwordRegister">
        <Form.Label>Password</Form.Label>
        <Form.Control value={passwordCustomer} onChange={handlePasswordCustomerChange} type="password" placeholder="" />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default RegisterLayout;
