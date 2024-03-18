import axios from "axios";
import {getOrderSuccess} from "../Redux/orderSlice"

export const getAllOrder = async (dispatch) => {
    try {
        const res= await axios.get("http://localhost:8080/order/getOrderAdmin")
        dispatch(getOrderSuccess(res.data))
    } catch (error) {
        console.log(error);
    }
}