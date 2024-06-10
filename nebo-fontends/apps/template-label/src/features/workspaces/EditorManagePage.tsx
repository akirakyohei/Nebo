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
import { WorkspacePageSkeleton } from "./components/WorkspacePageSkeleton";
import { PreviewContainer } from "./components/preview/PreviewContainer";

export default function EditorManagePage() {
  const { show: showToast } = useToast();
  const params = useParams();
  const idStr = params["id"];
  const id = toNumber(idStr);
  const [designing, setDesigning] = useState(true);
  const isPreviewing = location.pathname.endsWith("/preview");

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
  } = useGetTemplateQuery(id, { skip: !id });

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

  if (isLoading) return <WorkspacePageSkeleton />;

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
            <NavbarMenu template={template} isDesigning={!isPreviewing} />
          </Grid>
          <Grid
            item
            width={"100%"}
            flexGrow={"1"}
            overflow={"hidden"}
            marginBottom={"auto"}
            position={"relative"}
          >
            {!isPreviewing ? (
              <WebBuilderContainer
                designingMode={designing}
                template={template}
                onUpdate={handleUpdateTemplate}
              />
            ) : (
              <PreviewContainer template={template} />
            )}
          </Grid>
        </Grid>
      </Page>
    </>
  );
}

// export default function EditorManagePage() {
//   return <div>fkjdnf</div>;
// }
