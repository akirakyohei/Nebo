import { WebBuilder } from "./components/WebBuilder.js";
import { toNumber } from "lodash-es";
import { useGetTemplateQuery } from "../../data/template.api.js";
import { useParams } from "react-router-dom";
// import { WebBuilderContainer } from "@repo/web-builder";
import { WebBuilderContainer } from "../../../../../packages/web-builder/src/WebBuilderContainer";
import { NavbarMenu } from "./components/navbar/NavbarMenu.js";
import { useState } from "react";
import { Page } from "../../components/Page.js";
import { Box, Grid } from "@mui/material";

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

  // const {
  //   data: template,
  //   isLoading: isLoading,
  //   isFetching: isFetching,
  // } = useGetTemplateQuery(templateId, { skip: !templateId });

  const handleChangeMode = (_value: boolean) => {
    setDesigning(_value);
  };
  return (
    <>
      {/* <WebBuilder
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
      /> */}
      {/* <App /> */}
      <Page fullHeight spacing={0}>
        <Grid
          container
          height={"100vh"}
          width={"100vw"}
          display={"flex"}
          direction={"column"}
        >
          <Grid item width={"100%"}>
            <NavbarMenu
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
