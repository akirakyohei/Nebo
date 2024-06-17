import { toNumber } from "lodash-es";
import {
  useGetTemplateQuery,
  useUpdateTemplateMutation,
} from "../../data/template.api";
import { Navigate, useParams } from "react-router-dom";
import { WebBuilderContainer } from "@repo/web-builder";
// import { WebBuilderContainer } from "../../../../../packages/web-builder/src/WebBuilderContainer";
import { NavbarMenu } from "./components/navbar/NavbarMenu";
import { useRef, useState } from "react";
import { Page } from "../../components/Page";
import { Box, Grid } from "@mui/material";
import { FileDataUploadRequest, Template } from "../../types";
import { useToast } from "../../components/notification/useToast";
import { isClientError } from "../../utils/client";
import { WorkspacePageSkeleton } from "./components/WorkspacePageSkeleton";
import {
  PreviewContainer,
  PreviewRef,
} from "./components/preview/PreviewContainer";
import { defaultBlankTemplate } from "../../constants";
import { AssetUploadList } from "./components/AssetUploadList";
import { useUploadFileMutation } from "../../data/mediafile.api";
import { getUrlAsset } from "../../utils/base";
import { Data } from "@repo/web-builder";
import { useEvaluateTemplateUserPermissionsQuery } from "../../data/template_permission.api";
export default function EditorManagePage() {
  const { show: showToast } = useToast();
  const params = useParams();
  const idStr = params["id"];
  const id = toNumber(idStr);
  const previewRef = useRef<PreviewRef>(null);
  const isPreviewing = location.pathname.endsWith("/preview");

  const {
    data: template = defaultBlankTemplate,
    isLoading: isLoadingTemplate,
    isFetching: isFetchingTemplate,
  } = useGetTemplateQuery(id, { skip: !id });

  const {
    data: userPermissions = [],
    isLoading: isLoadingUserPermission,
    isFetching: isFetchingUserPermission,
  } = useEvaluateTemplateUserPermissionsQuery([template.id], {
    skip: !template.id || !template.active,
  });

  const [updateTemplate, { isLoading: isloadingUpdateTemplate }] =
    useUpdateTemplateMutation();

  const [uploadFile] = useUploadFileMutation();

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

  const handleUploadFile = async (data: FileDataUploadRequest) => {
    try {
      const res = await uploadFile({
        name: data.name,
        content_type: data.content_type,
        data: data.data,
      }).unwrap();
      showToast("tải file thành công");
      return getUrlAsset(`/api/files/data/${res.key}`);
    } catch (ex) {
      if (isClientError(ex)) {
        let error = ex.data.message;
        if (/Authenticated/.test(error)) {
          showToast("Lưu mẫu thất bại thành công trước đó");
          return null;
        }

        if (/Email or password incorrect/.test(error))
          error = "Tài khoản không tồn tại hoặc mật khẩu không đúng";
        if (/Phone number or password incorrect/.test(error))
          error = "Tài khoản không tồn tại hoặc mật khẩu không đúng";
        showToast(error, { variant: "error" });
      }
    }
    return null;
  };

  const isLoading = isLoadingTemplate || isLoadingUserPermission;
  const isFetching = isFetchingTemplate || isFetchingUserPermission;

  if (isLoading) return <WorkspacePageSkeleton />;

  if (!template) return <Navigate to={"/"} />;

  if (!template.active) {
    showToast("Mẫu đang ở trạng thái ko hoạt động chỉ có thể xem");
    return <Navigate to={`/documents/templates`} />;
  }
  if (
    userPermissions.length === 0 ||
    !userPermissions[0].permissions.includes("write")
  ) {
    showToast("Bạn không có quyền chỉnh sửa mẫu");
    return <Navigate to={`/documents/templates`} />;
  }

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
              isloadingUpdateTemplate={isloadingUpdateTemplate}
              isDesigning={!isPreviewing}
              downloadTemplate={() => previewRef.current?.downloadTemplate()}
              printTemplate={() => previewRef.current?.printTemplate()}
            />
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
                template={{
                  ...template,
                  thumbnail:
                    template.thumbnail === null
                      ? null
                      : { ...template.thumbnail },
                }}
                onUpdate={handleUpdateTemplate}
                showToast={(msg, options) =>
                  showToast(
                    msg,
                    options !== undefined
                      ? { variant: options.isError ? "error" : undefined }
                      : undefined
                  )
                }
                uploadFile={async (data) => handleUploadFile({ ...data })}
                moreAssets={({ select }) => (
                  <AssetUploadList onSelect={select} />
                )}
              />
            ) : (
              <PreviewContainer
                ref={previewRef}
                loadingTemplate={isFetching}
                template={template}
              />
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
