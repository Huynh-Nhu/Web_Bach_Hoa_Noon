import Header from "./Header";
import Sidebar from "./Sidebar";
import "../DefaultLayout/defaultLayout.css";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function DefaultLayout({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className={`${isMenuOpen ? "menu-open" : ""}`}>
      <div className="flex-layout">
        <div className="layout">
          {" "}
          <Header />
        </div>

        <div className="side-layout">
          {" "}
          <Sidebar isMenuOpen={isMenuOpen}  toggleMenu={toggleMenu} />
        </div>
      </div>
      <div className="container content-page">
        <div  className="content">{children}</div>
      </div>
    </div>
  );
}

export default DefaultLayout;
