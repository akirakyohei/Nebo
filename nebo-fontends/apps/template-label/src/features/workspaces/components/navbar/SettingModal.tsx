import { Controller, useForm } from "react-hook-form";
import Modal from "../../../../components/Modal";
import { useToast } from "../../../../components/notification/useToast";
import { useUpdateTemplateMutation } from "../../../../data/template.api";
import { Template, TemplateOptions } from "../../../../types";
import { isClientError } from "../../../../utils/client";
import { useMemo } from "react";
import { CategoryTemplateSelect } from "../CategoryTemplateSelect";
import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  Grid,
  Select,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import { DeleteOutline, Settings, SettingsTwoTone } from "@mui/icons-material";
import { BootstrapTooltip } from "../../../../components/BootstrapTooltip";
import { TextField } from "../../../../components/TextField";
import { isBlank, split_unit } from "../../../../utils/base";
import { PaperTypeSelect } from "../PaperTypeSelect";
import { PaperTypeUnitSelect } from "../PaperTypeUnitSelect";
import { useToggle } from "../../../../utils/useToggle";

interface Props {
  open: boolean;
  onClose: () => void;
  template: Template;
}

type InputModel = {
  name: string;
  category_ids: number[];
  paper_id: number;
  options: TemplateOptions;
};
export const SettingModal = ({ open, onClose, template }: Props) => {
  const { show: showToast } = useToast();
  const { value: isOpenConfirmClear, toggle: toggleConfirmClear } =
    useToggle(false);

  const [updateTemplate] = useUpdateTemplateMutation();
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    setValue,
    watch,
  } = useForm<InputModel>({
    values: useMemo(
      () => ({
        name: template.name,
        category_ids: template.category_ids,
        paper_id: template.paper_id,
        options: template.options,
      }),
      [template]
    ),
    reValidateMode: "onSubmit",
  });
  const submit = handleSubmit(async (data: InputModel) => {
    try {
      const res = updateTemplate({
        id: template.id,
        request: {
          category_ids: data.category_ids,
          name: data.name,
        },
      });
      showToast("Lưu mẫu thành công");
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
  });

  const handleClearTemplate = () => {};
  return (
    <Modal
      open={open}
      size="xl"
      onClose={onClose}
      title={
        <Stack direction="row" alignItems={"center"}>
          <SettingsTwoTone />
          <Typography component={"h5"} fontSize={"1.5rem"} fontWeight={450}>
            Cấu hình
          </Typography>
        </Stack>
      }
      primaryAction={{
        content: "Lưu",
        loading: isSubmitting,
        onAction: submit,
      }}
      secondaryActions={[
        {
          content: "Hủy",
          disabled: isSubmitting,
          onAction: onClose,
        },
      ]}
    >
      <Divider />
      <Modal.Section>
        <Stack gap={3}>
          <Grid container>
            <Grid item xs={6} padding={2}>
              <Box>
                <Typography
                  component={"h3"}
                  fontWeight={500}
                  fontSize={"1.125rem"}
                >
                  Tài liệu
                </Typography>
                <Grid
                  container
                  width={"100%"}
                  display="grid"
                  gridTemplateColumns={"30% auto"}
                  rowGap={2}
                >
                  <Grid item>Tên</Grid>
                  <Grid item>
                    <Controller
                      control={control}
                      name="name"
                      rules={{
                        validate: {
                          not_blank: (_value) => {
                            if (isBlank(_value)) {
                              return "Tên không được để trống";
                            }
                          },
                          max_length: (_value) => {
                            if (_value.length > 255)
                              return "Không được vượt quá 255 ký tự";
                          },
                        },
                      }}
                      // eslint-disable-next-line @typescript-eslint/no-unused-vars
                      render={({ field: { ref, ...otherProps } }) => {
                        const error = control._formState.errors[otherProps.name]
                          ?.message as any;
                        return (
                          <Box>
                            <TextField
                              placeholder="Nhập tên"
                              error={error}
                              size="small"
                              fullWidth
                              // InputProps={{
                              //   sx: (theme) => ({}),
                              // }}
                              {...otherProps}
                            />
                          </Box>
                        );
                      }}
                    />
                  </Grid>
                  <Grid item>
                    <Typography>Thể loại</Typography>
                  </Grid>
                  <Grid item>
                    <Controller
                      control={control}
                      name="category_ids"
                      // eslint-disable-next-line @typescript-eslint/no-unused-vars
                      render={({ field: { ref, ...otherProps } }) => {
                        const error = control._formState.errors[otherProps.name]
                          ?.message as any;
                        return (
                          <CategoryTemplateSelect
                            values={otherProps.value}
                            onChange={otherProps.onChange}
                            error={error}
                          />
                        );
                      }}
                    />
                  </Grid>
                </Grid>
              </Box>
            </Grid>
            <Grid item xs={6} padding={2}>
              <Box>
                <Typography
                  component={"h3"}
                  fontWeight={500}
                  fontSize={"1.125rem"}
                >
                  Bản mẫu
                </Typography>
                <Grid
                  container
                  width={"100%"}
                  display="grid"
                  gridTemplateColumns={"30% auto"}
                  rowGap={2}
                >
                  <Grid item>
                    <Typography>Tự động lưu</Typography>
                  </Grid>
                  <Grid item>
                    <Switch></Switch>
                  </Grid>
                  <Grid item>
                    <Typography>Rỗng trang</Typography>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="outlined"
                      sx={{
                        padding: "2px",
                        color: "#757575",
                        borderColor: "#C4C4C4",
                        "&:hover": {
                          color: "#42A5F5",
                        },
                      }}
                      onClick={() => {
                        toggleConfirmClear();
                      }}
                    >
                      <DeleteOutline />
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
          <Divider />
          <Grid container>
            <Grid item xs={6} padding={2}>
              <Box>
                <Typography
                  component={"h3"}
                  fontWeight={500}
                  fontSize={"1.125rem"}
                >
                  Trang
                </Typography>
                <Grid
                  container
                  width={"100%"}
                  display="grid"
                  gridTemplateColumns={"30% auto"}
                  rowGap={2}
                >
                  <Grid item>
                    <Typography>Hiển thị chiều ngang</Typography>
                  </Grid>
                  <Grid item>
                    <Controller
                      control={control}
                      name="options.is_landscape"
                      // eslint-disable-next-line @typescript-eslint/no-unused-vars
                      render={({ field: { ref, ...otherProps } }) => {
                        return <Switch {...otherProps} />;
                      }}
                    />
                  </Grid>
                  <Grid item>
                    <Typography>Khổ giấy</Typography>
                  </Grid>
                  <Grid item>
                    <Controller
                      control={control}
                      name="paper_id"
                      // eslint-disable-next-line @typescript-eslint/no-unused-vars
                      render={({ field: { ref, ...otherProps } }) => {
                        const error = control._formState.errors[otherProps.name]
                          ?.message as any;
                        return (
                          <Box>
                            <PaperTypeSelect
                              value={otherProps.value}
                              onChange={(_value) => {
                                if (_value) {
                                  otherProps.onChange(_value.id);
                                  if (_value.id !== 0) {
                                    setValue(
                                      "options.height",
                                      `${_value.height}${_value.unit_of_height}`
                                    );
                                    setValue(
                                      "options.width",
                                      `${_value.width}${_value.unit_of_with}`
                                    );
                                  }
                                }
                              }}
                              error={error}
                            />
                          </Box>
                        );
                      }}
                    />
                  </Grid>
                  {watch("paper_id") !== 0 && (
                    <>
                      <Grid item>
                        <Typography>Chiều rộng</Typography>
                      </Grid>
                      <Grid item>
                        <ButtonGroup fullWidth>
                          <Controller
                            control={control}
                            name="options.width"
                            // eslint-disable-next-line @typescript-eslint/no-unused-vars
                            render={({ field: { ref, ...otherProps } }) => {
                              const { value, unit } = split_unit(
                                otherProps.value
                              );
                              return (
                                <>
                                  <TextField
                                    type="number"
                                    size="small"
                                    fullWidth
                                    value={value}
                                    onChange={(_value) => {
                                      otherProps.onChange(`${_value}${unit}`);
                                    }}
                                    sx={{
                                      borderTopRightRadius: "0",
                                      borderBottomRightRadius: "0",
                                    }}
                                  />
                                  <PaperTypeUnitSelect
                                    value={unit}
                                    onChange={(_unit) => {
                                      otherProps.onChange(`${value}${_unit}`);
                                    }}
                                  />
                                </>
                              );
                            }}
                          />
                        </ButtonGroup>
                      </Grid>
                      <Grid item>
                        <Typography>Chiều dài</Typography>
                      </Grid>
                      <Grid item>
                        <ButtonGroup fullWidth>
                          <Controller
                            control={control}
                            name="options.height"
                            // eslint-disable-next-line @typescript-eslint/no-unused-vars
                            render={({ field: { ref, ...otherProps } }) => {
                              const { value, unit } = split_unit(
                                otherProps.value
                              );
                              return (
                                <>
                                  <TextField
                                    type="number"
                                    size="small"
                                    fullWidth
                                    value={value}
                                    onChange={(_value) => {
                                      otherProps.onChange(`${_value}${unit}`);
                                    }}
                                    sx={{
                                      borderTopRightRadius: "0",
                                      borderBottomRightRadius: "0",
                                    }}
                                  />
                                  <PaperTypeUnitSelect
                                    value={unit}
                                    onChange={(_unit) => {
                                      otherProps.onChange(`${value}${_unit}`);
                                    }}
                                  />
                                </>
                              );
                            }}
                          />
                        </ButtonGroup>
                      </Grid>
                    </>
                  )}
                </Grid>
              </Box>
            </Grid>
            <Grid item xs={6} padding={2}>
              <Box>
                <Typography
                  component={"h3"}
                  fontWeight={500}
                  fontSize={"1.125rem"}
                >
                  Căn lề
                </Typography>
                <Grid
                  container
                  width={"100%"}
                  display="grid"
                  gridTemplateColumns={"30% auto"}
                  rowGap={2}
                >
                  <Grid item>
                    <Typography>Trên</Typography>
                  </Grid>
                  <Grid item>
                    <ButtonGroup fullWidth>
                      <Controller
                        control={control}
                        name="options.margin.top"
                        // eslint-disable-next-line @typescript-eslint/no-unused-vars
                        render={({ field: { ref, ...otherProps } }) => {
                          const { value, unit } = split_unit(otherProps.value);
                          return (
                            <>
                              <TextField
                                type="number"
                                size="small"
                                fullWidth
                                value={value}
                                onChange={(_value) => {
                                  otherProps.onChange(`${_value}${unit}`);
                                }}
                                sx={{
                                  borderTopRightRadius: "0",
                                  borderBottomRightRadius: "0",
                                }}
                              />
                              <PaperTypeUnitSelect
                                value={unit}
                                onChange={(_unit) => {
                                  otherProps.onChange(`${value}${_unit}`);
                                }}
                              />
                            </>
                          );
                        }}
                      />
                    </ButtonGroup>
                  </Grid>
                  <Grid item>
                    <Typography>Trái</Typography>
                  </Grid>
                  <Grid item>
                    <ButtonGroup fullWidth>
                      <Controller
                        control={control}
                        name="options.margin.left"
                        // eslint-disable-next-line @typescript-eslint/no-unused-vars
                        render={({ field: { ref, ...otherProps } }) => {
                          const { value, unit } = split_unit(otherProps.value);
                          return (
                            <>
                              <TextField
                                type="number"
                                size="small"
                                fullWidth
                                value={value}
                                onChange={(_value) => {
                                  otherProps.onChange(`${_value}${unit}`);
                                }}
                                sx={{
                                  borderTopRightRadius: "0",
                                  borderBottomRightRadius: "0",
                                }}
                              />
                              <PaperTypeUnitSelect
                                value={unit}
                                onChange={(_unit) => {
                                  otherProps.onChange(`${value}${_unit}`);
                                }}
                              />
                            </>
                          );
                        }}
                      />
                    </ButtonGroup>
                  </Grid>
                  <Grid item>
                    <Typography>Dưới</Typography>
                  </Grid>
                  <Grid item>
                    <ButtonGroup fullWidth>
                      <Controller
                        control={control}
                        name="options.margin.bottom"
                        // eslint-disable-next-line @typescript-eslint/no-unused-vars
                        render={({ field: { ref, ...otherProps } }) => {
                          const { value, unit } = split_unit(otherProps.value);
                          return (
                            <>
                              <TextField
                                type="number"
                                size="small"
                                fullWidth
                                value={value}
                                onChange={(_value) => {
                                  otherProps.onChange(`${_value}${unit}`);
                                }}
                                sx={{
                                  borderTopRightRadius: "0",
                                  borderBottomRightRadius: "0",
                                }}
                              />
                              <PaperTypeUnitSelect
                                value={unit}
                                onChange={(_unit) => {
                                  otherProps.onChange(`${value}${_unit}`);
                                }}
                              />
                            </>
                          );
                        }}
                      />
                    </ButtonGroup>
                  </Grid>
                  <Grid item>
                    <Typography>Phải</Typography>
                  </Grid>
                  <Grid item>
                    <ButtonGroup fullWidth>
                      <Controller
                        control={control}
                        name="options.margin.right"
                        // eslint-disable-next-line @typescript-eslint/no-unused-vars
                        render={({ field: { ref, ...otherProps } }) => {
                          const { value, unit } = split_unit(otherProps.value);
                          return (
                            <>
                              <TextField
                                type="number"
                                size="small"
                                fullWidth
                                value={value}
                                onChange={(_value) => {
                                  otherProps.onChange(`${_value}${unit}`);
                                }}
                                InputProps={{
                                  sx: {
                                    borderTopRightRadius: "0",
                                    borderBottomRightRadius: "0",
                                  },
                                }}
                              />
                              <PaperTypeUnitSelect
                                value={unit}
                                onChange={(_unit) => {
                                  otherProps.onChange(`${value}${_unit}`);
                                }}
                              />
                            </>
                          );
                        }}
                      />
                    </ButtonGroup>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Stack>
      </Modal.Section>

      {isOpenConfirmClear && (
        <Modal
          open
          onClose={toggleConfirmClear}
          title="Làm rỗng mẫu"
          primaryAction={{
            content: "Lưu",
            loading: isSubmitting,
            onAction: submit,
            color: "error",
          }}
          secondaryActions={[
            {
              content: "Hủy",
              disabled: isSubmitting,
              onAction: onClose,
              color: "error",
            },
          ]}
        >
          <Modal.Section>
            <Typography>
              Thao tác này sẽ xóa tất cả các phần tử có trong mẫu
            </Typography>
          </Modal.Section>
        </Modal>
      )}

        {isOpenConfirmClear && (
        <Modal
          open
          onClose={toggleConfirmClear}
          title="Làm rỗng mẫu"
          primaryAction={{
            content: "Lưu",
            loading: isSubmitting,
            onAction: submit,
            color: "error",
          }}
          secondaryActions={[
            {
              content: "Hủy",
              disabled: isSubmitting,
              onAction: onClose,
              color: "error",
            },
          ]}
        >
          <Modal.Section>
            <Typography>
              Thao tác này sẽ xóa tất cả các phần tử có trong mẫu
            </Typography>
          </Modal.Section>
        </Modal>
      )}
    </Modal>
  );
};
