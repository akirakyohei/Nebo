import { useHydrated } from "remix-utils/use-hydrated";
import { WebBuilder } from "../../../features/documents/grapesjs.client.js";
import { useParams } from "@remix-run/react";
import { toNumber } from "lodash-es";
import { useGetTemplateQuery } from "../../../data/template.api.js";

const useLoadData = () => {
  const params = useParams();
  const idStr = params["id"];
  const id = toNumber(idStr);
  const isCreate = !!id;
  const urlSearchParams = new URLSearchParams();
  const copyIdStr = urlSearchParams.get("copy_id");
  const copyId = toNumber(copyIdStr);
  const templateId = !isCreate ? id : copyId;
  const {
    data: template,
    isLoading,
    isFetching,
  } = useGetTemplateQuery(templateId, { skip: !templateId });
  return { template, isCreate, id, copyId, isLoading, isFetching };
};

export default function EditorManager() {
  const { template, isCreate, id, copyId, isLoading, isFetching } =
    useLoadData();

  const isHydrated = useHydrated();
  if (isHydrated)
    return (
      <WebBuilder
        template={{
          id: 0,
          name: "",
          width: 0,
          height: 0,
          data: [],
          category_ids: [],
          params: undefined,
          size: 0,
          createdOn: "",
          updatedOn: "",
        }}
      />
    );
  return null;
}
