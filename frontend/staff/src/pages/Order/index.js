import { useEffect } from "react";
import Orderlayout from "../../components/Orderlayout";
import { getAllOrder } from "../../Redux/apiOrder";
import { useDispatch, useSelector } from "react-redux";

function OrderPage() {
    const dispatch = useDispatch()
    const order = useSelector((state) => state.order.getAllOrder.allOrder)
  const user = useSelector((state) => state.auth.login?.currentUser);

    console.log(order);
    useEffect(() => {
        getAllOrder(dispatch)

    },[])
    return (  <Orderlayout order={order} staff={user}/>);
}

export default OrderPage;