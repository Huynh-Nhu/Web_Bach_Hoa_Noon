import { Link } from "react-router-dom";
import InforCustomer from "../../../InforCutomer";
import "../Header/header.css";
import InconCart from "../../../inconCart";
import { useSelector } from "react-redux";

function Header() {
 
  return (
    <div className="container ">
      <div className="header">
        <Link to="/"><div className="logo">Logo</div></Link>
        <div className="search">Search</div>
        <Link  to="/cart"><div className="cart">
            <InconCart/>
          </div></Link>
        <div className="customer-info">
          <InforCustomer />
        </div>
      </div>
    </div>
  );
}

export default Header;
