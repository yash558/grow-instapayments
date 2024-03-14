import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartState {
  items: any[];
  totalAmount: number;
}

const initialState: CartState = {
  items: [],
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<any[]>) {
      state.items = action.payload;
    },
    setTotalAmount(state, action: PayloadAction<number>) {
      state.totalAmount = action.payload;
    },
    updateItemQuantity(state, action: PayloadAction<{ itemId: string; quantity: number }>) {
      const { itemId, quantity } = action.payload;
      const itemIndex = state.items.findIndex((item) => item.id === itemId);
      if (itemIndex !== -1) {       
        state.items[itemIndex].quantity = Math.max(quantity, 0);        
        state.totalAmount = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
      }
    },
  },
});

export const { setItems, setTotalAmount, updateItemQuantity } = cartSlice.actions;
export default cartSlice.reducer;
