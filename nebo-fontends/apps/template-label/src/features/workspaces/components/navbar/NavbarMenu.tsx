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
import {
  FileDownload,
  LocalPrintshop,
  Tune,
  ArrowBackIosNew,
} from "@mui/icons-material";
import { useToggle } from "../../../../utils/useToggle";
import { SettingModal } from "./SettingModal";
import Modal from "../../../../components/Modal";
import { useUpdateTemplateMutation } from "../../../../data/template.api";
import { useToast } from "../../../../components/notification/useToast";
import { isClientError } from "../../../../utils/client";

interface Props {
  isDesigning: boolean;
  template: Template;
  isloadingUpdateTemplate?: boolean;
  downloadTemplate?: () => void;
  printTemplate?: () => void;
}

export const NavbarMenu = ({
  isDesigning,
  isloadingUpdateTemplate,
  template,
  downloadTemplate,
  printTemplate,
}: Props) => {
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

  const {
    value: isOpenSetting,
    setTrue: openSetting,
    setFalse: closeSetting,
  } = useToggle(false);

  return (
    <Grid
      container
      width={"100%"}
      className="border"
      padding={1}
      sx={{ background: "#fff" }}
    >
      <Grid xs={5} item>
        <Stack direction={"row"} gap={3}>
          <Link href="/" underline="none">
            <Stack direction={"row"} alignItems={"center"} gap={1}>
              <ArrowBackIosNew />
              <img src={documentImg} width={"42"} height={"42"} />
            </Stack>
          </Link>
          <Box sx={{ flex: "1" }}>
            <TemplateInfoBlock template={template} />
          </Box>
          <Box sx={{ width: "180px" }}>
            {isloadingUpdateTemplate && (
              <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                <Typography component="h6">Đang lưu</Typography>
                <Loader />
              </Box>
            )}
          </Box>
        </Stack>
      </Grid>
      <Grid xs={2} item display="flex" justifyContent={"center"}>
        <ButtonGroup>
          <Button
            variant={isDesigning ? "contained" : "outlined"}
            disabled={isDesigning}
            color="primary"
            href={`/documents/templates/${template.id || 2}`}
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
            href={`/documents/templates/${template.id || 2}/preview`}
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
          {!isDesigning && (
            <>
              <Button
                variant="outlined"
                onClick={downloadTemplate}
                startIcon={<FileDownload />}
              >
                Tải về
              </Button>
              <Button
                variant="outlined"
                onClick={printTemplate}
                startIcon={<LocalPrintshop />}
              >
                In
              </Button>
            </>
          )}

          {isDesigning && (
            <Button
              variant="outlined"
              startIcon={<Tune />}
              onClick={openSetting}
            >
              Cấu hình
            </Button>
          )}

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

const Loader = () => {
  return (
    <Box
      className="loader"
      sx={{
        "@keyframes 143": {
          "0%": {
            backgroundPosition:
              "calc(0*100%/3) 50% ,calc(1*100%/3) 50% ,calc(2*100%/3) 50% ,calc(3*100%/3) 50%",
          },
          "16.67%": {
            backgroundPosition:
              "calc(0*100%/3) 0   ,calc(1*100%/3) 50% ,calc(2*100%/3) 50% ,calc(3*100%/3) 50%",
          },
          "33.33%": {
            backgroundPosition:
              "calc(0*100%/3) 100%,calc(1*100%/3) 0   ,calc(2*100%/3) 50% ,calc(3*100%/3) 50%",
          },
          "50%": {
            backgroundPosition:
              "calc(0*100%/3) 50% ,calc(1*100%/3) 100%,calc(2*100%/3) 0   ,calc(3*100%/3) 50%",
          },
          "66.67%": {
            backgroundPosition:
              "calc(0*100%/3) 50% ,calc(1*100%/3) 50% ,calc(2*100%/3) 100%,calc(3*100%/3) 0  ",
          },
          "83.33%": {
            backgroundPosition:
              "calc(0*100%/3) 50% ,calc(1*100%/3) 50% ,calc(2*100%/3) 50% ,calc(3*100%/3) 100%",
          },
          "100%": {
            backgroundPosition:
              "calc(0*100%/3) 50% ,calc(1*100%/3) 50% ,calc(2*100%/3) 50% ,calc(3*100%/3) 50%",
          },
        },
        height: "10px",
        aspectRatio: 2.5,
        "--_g": "no-repeat radial-gradient(farthest-side,#575757 90%,#0000)",
        background: "var(--_g), var(--_g), var(--_g), var(--_g)",
        backgroundSize: "20% 50%",
        animation: "l43 1s infinite linear",
      }}
    />
  );
};
