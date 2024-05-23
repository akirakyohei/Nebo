import { storefontApi, transformAxiosErrorResponse } from "./api";
import { PaperType } from "../types";

const paperTypeApi = storefontApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllPaperTypes: builder.query<PaperType[], void>({
      query: (q) => `/api/paper_types`,
      transformErrorResponse: transformAxiosErrorResponse,
      transformResponse: (res: { paper_types: PaperType[] }) => res.paper_types,
    }),
  }),
});

export const { useGetAllPaperTypesQuery } = paperTypeApi;
