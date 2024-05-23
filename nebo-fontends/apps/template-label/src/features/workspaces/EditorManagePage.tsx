import { toNumber } from "lodash-es";
import { useGetTemplateQuery } from "../../data/template.api";
import { Navigate, useParams } from "react-router-dom";
// import { WebBuilderContainer } from "@repo/web-builder";
import { WebBuilderContainer } from "../../../../../packages/web-builder/src/WebBuilderContainer";
import { NavbarMenu } from "./components/navbar/NavbarMenu";
import { useState } from "react";
import { Page } from "../../components/Page";
import { Box, Grid } from "@mui/material";
import { Template } from "../../types";

export default function EditorManager() {
  const params = useParams();
  const idStr = params["id"];
  const id = toNumber(idStr);
  const isCreate = !!id;
  const urlSearchParams = new URLSearchParams();
  const copyIdStr = urlSearchParams.get("copy_id");
  const copyId = toNumber(copyIdStr);
  const templateId = !isCreate ? id : copyId;
  const [designing, setDesigning] = useState(true);

  const {
    data: template = { id: 3, name: "tes" } as Template,
    isLoading: isLoading,
    isFetching: isFetching,
  } = useGetTemplateQuery(templateId, { skip: !templateId });

  const handleChangeMode = (_value: boolean) => {
    setDesigning(_value);
  };

  if (isLoading) return <div>Loading...</div>;

  if (!template) return <Navigate to={"/"} />;

  return (
    <>
      {/* <App /> */}
      <Page fullHeight spacing={0} contentSpacing={0}>
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
            <WebBuilderContainer designingMode={designing} />
          </Grid>
        </Grid>
      </Page>
    </>
  );
}
