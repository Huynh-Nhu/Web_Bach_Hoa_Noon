import { createSlice } from "@reduxjs/toolkit";

const OrderShipperSlice = createSlice({
    name: 'orderShipper',
    initialState: {
        orderShipper : {
            allOrderShipper : null,
        }
    },
    reducers: {
       orderShipperSuccess: (state, action) => {
            state.orderShipper.allOrderShipper =action.payload
        }
    }
})

export const {
   orderShipperSuccess
} = OrderShipperSlice.actions

export default OrderShipperSlice.reducer;