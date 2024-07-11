import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type ThemeList = 'dark' | 'light';
export type ThemeState = {
  current: ThemeList;
};

const initialState: ThemeState = {
  current: localStorage ? localStorage.theme : 'light'
};

const themeSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ThemeList>) => {
      state.current = action.payload;
    },
  },
});

export const { setTheme } = themeSlice.actions;
const themeReducer = themeSlice.reducer;
export default themeReducer;
