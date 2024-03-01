import { Link, useNavigate } from "react-router-dom";
import "../Sidebar/Sidebar.css";
import {  useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LogOut } from "../../../../Redux/apiRequest";
import { createAxios } from "../../../../Redux/createdInstance";
import { logoutSuccess } from "../../../../Redux/authSlice";

function Sidebar() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const user = useSelector((state) => state.auth.login.currentUser);
    const dispatch= useDispatch();
    const navigate = useNavigate()
    let axiosJWT = createAxios(user,dispatch,logoutSuccess)

    const hanldeDropdownToggle = () =>{
        setIsDropdownOpen(!isDropdownOpen)
    };
    const handleLogout = () => {
      LogOut(dispatch,user?.accessToken,user?.refreshToken,navigate,axiosJWT);
    }
  
  return (
    <div className="wrapper-sidebar">
      <ul className="ul-sidebar">
        {user? (   
        <li>
          <div className="user-view position-relative">
            <div className="background-user-view">
              <img
                className="img-background"
                src="/assets/img/logo/background_view.jpg"
              />
            </div>
            <div className="position-absolute top-0 start-0">
                <img className="img_admin " src="assets/img/logo/1.png" />
              
            </div>
            <div className=" position-absolute top-50 start-50 translate-middle">
              <Link className="name_admin">
                
                <span>{user.nameStaff}</span>
              </Link>
            </div>
          </div>
        </li>
        ): <div></div>}
        <li>
          <div className="link-sidebar list-group">
            <Link to='/Staff'>
              Staff
            </Link>
            <Link to="/">
              home
            </Link>
            <Link to='/category' >
              Products
            </Link>
            <Link to="/brand" >
              Brand
            </Link>
          </div>
        </li>

        <li className="footer_side">
            <div className="dropdown">
                <button className="dropdownButton" onClick={hanldeDropdownToggle}>
                    Settings
                </button>
                {isDropdownOpen && (
                    <div className="dropdownContent">
                       <Link to='/login' onClick={handleLogout}>
                        Log out
                       </Link>
                       <Link to = "/passStaff">
                          Đặt lại pass
                       </Link>
                       
                    </div>
                )}
            </div>
        </li>

      </ul>
    </div>
  );
}

export default Sidebar;
