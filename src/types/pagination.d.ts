export type PaginationResult<T> = {
  links: {
    next: string | null;
    prev: string | null;
  };
  page_size: number;
  count: number;
  results: Array<T>;
  total_pages: number;
};
