
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BrandMetadata {
  name: string;
  logo: string;
  themeColors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
  };
}

const initialState: BrandMetadata | null = null;

const brandSlice = createSlice({
    name: 'brand',
    initialState,
    reducers: {
      setBrandMetadata(state, action: PayloadAction<BrandMetadata>) {
        return action.payload;
      },
    },
  });
  

export const { setBrandMetadata } = brandSlice.actions;
export default brandSlice.reducer;