import { Link } from "react-router-dom";
import InforCustomer from "../../../InforCutomer";
import "../Header/header.css";

function Header() {
  return (
    <div className="container ">
      <div className="header">
        <Link to="/"><div className="logo">Logo</div></Link>
        <div className="search">Search</div>
        <div className="cart">Cart</div>
        <div className="customer-info">
          <InforCustomer />
        </div>
      </div>
    </div>
  );
}

export default Header;
