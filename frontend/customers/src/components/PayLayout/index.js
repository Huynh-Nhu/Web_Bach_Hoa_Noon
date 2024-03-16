import { useEffect } from "react";
import { addPay } from "../../service/apiCustomer";

function PayLayout(props) {
    const { customer , address}  = props;

    const handlePay = (id) => {
        addPay(id)
    }

    useEffect(()=> {
        
    }, [])

    return ( 
       <button onClick={() => {handlePay(customer?.customer._id)}}>
        Thanh toán
       </button>
    );
}

export default PayLayout;