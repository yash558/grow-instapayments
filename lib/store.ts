import { configureStore } from '@reduxjs/toolkit';
import  cartReducer  from './features/cart/cartSlice';
import paymentReducer  from './features/payment/paymentSlice';
import orderReducer from './features/orders/orderSlice'
import brandReducer from './features/brand/brandSlice'
import darkModeReducer from "./features/darkMode/darkModeSlice"

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    payment: paymentReducer,
    order: orderReducer,
    brand : brandReducer,
    darkMode: darkModeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
