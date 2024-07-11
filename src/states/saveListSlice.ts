import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import api from 'api/api';
import endpoints from 'api/endpoint';
import { Property } from 'types/property';

export type SaveListState = {
  datas: Map<number, Property>;
  agentDatas: Map<number, Agent>;
};

const initialState: SaveListState = {
  datas: new Map(),
  agentDatas: new Map()
};

const SaveListSlice = createSlice({
  name: 'saveList',
  initialState,
  reducers: {
    setSaveList: (state, action: PayloadAction<Property[]>) => {
      for (const property of action.payload) {
        state.datas.set(property.property_id, property);
      }
    },
    resetSaveList: (state, action) => {
      state.datas = new Map();
      state.agentDatas = new Map();
    },
    setAgentSaveList: (state, action: PayloadAction<Agent[]>) => {
      for (const agent of action.payload) {
        state.agentDatas.set(agent.id, agent);
      }
    },
    addSaveList: (state, action: PayloadAction<Property>) => {
      api.mutateBackend(endpoints.saveList.add, {property: action.payload.property_id}, undefined, false)
      state.datas.set(action.payload.property_id, action.payload);
    },
    removeSaveList: (state, action: PayloadAction<Property>) => {
      api.mutateBackend(endpoints.saveList.delete, undefined, action.payload.property_id.toString(), false)
      state.datas.delete(action.payload.property_id);
    },
    addAgentSaveList: (state, action: PayloadAction<Agent>) => {
      api.mutateBackend(endpoints.saveList.addAgent, {agent: action.payload.id}, undefined, false)
      state.agentDatas.set(action.payload.id, action.payload);
    },
    removeAgentSaveList: (state, action: PayloadAction<Agent>) => {
      api.mutateBackend(endpoints.saveList.deleteAgent, undefined, action.payload.id.toString(), false)
      state.agentDatas.delete(action.payload.id);
    },
  },
});

export const { resetSaveList, addSaveList, removeSaveList, addAgentSaveList, removeAgentSaveList, setSaveList, setAgentSaveList } = SaveListSlice.actions;
const SaveListReducer = SaveListSlice.reducer;
export default SaveListReducer;
