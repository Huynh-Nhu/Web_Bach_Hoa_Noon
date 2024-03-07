import axios from "axios";
import { loginSuccess, logoutSuccess } from "../Redux/authSlice";
import { categorySuccess } from "../Redux/categorySlice";
import { getProductSuccess } from "../Redux/productSlice";

export const handleCallbackResponse = async (response, dispatch, navigate) => {
  try {
    const id_token = response.credential;
    const res = await axios.post("http://localhost:8080/customer/google", {
      token: id_token,
    });
    dispatch(loginSuccess(res.data));
    navigate("/");
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const loginCustomers = async (newCustomer, dispatch, navigate) => {
  try {
    const res = await axios.post(
      "http://localhost:8080/customer/login",
      newCustomer
    );
    // console.log(res.data);
    dispatch(loginSuccess(res.data));
    navigate("/");
  } catch (error) {
    console.log(error);
  }
};

export const logout = async ( dispatch, navigate) => {
  try {
    dispatch(logoutSuccess());
    navigate("/login");
  } catch (error) {
    console.log(error);
  }
};

export const getCategory = async (dispatch) => {
  try {
    const res = await axios.get(
      "http://localhost:8080/category/getAllCategory"
    );

    dispatch(categorySuccess(res.data));
  } catch (error) {
    console.log(error);
  }
};

export const getProduct = async (dispatch) => {
  try {
  const res =  await axios.get(
      "http://localhost:8080/products/product"
    );
    dispatch(getProductSuccess(res.data));
  } catch (error) {
    console.log(error);
  }
};
