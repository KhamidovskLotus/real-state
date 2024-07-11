import { getInquiries } from 'api/inquiries';
import BgGlassmorphism from 'components/BgGlassmorphism/BgGlassmorphism';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useQuery } from 'react-query';
import { Inquiries } from 'types/inquiries';
import { PaginationResult } from 'types/pagination';
import InquiriesSection from './InquiriesSection';

export default function ManageInquiriesPage() {
  const [page, setPage] = useState<number>(1);
  const { data, refetch } = useQuery<PaginationResult<Inquiries> | null, Error>(
    'enquiries',
    () => getInquiries({ page })
  );

  useEffect(() => {
    refetch();
  }, [page]);

  return (
    <div
      className={`nc-ListingStayPage relative  overflow-hidden`}
      data-nc-id="ListingStayPage"
    >
      <BgGlassmorphism />
      <div className="container relative min-h-[70vh] overflow-hidden">
        {data && (
          <InquiriesSection
            page={page}
            setPage={setPage}
            data={data}
            className="pt-24 pb-24 lg:pb-28"
          />
        )}
      </div>
    </div>
  );
}
