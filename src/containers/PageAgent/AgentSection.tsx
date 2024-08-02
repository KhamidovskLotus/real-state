import CardAuthorBox2 from 'components/CardAuthorBox2/CardAuthorBox2';
import Heading2 from 'components/Heading/Heading2';
import { Dispatch, FC, SetStateAction } from 'react';
import AgentTabFilter from 'shared/AgentTabFilter';
import Pagination from 'shared/Pagination/Pagination';
import { PaginationResult } from 'types/pagination';

export interface AgentSectionProps {
  className?: string;
  data: PaginationResult<Agent>;
  heading?: string;
  subheading?: string;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
}

const AgentSection: FC<AgentSectionProps> = ({
  className = '',
  data,
  heading = 'Professional Independent Agents',
  subheading = `${data.count} Results Found`,
  page,
  setPage
}) => {
  return (
    <div
      className={`nc-AgentSection mt-12 ${className}`}
      data-nc-id="AgentSection"
    >
      <div className="flex gap-10">
        <Heading2
          heading={heading}
          subHeading={subheading}
        />
      </div>
      <div className="mb-8 lg:mb-11">
        <AgentTabFilter/>
      </div>
      <div className="grid grid-cols-2 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data.results.map((agent, index) => (
          <CardAuthorBox2
            key={index}
            data={agent}
          />
        ))}
      </div>
      {data.results.length > 0 &&
        <div className="flex mt-16 justify-center items-center">
          <Pagination
            currentPage={page}
            onClick={(n) => {
              setPage(n);
            }}
            maxPage={data.total_pages}
            />
        </div>
      }
    </div>
  );
};

export default AgentSection;
