import {
  Box,
  Divider,
  Grid,
  InputAdornment,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";

import { useState } from "react";
import { Page } from "../../components/Page";
import { TabOption, Tabs } from "../../components/Tabs";
import { useBaseFilter } from "../../utils/useBaseFilterQuery";
import { TemplateFilterRequestModel } from "./types";
import { useGetTemplatesData } from "./hooks/useGetTemplatesData";
import {
  ArrowDownward,
  ArrowUpward,
  ControlPointOutlined,
  SearchOutlined,
} from "@mui/icons-material";
import { CategoryTemplateSelect } from "../workspaces/components/CategoryTemplateSelect";
import { TemplateFilters } from "./components/template/TemplateFilters";
import { useToggle } from "../../utils/useToggle";
import { TemplateAddModal } from "./components/template/TemplateAddModal";
import { TemplateTable } from "./components/template/TemplateTable";
import { MediaFileTable } from "./components/media_file/MediaFileTable";

export default function MediaFilePage() {
  const {
    value: isOpenUploadFile,
    setTrue: openUploadFile,
    setFalse: closeUploadFile,
  } = useToggle(false);

  return (
    <Page
      title="Ảnh tải lên"
      fullHeight
      primaryAction={{
        icon: <ControlPointOutlined />,
        content: "Tải ảnh lên",
        onAction: openUploadFile,
      }}
    >
      <MediaFileTable assets={[]} />
      {isOpenUploadFile && <TemplateAddModal onClose={closeUploadFile} />}
    </Page>
  );
}
