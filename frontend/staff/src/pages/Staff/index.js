import { useEffect } from "react";
import { getAllStaff } from "../../Redux/apiRequest";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createAxios } from "../../Redux/createdInstance";
import { loginSuccess, refreshTokenSuccess } from "../../Redux/authSlice";

function Staff() {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const ListStaff = useSelector((state) => state.user.getAllUsers?.allUsers);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let axiosJWT = createAxios(user, dispatch, refreshTokenSuccess);
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    if (user?.accessToken) {
      getAllStaff(user?.accessToken, dispatch, axiosJWT);
    }
  }, []);

  return (
    <div className="list_staff">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Tên khách hàng</th>
            <th scope="col">SĐT</th>
            <th scope="col">Email</th>
            <th scope="col">Địa chỉ</th>
          </tr>
        </thead>
        <tbody>
          {ListStaff?.map((allUsers, index) => (
            <tr key={allUsers.id}>
              <th scope="row">{index + 1}</th>
              <td>{allUsers.nameStaff}</td>
              <td>{allUsers.phoneStaff}</td>
              <td>{allUsers.emailStaff}</td>
              <td>{allUsers.addressStaff}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Staff;
