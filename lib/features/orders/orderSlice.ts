

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface OrderItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

interface OrderState {
  items: OrderItem[];
  totalAmount: number;
  orderDetails: {
    address: string;
    phoneNo: string;
    discountAmount?: number;    
  }; 
}

const initialState: OrderState = {
  items: [],
  totalAmount: 0,
  orderDetails: {
    address: '',
    phoneNo: '',
    discountAmount: 0,
  },
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrderItems(state, action: PayloadAction<OrderItem[]>) {
      state.items = action.payload;
    },
    setOrderAmount(state, action: PayloadAction<number>) {
      state.totalAmount = action.payload;
    },
    setOrderDetails(state, action: PayloadAction<{ address: string; phoneNo: string; discountAmount: number }>) {
      state.orderDetails = action.payload;
    },
   
  },
});

export const { setOrderItems, setOrderAmount, setOrderDetails } = orderSlice.actions;

export default orderSlice.reducer;
