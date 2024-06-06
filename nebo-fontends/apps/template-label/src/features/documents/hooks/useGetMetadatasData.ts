import { useGetMetadatasQuery } from "../../../data/mediafile.api";
import {
  FileDataFilterRequest,
  FileDataUpload,
  ListResponse,
} from "../../../types";

export type Data = {
  data: ListResponse<FileDataUpload>;
  isLoading?: boolean;
  isFetching?: boolean;
};

export const useGetMetadatasData = (filter: FileDataFilterRequest): Data => {
  const {
    data: fileMetadatas = {
      data: [],
      metadata: { total_element: 0, page: 1, limit: filter.limit || 20 },
    } as ListResponse<FileDataUpload>,
    isLoading,
    isFetching,
  } = useGetMetadatasQuery({ ...filter });

  return {
    isLoading,
    isFetching,
    data: fileMetadatas,
  };
};
