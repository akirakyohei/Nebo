export type PageFilterRequest = {
  limit?: number;
  page?: number;
};

export type Metadata = {
  page: number;
  limit: number;
  total_element: number;
};

export type ListResponse<T> = {
  data: T[];
  metadata: Metadata;
};
