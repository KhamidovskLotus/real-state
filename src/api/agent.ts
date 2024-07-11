import { PaginationResult } from 'types/pagination';
import api from './api';
import endpoints from './endpoint';
import { AgentFilter } from 'states/otherSlice';

export const getAgent = async (filter: AgentFilter): Promise<PaginationResult<Agent> | null> => {
  let res = await api.getBackend<PaginationResult<Agent>>(endpoints.agent.get, filter);
  if (!res) {
    return null;
  }
  return res;
};

export const getAgentById = async (id: string): Promise<Agent | null> => {
  let res = await api.getBackend<PaginationResult<Agent>>(endpoints.agent.get, {id: id});
  if (!res || res.results.length <= 0) {
    return null;
  }
  return res.results[0];
};


