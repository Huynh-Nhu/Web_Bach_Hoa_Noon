import { useEffect } from "react";
import Orderlayout from "../../components/Orderlayout";
import { getAllOrder } from "../../Redux/apiOrder";
import { useDispatch, useSelector } from "react-redux";
import { confirmOrder } from "../../Redux/apiOrder";

function OrderPage() {
  const dispatch = useDispatch();
  const order = useSelector((state) => state.order.getAllOrder.allOrder);
  const idStaff = useSelector((state) => state.auth?.login?.currentUser?._id);
console.log(idStaff);
  const handleConfirm = (idOrder) => {
    confirmOrder(idOrder, idStaff).then(() => {
      getAllOrder(dispatch)
    });
  };
  useEffect(() => {
    getAllOrder(dispatch);
  }, [dispatch]);
  return (
    <Orderlayout handleConfirm={handleConfirm} order={order}  />
  );
}

export default OrderPage;
