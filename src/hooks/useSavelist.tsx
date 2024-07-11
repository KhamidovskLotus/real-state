import api from "api/api";
import endpoints from "api/endpoint";
import { getDummyPhoto } from "api/property";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { setAgentSaveList, setSaveList } from "states/saveListSlice";
import { StoreState } from "states/store";
import { PaginationResult } from "types/pagination";
import { Property, PropertySaveList } from "types/property";
import { stopCoverage } from "v8";

export default function useSaveList(){
  const dispatch = useDispatch(); 
  const user = useSelector((store: StoreState) => store.user.current);
  // const saveListData = useSelector((store: StoreState) => store.saveList.datas)

  // useEffect(() => {
  //   console.log('savelist data : ', saveListData)
  // }, [saveListData])

  useQuery<PaginationResult<PropertySaveList> | null, Error>('saveList', async () => user ? await api.getBackend(endpoints.saveList.get) : null, {
    onSuccess(data) {
      if(data){
        dispatch(setSaveList(data.results.map((r) => {
          if (r.property.images.length <= 0) {
            r.property.images = getDummyPhoto();
          }
          return r.property;
        })))
      }
    }
  });
  useQuery<PaginationResult<AgentSaveList> | null, Error>('agentSaveList', async () =>  user ? await api.getBackend(endpoints.saveList.getAgent) : null, {
    onSuccess(data) {
      if(data){
        dispatch(setAgentSaveList(data.results.map((r) => r.agent)))
      }
    }
  });
}