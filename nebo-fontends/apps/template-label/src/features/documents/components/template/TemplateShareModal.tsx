import {
  Avatar,
  Box,
  Divider,
  FormControlLabel,
  IconButton,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { KeyboardBackspaceOutlined, Delete } from "@mui/icons-material";
import Modal from "../../../../components/Modal";
import { useToast } from "../../../../components/notification/useToast";
import { isClientError } from "../../../../utils/client";
import { useSimpleFilters } from "../../../../utils/useSimpleFilters";
import { Controller, useForm } from "react-hook-form";
import {
  SharedStatus,
  Template,
  UserWithUserPermission,
} from "../../../../types";
import {
  useGetTemplateUserPermissionsQuery,
  useShareTemplateMutation,
} from "../../../../data/template_permission.api";
import { useMemo, useState } from "react";
import { useGetUsersQuery } from "../../../../data/user.api";
import { TemplateUserSelect } from "./TemplateUserSelect";
import { getFullName } from "../../../../utils/base";
import { stringAvatar } from "../../../../utils/stringAvatar";
import { useWorkspaceContext } from "../../../../utils/useWorkspaceContext";

interface Props {
  onClose: () => void;
  template: Template;
}

type InputModel = {
  shared_status: SharedStatus;
  user_permissions: UserWithUserPermission[];
  remove_user_permissions: number[];
};
export const TemplateShareModal = ({ onClose, template }: Props) => {
  const [selectUser, setSelectUser] = useState<UserWithUserPermission | null>(
    null
  );
  const { show: showToast } = useToast();
  const { user: currentUser } = useWorkspaceContext();
  const [shareTemplate] = useShareTemplateMutation();
  const { page, limit } = useSimpleFilters(250);
  const {
    data: templateUserPermissions = {
      data: [],
      metadata: { total_element: 0, page: 1, limit: limit },
    },
    isLoading: isLoadingTemplates,
    isFetching: isFetchingTemplates,
  } = useGetTemplateUserPermissionsQuery(
    {
      id: template.id,
      filter: {
        page,
        limit,
      },
    },
    { skip: template.shared_status === "only_you" }
  );
  const sharedUserIds = useMemo(
    () => templateUserPermissions.data.map((a) => a.shared_user_id),
    [templateUserPermissions.data]
  );
  const {
    data: users = {
      data: [],
      metadata: { total_element: 0, limit: 250, page: 1 },
    },
  } = useGetUsersQuery(
    { ids: sharedUserIds, limit: 250, page: 1 },
    {
      skip: sharedUserIds.length === 0,
    }
  );

  const sharedUsers: UserWithUserPermission[] = useMemo(
    () =>
      users.data.map((user) => {
        const userPermission = templateUserPermissions.data.find(
          (a) => a.shared_user_id === user.id
        );
        return { ...user, user_permission: userPermission };
      }),
    [users, templateUserPermissions]
  );
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { isSubmitting, dirtyFields, isDirty },
  } = useForm<InputModel>({
    values: useMemo(
      () => ({
        shared_status: template.shared_status || "only_you",
        user_permissions: sharedUsers,
        remove_user_permissions: [],
      }),
      [sharedUsers, template.shared_status]
    ),
  });
  const submit = handleSubmit(async (data: InputModel) => {
    try {
      if (!!selectUser) {
        const res = await shareTemplate({
          id: template.id,
          request: {
            shared_status: data.shared_status,
            put_users: [
              {
                user_id: selectUser.id,
                permissions: selectUser.user_permission?.permissions || [
                  "read",
                ],
              },
            ],
          },
        }).unwrap();
        setSelectUser(null);
      } else {
        const res = await shareTemplate({
          id: template.id,
          request: {
            shared_status: data.shared_status,
            put_users: data.user_permissions.map((a) => ({
              user_id: a.id,
              permissions: a.user_permission?.permissions || [],
            })),
            remove_users: data.remove_user_permissions,
          },
        }).unwrap();
        onClose();
      }

      showToast("Cập nhật thành công");
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

  return (
    <Modal
      open
      size={"md"}
      onClose={onClose}
      title={
        <Stack direction={"row"} gap={1} alignItems={"center"}>
          {!!selectUser && (
            <IconButton
              sx={{
                height: "38px",
                width: "38px",
                borderRadius: "5px",
                backgroundColor: "#f5f5f5f5",
              }}
              onClick={() => setSelectUser(null)}
            >
              <KeyboardBackspaceOutlined />
            </IconButton>
          )}

          <Typography>Chia sẻ</Typography>
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
      {selectUser === null && (
        <Modal.Section>
          <Box sx={{ overflow: "auto", height: "50vh" }}>
            <Controller
              control={control}
              name={"shared_status"}
              render={({ field: { ref, ...otherProps } }) => (
                <RadioGroup
                  value={otherProps.value}
                  name="radio-buttons-group"
                  onChange={(event) => {
                    otherProps.onChange(event.target.value);
                  }}
                >
                  <FormControlLabel
                    value="only_you"
                    control={<Radio />}
                    label="Chỉ mình bạn"
                  />
                  <FormControlLabel
                    value="allow_all"
                    control={<Radio />}
                    label="Bất kỳ ai cũng có thể xem"
                  />
                  <FormControlLabel
                    value="share_many"
                    control={<Radio />}
                    label="Chia sẻ cho một nhóm người dùng"
                  />
                </RadioGroup>
              )}
            />

            {watch("shared_status") !== "only_you" && (
              <Box>
                <Divider />
                <Typography paddingTop={1} paddingBottom={2}>
                  Bạn có chia sẻ mẫu này cho những người dùng này:
                </Typography>
                <TemplateUserSelect
                  template={template}
                  onChange={(_value: UserWithUserPermission) => {
                    setSelectUser(_value);
                  }}
                />

                {watch("user_permissions").length === 0 && (
                  <Box
                    sx={{
                      background: "#F5F5F5",
                      height: "30vh",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography>
                      Bạn có thể chia sẻ riêng cho nhóm người dùng ở đây
                    </Typography>
                  </Box>
                )}

                {watch("user_permissions").length !== 0 && (
                  <Box marginTop={2} bgcolor={"#f5f5f5"}>
                    {watch("user_permissions").map((a, index) => (
                      <Box
                        key={a.id}
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          paddingTop: 1,
                          paddingBottom: 1,
                          paddingLeft: 1,
                          ":hover": {
                            cursor: "pointer",
                            backgroundColor: "#abcb",
                          },
                          ":not(last-of-type)": {
                            borderBottom: "1px solid #abcb",
                          },
                        }}
                      >
                        <Stack direction={"row"} gap={1} alignItems={"center"}>
                          <Avatar
                            sizes="small"
                            src={
                              a.avatar_url
                                ? a.avatar_url.startsWith("http")
                                  ? a.avatar_url
                                  : `/api/files/data/${a.avatar_url}`
                                : undefined
                            }
                            {...stringAvatar(a.first_name, a.last_name, 40)}
                          />
                          <Box>
                            <Box>{getFullName({ ...a })}</Box>
                            <Box>{a.email}</Box>
                          </Box>
                        </Stack>
                        <Stack direction={"row"} gap={1} alignItems={"center"}>
                          <Controller
                            control={control}
                            name={`user_permissions.${index}.user_permission.permissions`}
                            render={({ field }) => (
                              <Select
                                value={field?.value?.join(",") || "read"}
                                onChange={(value) => {
                                  field.onChange(value.target.value.split(","));
                                }}
                                sx={{
                                  paddingRight: 0,
                                  height: "38px",
                                  background: "#fff",
                                  "> div": { paddingLeft: 2 },
                                }}
                              >
                                <MenuItem value={"read"}>Chỉ xem</MenuItem>
                                <MenuItem value={"write,read"}>
                                  Có quyền sửa
                                </MenuItem>
                              </Select>
                            )}
                          />
                          <IconButton
                            onClick={() => {
                              const removeUser = watch(
                                "remove_user_permissions"
                              );
                              setValue("remove_user_permissions", [
                                ...removeUser,
                                a.id,
                              ]);
                              setValue("user_permissions", [
                                ...watch("user_permissions").filter(
                                  (b) => b.id !== a.id
                                ),
                              ]);
                            }}
                          >
                            <Delete />
                          </IconButton>
                        </Stack>
                      </Box>
                    ))}
                  </Box>
                )}
              </Box>
            )}
          </Box>
        </Modal.Section>
      )}
      {!!selectUser && (
        <Modal.Section>
          <Box>
            <Stack
              direction="row"
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Stack direction="row" gap={1} alignItems={"center"}>
                <Avatar
                  sizes="small"
                  src={
                    selectUser.avatar_url
                      ? selectUser.avatar_url.startsWith("http")
                        ? selectUser.avatar_url
                        : `/api/files/data/${selectUser.avatar_url}`
                      : undefined
                  }
                  {...stringAvatar(
                    selectUser.first_name,
                    selectUser.last_name,
                    50
                  )}
                />
                <Box>
                  <Box>{getFullName({ ...selectUser })}</Box>
                  <Box>{selectUser.email}</Box>
                </Box>
              </Stack>
              <Select
                value={
                  selectUser.user_permission?.permissions?.join(",") || "read"
                }
                onChange={(value) => {
                  setSelectUser((prev) => {
                    if (prev === null) return null;
                    return {
                      ...prev,
                      user_permission: !!prev.user_permission
                        ? {
                            ...prev?.user_permission,
                            permissions: value.target.value.split(","),
                          }
                        : {
                            id: 0,
                            template_id: template.id,
                            owner_user_id: currentUser.id,
                            shared_user_id: selectUser.id,
                            permissions: value.target.value.split(","),
                          },
                    };
                  });
                }}
                sx={{
                  paddingRight: 0,
                  height: "38px",
                  background: "#fff",
                  "> div": { paddingLeft: 2 },
                }}
              >
                <MenuItem value={"read"}>Chỉ xem</MenuItem>
                <MenuItem value={"write,read"}>Có quyền sửa</MenuItem>
              </Select>
            </Stack>
          </Box>
        </Modal.Section>
      )}
    </Modal>
  );
};
