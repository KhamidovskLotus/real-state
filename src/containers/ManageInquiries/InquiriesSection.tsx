import Heading2 from 'components/Heading/Heading2';
import { Dispatch, FC, SetStateAction } from 'react';
import Avatar from 'shared/Avatar/Avatar';
import Badge from 'shared/Badge/Badge';
import Pagination from 'shared/Pagination/Pagination';
import { Inquiries } from 'types/inquiries';
import { PaginationResult } from 'types/pagination';

export interface InquiriesSectionProps {
  className?: string;
  data: PaginationResult<Inquiries>;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
}

const InquiriesSection: FC<InquiriesSectionProps> = ({
  className = '',
  data,
  page,
  setPage,
}) => {
  return (
    <div
      className={`nc-InquiriesSection ${className}`}
      data-nc-id="InquiriesSection"
    >
      <div className="flex gap-10">
        <Heading2
          heading="My Inquiries"
          subHeading={`${data.count} Results Found`}
        />
      </div>

      <div className="grid grid-cols-2 gap-20">
        {data.results.map((inquiries) => (
          <InquiriesCard inquiries={inquiries}></InquiriesCard>
        ))}
      </div>
      {data.results.length > 0 &&
      <div className="flex mt-16 justify-center items-center">
        <Pagination
          maxPage={data.total_pages}
          currentPage={page}
          onClick={(n) => setPage(n)}
          />
      </div>
        }
    </div>
  );
};

export default InquiriesSection;

type InquiriesCardProps = {
  inquiries: Inquiries;
};

function InquiriesCard({ inquiries }: InquiriesCardProps) {
  return (
    <div className="w-full h-full flex flex-col gap-2">
      <div className="nc-PostMeta2 flex items-center flex-wrap text-neutral-700 text-left dark:text-neutral-200 text-sm leading-none flex-shrink-0">
        <Avatar
          containerClassName="flex-shrink-0"
          sizeClass="w-8 h-8 sm:h-11 sm:w-11 "
        />
        <div className="ml-3">
          <div className="flex items-center">
            <a className="block font-semibold" href="/">
              {inquiries.customer_email}
            </a>
          </div>
          <div className="text-xs mt-[6px] flex gap-2 items-center">
            <span className="text-neutral-700 dark:text-neutral-300">
              {inquiries.customer_contact}
            </span>
            <Badge
              color={inquiries.inquiry_status ? 'green' : 'red'}
              name={inquiries.inquiry_status ? 'Active' : 'Not Active'}
            ></Badge>
          </div>
        </div>
      </div>
      <div className="h-full px-2 py-2 text-sm">
        {inquiries.customer_message}
      </div>
      <hr className="w-full my-5 h-[1px] bg-stone-500" />
    </div>
  );
}
