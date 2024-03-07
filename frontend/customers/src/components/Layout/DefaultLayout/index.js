import Header from "./Header";
import Sidebar from "./Sidebar";
import "../DefaultLayout/defaultLayout.css";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function DefaultLayout({ children }) {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const customer = useSelector(
    (state) => state.loginCustom?.login?.currentCustomer
  );
console.log(isMenuOpen);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  useEffect(() => {
    if (!customer) {
      navigate("/login");
    }
  }, []);
  return (
    <div className={`${isMenuOpen ? "menu-open" : ""}`}>
      <div className="flex-layout">
        <div className="layout">
          {" "}
          <Header />
        </div>

        <div className="side-layout">
          {" "}
          <Sidebar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
        </div>
      </div>
      <div className="container">
        <div className="content">{children}</div>
      </div>
    </div>
  );
}

export default DefaultLayout;
