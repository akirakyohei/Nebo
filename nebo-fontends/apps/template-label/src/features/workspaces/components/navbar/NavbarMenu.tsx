// import { Button, ButtonGroup, NavLink, Stack } from "react-bootstrap";
import { useState } from "react";
import documentImg from "/src/assets/document.svg";
import {
  Box,
  Button,
  ButtonGroup,
  Grid,
  Link,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import { Template } from "../../../../types";
import { TemplateInfoBlock } from "./TemplateInfoBlock";
import { FileDownload, Tune } from "@mui/icons-material";
import { useToggle } from "../../../../utils/useToggle";
import { SettingModal } from "./SettingModal";
import Modal from "../../../../components/Modal";
import { useUpdateTemplateMutation } from "../../../../data/template.api";
import { useToast } from "../../../../components/notification/useToast";
import { isClientError } from "../../../../utils/client";

interface Props {
  isDesigning: boolean;
  onChangeMode: (desgining: boolean) => void;
  template: Template;
}

export const NavbarMenu = ({ isDesigning, onChangeMode, template }: Props) => {
  const { show: showToast } = useToast();
  const {
    value: isOpenActive,
    setTrue: openActive,
    setFalse: closeActive,
  } = useToggle(false);

  const [updateTemplate, { isLoading: isLoadingUpdateTemplate }] =
    useUpdateTemplateMutation();
  const handleActiveTemplate = () => {
    try {
      const res = updateTemplate({
        id: template.id,
        request: {
          active: !template.active,
        },
      });
      showToast("Lưu mẫu thành công");
      closeActive();
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

  const onToggle = (_value: boolean) => {
    onChangeMode(_value);
  };

  const {
    value: isOpenSetting,
    setTrue: openSetting,
    setFalse: closeSetting,
  } = useToggle(false);

  return (
    <Grid container width={"100%"} className="border" padding={1}>
      <Grid xs={5} item>
        <Stack direction={"row"} gap={3}>
          <Link href="/" underline="none">
            <Stack direction={"row"} alignItems={"center"} gap={1}>
              <i
                className="fa fa-chevron-left text-primary"
                aria-hidden="true"
              ></i>
              <img src={documentImg} width={"42"} height={"42"} />
            </Stack>
          </Link>
          <Box sx={{ flex: "1" }}>
            <TemplateInfoBlock template={template} />
          </Box>
          <Box sx={{ width: "180px" }}></Box>
        </Stack>
      </Grid>
      <Grid xs={2} item display="flex" justifyContent={"center"}>
        <ButtonGroup>
          <Button
            variant={isDesigning ? "contained" : "outlined"}
            disabled={isDesigning}
            color="primary"
            onClick={() => onToggle(true)}
            sx={(theme) => {
              if (isDesigning)
                return {
                  background: `${theme.palette.primary.light} !important`,
                  color: `${theme.palette.common.white} !important`,
                };
              return {};
            }}
          >
            Thiết kế
          </Button>
          <Button
            variant={!isDesigning ? "contained" : "outlined"}
            disabled={!isDesigning}
            color="primary"
            onClick={() => onToggle(false)}
            sx={(theme) => {
              if (!isDesigning)
                return {
                  background: `${theme.palette.primary.light} !important`,
                  color: `${theme.palette.common.white} !important`,
                };
              return {};
            }}
          >
            Xem thử
          </Button>
        </ButtonGroup>
      </Grid>

      <Grid xs={5} item display="flex" justifyContent={"end"}>
        <Stack direction="row" gap={3} height={"41px"}>
          <Button variant="outlined" startIcon={<FileDownload />}>
            Tải về
          </Button>
          <Button variant="outlined" startIcon={<Tune />} onClick={openSetting}>
            Cấu hình
          </Button>
          <Button
            variant="outlined"
            startIcon={
              <Switch
                checked={!template.active}
                value={template.active}
                disabled
                readOnly
                onChange={() => {}}
              />
            }
            onClick={openActive}
          >
            Kích hoạt
          </Button>
        </Stack>
      </Grid>

      {isOpenSetting && (
        <SettingModal open onClose={closeSetting} template={template} />
      )}

      {isOpenActive && (
        <Modal
          open
          onClose={closeActive}
          title={template?.active ? "Loại trừ mẫu" : "Kích hoạt mẫu"}
          primaryAction={{
            content: "Tiếp tục",
            loading: isLoadingUpdateTemplate,
            onAction: handleActiveTemplate,
          }}
          secondaryActions={[
            {
              content: "Hủy",
              disabled: isLoadingUpdateTemplate,
              onAction: closeActive,
            },
          ]}
        >
          <Modal.Section>
            <Typography>
              {template?.active
                ? "Thao tác này loại trừ mẫu, không thể chỉnh sửa"
                : "Thao tác này sẽ kích hoạt mẫu, có thể chỉnh sửa"}
            </Typography>
          </Modal.Section>
        </Modal>
      )}
    </Grid>
  );
};
