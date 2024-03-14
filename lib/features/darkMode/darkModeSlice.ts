import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DarkModeState {
  darkMode: boolean;
  themeColors: Record<string, string>; 
}

const initialState: DarkModeState = {
  darkMode: false,
  themeColors: {
    background: "hsl(20, 14.3%, 4.1%)",
    foreground: "hsl(60, 9.1%, 97.8%)",
    primary: "hsl(47.9, 95.8%, 53.1%)",
    primaryForeground: "hsl(26, 83.3%, 14.1%)"
  },
};

const darkModeSlice = createSlice({
  name: 'darkMode',
  initialState,
  reducers: {
    toggleDarkMode(state) {
      state.darkMode = !state.darkMode;
    },
    setThemeColors(state, action: PayloadAction<Record<string, string>>) {
      state.themeColors = action.payload;
    },
  },
});

export const { toggleDarkMode, setThemeColors } = darkModeSlice.actions;
export default darkModeSlice.reducer;
