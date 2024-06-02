import { toNumber } from "lodash-es";
import {
  useGetTemplateQuery,
  useUpdateTemplateMutation,
} from "../../data/template.api";
import { Navigate, useParams } from "react-router-dom";
// import { WebBuilderContainer } from "@repo/web-builder";
import {
  Data,
  WebBuilderContainer,
} from "../../../../../packages/web-builder/src/WebBuilderContainer";
import { NavbarMenu } from "./components/navbar/NavbarMenu";
import { useState } from "react";
import { Page } from "../../components/Page";
import { Box, Grid } from "@mui/material";
import { Template } from "../../types";
import { useToast } from "../../components/notification/useToast";
import { isClientError } from "../../utils/client";

export default function EditorManagePage() {
  const { show: showToast } = useToast();
  const params = useParams();
  const idStr = params["id"];
  const id = toNumber(idStr);
  const isCreate = !id;
  const urlSearchParams = new URLSearchParams();
  const copyIdStr = urlSearchParams.get("copy_id");
  const copyId = toNumber(copyIdStr);
  const templateId = !isCreate ? id : copyId;
  const [designing, setDesigning] = useState(true);

  const {
    data: template = {
      options: {
        width: "210mm",
        height: "297mm",
        margin: { top: "0px", bottom: "0px", left: "0px", right: "0px" },
        landscape: false,
      },
    },
    isLoading: isLoading,
    isFetching: isFetching,
  } = useGetTemplateQuery(templateId, { skip: !templateId });

  const [updateTemplate] = useUpdateTemplateMutation();

  const handleUpdateTemplate = (id: number, _value: Data) => {
    try {
      const res = updateTemplate({
        id: id,
        request: {
          ..._value,
        },
      });
    } catch (ex) {
      if (isClientError(ex)) {
        let error = ex.data.message;
        if (/Authenticated/.test(error)) {
          showToast("Lưu mẫu thất bại thành công trước đó");
          return;
        }

        if (/Email or password incorrect/.test(error))
          error = "Tài khoản không tồn tại hoặc mật khẩu không đúng";
        if (/Phone number or password incorrect/.test(error))
          error = "Tài khoản không tồn tại hoặc mật khẩu không đúng";
        showToast(error, { variant: "error" });
      }
    }
  };

  const handleChangeMode = (_value: boolean) => {
    setDesigning(_value);
  };

  if (isLoading) return <div>Loading...</div>;

  // if (!template) return <Navigate to={"/"} />;

  return (
    <>
      {/* <App /> */}
      <Page fullHeight fluid spacing={0} contentSpacing={0}>
        <Grid
          container
          height={"100vh"}
          width={"100vw"}
          display={"flex"}
          sx={{ flexFlow: "column" }}
          direction={"column"}
        >
          <Grid item width={"100%"}>
            <NavbarMenu
              template={template}
              isDesigning={designing}
              onChangeMode={handleChangeMode}
            />
          </Grid>
          <Grid
            item
            width={"100%"}
            flexGrow={"1"}
            overflow={"hidden"}
            marginBottom={"auto"}
          >
            <WebBuilderContainer
              designingMode={designing}
              template={template}
              onUpdate={handleUpdateTemplate}
            />
          </Grid>
        </Grid>
      </Page>
    </>
  );
}

// export default function EditorManagePage() {
//   return <div>fkjdnf</div>;
// }
