import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import api from 'api/api';
import { Token } from 'types/token';

export type UserState = {
  current?: User;
  token?: Token;
};

const initialState: UserState = {
  current: localStorage.getItem('USER')
    ? (JSON.parse(localStorage.getItem('USER') as string) as User)
    : undefined,
  token: localStorage.getItem('TOKEN')
    ? (JSON.parse(localStorage.getItem('TOKEN') as string) as Token)
    : undefined,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<User>) => {
      localStorage.setItem('USER', JSON.stringify(action.payload));
      state.current = action.payload;
    },
    setToken: (state, action: PayloadAction<Token>) => {
      localStorage.setItem('TOKEN', JSON.stringify(action.payload));
      state.token = action.payload;
      api.setToken(action.payload.access);
    },
    upsertUser: (state, action: PayloadAction<any>) => {
      state.current = { ...state.current, ...action.payload };
      localStorage.setItem('USER', JSON.stringify(state.current));
    },
    removeCurrentUser: (state, action) => {
      api.setToken('');
      localStorage.removeItem('TOKEN');
      localStorage.removeItem('USER');
      state.token = undefined;
      state.current = undefined;
    },
  },
});

export const { upsertUser, setCurrentUser, setToken, removeCurrentUser } =
  userSlice.actions;
const userReducer = userSlice.reducer;
export default userReducer;
