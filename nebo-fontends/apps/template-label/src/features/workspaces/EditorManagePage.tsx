import { WebBuilder } from "./components/WebBuilder.js";
import { toNumber } from "lodash-es";
import { useGetTemplateQuery } from "../../data/template.api.js";
import { useParams } from "react-router-dom";

export default function EditorManager() {
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
    isLoading: isLoading,
    isFetching: isFetching,
  } = useGetTemplateQuery(templateId, { skip: !templateId });

  return (
    <WebBuilder
      template={{
        id: 0,
        name: "",
        width: 1000,
        height: 1000,
        data: [],
        category_ids: [],
        params: undefined,
        size: 0,
        created_on: "",
        updated_on: "",
      }}
    />
  );
}
