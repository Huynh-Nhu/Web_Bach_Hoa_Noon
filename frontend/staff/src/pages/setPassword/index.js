import { useState } from "react";
import SetPasswordFrom from "../../components/setPassword";
import {setPass} from "../../Redux/apiRequest"
import { useDispatch, useSelector } from "react-redux";
import { createAxios } from "../../Redux/createdInstance";
import { setPassSuccess } from "../../Redux/userSlice";
import { useNavigate } from "react-router-dom";
import { refreshTokenSuccess } from "../../Redux/authSlice";

function SetPassword() {
   const user = useSelector((state) => state.auth.login?.currentUser)
   const dispatch = useDispatch();
   const navigate = useNavigate()
   const [emailPass, setEmailStaff] = useState("");
   const [passwordOld, setPasswordOld] = useState("");
   const [passwordNew, setPasswordNew] = useState("");
   const [showModal, setShowModal] = useState(false);
   const [modalMessage, setModalMessage] = useState("");
   

   const handleEmailChangePass = (emailStaff) => {
      setEmailStaff(emailStaff)
   };
   const handlePasswordOldChange = (passwordOld) => {
      setPasswordOld(passwordOld)
   };
   const handlePasswordNewChange = (passwordNew) => {
      setPasswordNew(passwordNew)
   }
   let axiosJWT = createAxios(user,dispatch,refreshTokenSuccess)

   if(!user){
      navigate("/login")
   } 
   const handleSetPass = (e) => {
      e.preventDefault();
      const newSetPass = {
         email: emailPass,
         password: passwordOld,
         passwordNew: passwordNew,
      }
      console.log(newSetPass);
      setPass(newSetPass,dispatch,axiosJWT,user?.accessToken)
         .then((response) => {
            console.log(response.data);
            setModalMessage(response.data.message);
            setShowModal(true);  
         })
         .catch((error) => {
            setModalMessage("set password failed" + error.message);
            setShowModal(true);
         });
   }

   const handleCloseModal = () => {
      setShowModal(false);
      setModalMessage("")
   }


    return ( 
     <div>
        <SetPasswordFrom
        handleEmailChange={handleEmailChangePass}
        handlePasswordNewChange={handlePasswordNewChange}
        handlePasswordOldChange={handlePasswordOldChange}
        handleSetPass={handleSetPass}
        emailStaff={emailPass}
        passwordOld={passwordOld}
        passwordNew={passwordNew}
        showModal= {showModal}
        modalMessage={modalMessage}
        handleCloseModal={handleCloseModal}
        />
     </div>
     );
}

export default SetPassword;