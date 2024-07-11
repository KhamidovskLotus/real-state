import BgGlassmorphism from 'components/BgGlassmorphism/BgGlassmorphism';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { StoreState } from 'states/store';
import { PaginationResult } from 'types/pagination';
import { getAgent } from 'api/agent';
import AgentSection from './AgentSection';

export default function PageAgent() {
  const agentFilter = useSelector((store: StoreState) => store.other.agentFilter)
  
  const [page, setPage] = useState<number>(1);
  const { data , refetch} = useQuery<PaginationResult<Agent> | null, Error>('agent', () => getAgent({...agentFilter, page}));
  
  useEffect(() => {
    refetch()
  }, [page, agentFilter])

  if (!data) {
    return <></>;
  }
  return (
    <div
      className={`nc-ListingStayPage relative overflow-hidden`}
      data-nc-id="ListingStayPage"
    >
      <BgGlassmorphism />
      <div className="container min-h-[70vh] relative overflow-hidden pb-28">
        <AgentSection
          page={page}
          setPage={setPage}
          data={data}
          className=""
        />
      </div>
    </div>
  );
}
