import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type ToPage = 'buy' | 'rent' | 'sell';

export type AgentFilter = {
  languages?: string;
  city?: string;
  username?: string;
  page?: number;
}

export type OtherState = {
  toPage: ToPage;
  agentFilter: AgentFilter;
};

const initialState: OtherState = {
  toPage: 'buy',
  agentFilter: {
    page: 1,
    city: '',
    languages: '',
    username: ''
  }
};

const otherSlice = createSlice({
  name: 'other',
  initialState,
  reducers: {
    setToPage: (state, action: PayloadAction<ToPage>) => {
      state.toPage = action.payload;
    },
    setAgentFilter: (state, action: PayloadAction<AgentFilter>) => {
      state.agentFilter = action.payload;
    }
  }
});

export const { setToPage, setAgentFilter } = otherSlice.actions;
const otherReducer = otherSlice.reducer;
export default otherReducer;
