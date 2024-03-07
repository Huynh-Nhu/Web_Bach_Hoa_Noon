import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
function LoginLayout(props) {
  const handleChangeEmailPhone = (e) => {
    const email = e.target.value;
    props.handleEmailOrPhone(email);
  };
  const handleChangePassword = (e) => {
    const password = e.target.value;
    props.handlePassword(password);
  };
  return (
    <Form onSubmit={props.handlSubmit}>
      <Form.Group as={Row} className="mb-3" controlId="emailCustomer">
        <Form.Label column sm={2}>
          Email hoăc SĐT
        </Form.Label>
        <Col sm={10}>
          <Form.Control
            value={props.nameCustomer}
            type="text"
            placeholder="Email"
            onChange={handleChangeEmailPhone}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="passwordCustomer">
        <Form.Label column sm={2}>
          Password
        </Form.Label>
        <Col sm={10}>
          <Form.Control
            value={props.passwordCustomer}
            type="password"
            placeholder="Password"
            onChange={handleChangePassword}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Col sm={{ span: 10, offset: 2 }}>
          <Button type="submit">Sign in</Button>
        </Col>
      </Form.Group>
    </Form>
  );
}

export default LoginLayout;
