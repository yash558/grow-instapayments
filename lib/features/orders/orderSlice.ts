

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
  discountAmount: number;    
  orderDetails: {
    address: string;
    phoneNo: string;
  }; 
}

const initialState: OrderState = {
  items: [],
  totalAmount: 0,
  discountAmount: 0,
  orderDetails: {
    address: '',
    phoneNo: '',   
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
    setDiscountAmount(state, action: PayloadAction<number>) {
      state.discountAmount = action.payload;
    },
    setOrderDetails(state, action: PayloadAction<{ address: string; phoneNo: string; }>) {
      state.orderDetails = action.payload;
    },
    
   
  },
});

export const { setOrderItems, setOrderAmount, setOrderDetails, setDiscountAmount } = orderSlice.actions;

export default orderSlice.reducer;
