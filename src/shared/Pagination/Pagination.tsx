import { FC } from 'react';
import twFocusClass from 'utils/twFocusClass';

export interface PaginationProps {
  className?: string;
  currentPage?: number;
  onClick?: (n: number) => void;
  maxPage?: number;
}

const MAX_PAGINATION = 5;
const Pagination: FC<PaginationProps> = ({
  className = '',
  currentPage = 1,
  maxPage = 1,
  onClick,
}) => {
  const getPaginationItems = () => {
    let startPage = Math.max(currentPage - Math.floor(MAX_PAGINATION / 2), 1);
    let endPage = startPage + MAX_PAGINATION - 1;

    if (endPage > maxPage) {
      endPage = maxPage;
      startPage = Math.max(endPage - MAX_PAGINATION + 1, 1);
    }

    const paginationItems: number[] = [];
    for (let i = startPage; i <= endPage; i++) {
      paginationItems.push(i);
    }

    return paginationItems;
  };

  const item: number[] = getPaginationItems();

  const renderItem = (pag: number, index: number) => {
    if (pag === currentPage) {
      return (
        <span
          key={index}
          className={`inline-flex w-11 h-11 items-center justify-center rounded-full bg-primary-6000 text-white ${twFocusClass()}`}
        >
          {pag}
        </span>
      );
    }
    return (
      <div
        onClick={() => onClick && onClick(pag)}
        key={index}
        className={`cursor-pointer inline-flex w-11 h-11 items-center justify-center rounded-full bg-white hover:bg-neutral-100 border border-neutral-200 text-neutral-6000 dark:text-neutral-400 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:border-neutral-700 ${twFocusClass()}`}
      >
        {pag}
      </div>
    );
  };

  return (
    <nav
      className={`nc-Pagination inline-flex space-x-1 text-base font-medium ${className}`}
    >
      {item.map(renderItem)}
    </nav>
  );
};

export default Pagination;
