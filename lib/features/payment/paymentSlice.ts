import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PaymentState {
  selectedMethod: string | null;
  transactionStatus: string | null;
  methods: string[]; 
}

const initialState: PaymentState = {
  methods: [
    'Credit Card',
    'Debit Card',
    'PayPal',
    'Apple Pay'
  ],
  selectedMethod: null,
  transactionStatus: null,
};

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    setMethods(state, action: PayloadAction<string[]>) {
      state.methods = action.payload;
    },
    setSelectedMethod(state, action: PayloadAction<string>) {
      state.selectedMethod = action.payload;
    },
  },
});

export const { setMethods, setSelectedMethod } = paymentSlice.actions;
export default paymentSlice.reducer;
