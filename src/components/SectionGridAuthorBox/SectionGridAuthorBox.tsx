import { getAgent } from 'api/agent';
import CardAuthorBox from 'components/CardAuthorBox/CardAuthorBox';
import CardAuthorBox2 from 'components/CardAuthorBox2/CardAuthorBox2';
import Heading from 'components/Heading/Heading';
import { DEMO_AUTHORS } from 'data/authors';
import { AuthorType } from 'data/types';
import { FC } from 'react';
import { useQuery } from 'react-query';
import ButtonPrimary from 'shared/Button/ButtonPrimary';
import ButtonSecondary from 'shared/Button/ButtonSecondary';
import { PaginationResult } from 'types/pagination';

export interface SectionGridAuthorBoxProps {
  className?: string;
  authors?: AuthorType[];
  boxCard?: 'box1' | 'box2';
  gridClassName?: string;
}

const DEMO_DATA = DEMO_AUTHORS.filter((_, i) => i < 10);

const SectionGridAuthorBox: FC<SectionGridAuthorBoxProps> = ({
  className = '',
  authors = DEMO_DATA,
  boxCard = 'box1',
  gridClassName = 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 ',
}) => {
  const { data: agentPagination } = useQuery<PaginationResult<Agent> | null, Error>('agent', () => getAgent({}));
  const agents = agentPagination?.results;
  return (
    <div
      className={`nc-SectionGridAuthorBox relative ${className}`}
      data-nc-id="SectionGridAuthorBox"
    >
      <Heading desc="" isCenter isUseBorder className='mb-0' childrenClassName='bg-neutral-200'>
        Featured Professional Independent Agents
      </Heading>
      <span className='text-center mt-2 md:mt-3 font-normal text-base sm:text-lg text-neutral-500 dark:text-neutral-400 sm:block hidden'>Connect with Real Estate Professionals</span>
      <div className={`mt-8 grid gap-6 md:gap-8 ${gridClassName}`}>
        {agents?.map((author, index) =>
          boxCard === 'box2' ? (
            <CardAuthorBox2 key={author.id} data={author} />
          ) : (
            <CardAuthorBox
              index={index < 3 ? index + 1 : undefined}
              key={author.id}
              data={author}
            />
          )
        )}
      </div>
      <div className="mt-16 flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-5">
        <ButtonSecondary href='/agent'>More </ButtonSecondary>
        <ButtonPrimary href='/signup'>Become an Agent</ButtonPrimary>
      </div>
    </div>
  );
};

export default SectionGridAuthorBox;
