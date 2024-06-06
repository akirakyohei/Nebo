import {
  AnalyticsOutlined,
  CategoryOutlined,
  FolderZipOutlined,
  HomeOutlined,
  ImageOutlined,
  MenuOpenOutlined,
  MenuOutlined,
  PrintOutlined,
  SearchOutlined,
  StoreOutlined,
  TaskAltOutlined,
  Tune,
} from "@mui/icons-material";
import logoImage from "/src/assets/img/logo.png";
import {
  AppBar,
  Avatar,
  Box,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  Paper,
  TextField,
  Toolbar,
  Tooltip,
} from "@mui/material";

import React from "react";
import {
  Navbar,
  NavigateItemProp,
  NavigateSectionProp,
} from "../../components/Navbar";
import { useToggle } from "../../utils/useToggle";
import { Outlet, matchPath, useLocation, useNavigate } from "react-router-dom";
import { useWorkspaceContext } from "../../utils/useWorkspaceContext";
import { stringAvatar } from "../../utils/stringAvatar";
import { getFullName } from "../../utils/base";
import { useLogoutMutation } from "../../data/user.api";
import { useToast } from "../../components/notification/useToast";

const navigateItems: NavigateSectionProp[] = [
  {
    items: [
      {
        icon: <HomeOutlined />,
        label: "Trang chủ",
        url: "/documents",
      },
      { icon: <TaskAltOutlined />, label: "Mẫu", url: "/documents/templates" },
      {
        icon: <ImageOutlined />,
        label: "Ảnh tải lên",
        url: "/documents/assets",
      },
      {
        icon: <CategoryOutlined />,
        label: "Danh mục",
        url: "/documents/categories",
      },
      {
        icon: <AnalyticsOutlined />,
        label: "Phân tích",
        url: "/analytics",
      },
      {
        icon: <Tune />,
        label: "Cài đặt",
        url: "/settings/account",
        subNavigation: [
          {
            label: "Thông tin của tài khoản",
            url: "/settings/account",
          },
          {
            label: "Tích hợp",
            url: "/settings/integration",
          },
        ],
      },
    ],
  },
];

export default function DocumentLayout() {
  const {
    value: isOpenNavbar,
    toggle: toggleNavbar,
    setTrue: openNavbar,
    setFalse: closeNavbar,
  } = useToggle(false);
  const { user: currentUser } = useWorkspaceContext();

  const navigate = useNavigate();
  const { show: showToast } = useToast();
  const [logout, { isLoading: isLoadingLogout }] = useLogoutMutation();
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      showToast("Đăng xuất thành công");
      navigate("/");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      if (e.status === 403) {
        navigate("/");
        return;
      }
      showToast("Có lỗi xảy ra", { variant: "error" });
    }
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const location = useLocation();
  const isEnabledPath = (item: NavigateItemProp): boolean => {
    return (
      !!matchPath(item.url, location.pathname) &&
      (!item.excludePaths?.some(
        (excludePath) => !!matchPath(excludePath, location.pathname)
      ) ||
        true)
    );
  };
  const activeTab =
    navigateItems[0].items
      .find((item) => isEnabledPath(item))
      ?.label.toLocaleLowerCase() || "dự án";
  return (
    <Paper
      sx={{
        width: "100vw",
        minHeight: "100vh",
        position: "relative",
        overflow: "auto",
        display: "flex",
        flexFlow: "column",
      }}
    >
      <AppBar position="sticky" color="inherit" sx={{ height: "64px" }}>
        <Grid
          container
          width={"100%"}
          className="border"
          padding={1}
          paddingLeft={2}
          paddingRight={2}
          justifyContent={"space-between"}
        >
          <Grid lg={5} md={4} item>
            <Box
              sx={(theme) => ({
                display: "flex",
                alignItems: "center",
                color: theme.palette.primary.main,
              })}
            >
              {!isOpenNavbar ? (
                <MenuOutlined
                  sx={{
                    display: "flex",
                    mr: 1,
                    ":hover": { cursor: "pointer" },
                  }}
                  onClick={toggleNavbar}
                />
              ) : (
                <MenuOpenOutlined
                  sx={{
                    display: "flex",
                    mr: 1,
                    ":hover": { cursor: "pointer" },
                  }}
                  onClick={toggleNavbar}
                />
              )}
              <Box
                component={"img"}
                src={logoImage}
                sx={{ width: "60px", height: "60px" }}
              />
            </Box>
          </Grid>
          <Grid
            md={4}
            lg={2}
            item
            justifyContent={"center"}
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
            }}
          ></Grid>

          <Grid
            lg={5}
            md={4}
            item
            display="flex"
            justifyContent={"end"}
            paddingRight={{ md: 3 }}
          >
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Tài khoản">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    sizes="small"
                    src={
                      currentUser.avatar_url
                        ? currentUser.avatar_url.startsWith("http")
                          ? currentUser.avatar_url
                          : `/api/files/data/${currentUser.avatar_url}`
                        : undefined
                    }
                    {...stringAvatar(
                      currentUser.first_name,
                      currentUser.last_name,
                      50
                    )}
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <List sx={{ paddingLeft: 1, paddingRight: 1 }}>
                  <ListItemText
                    sx={{ padding: 1 }}
                    primary="Tài khoản"
                    secondary={`${getFullName({ ...currentUser })}`}
                  />

                  {!!currentUser.email && (
                    <ListItemText
                      sx={{ padding: 1 }}
                      primary="email"
                      secondary={currentUser.email}
                    />
                  )}
                  {!!currentUser.phone_number && (
                    <ListItemText
                      sx={{ padding: 1 }}
                      primary="Số điện thoại"
                      secondary={currentUser.phone_number}
                    />
                  )}
                  <ListItemButton
                    sx={{ padding: 1 }}
                    selected={isLoadingLogout}
                    onClick={handleLogout}
                  >
                    Đăng xuất
                  </ListItemButton>
                </List>
              </Menu>
            </Box>
          </Grid>
        </Grid>
      </AppBar>
      <Container
        maxWidth={false}
        sx={{
          padding: (theme) => theme.spacing(0, 0) + " !important",
          flex: "1 1 auto",
          display: "flex",
        }}
      >
        <Grid display={"flex"} flex={"1"} minHeight={"100%"}>
          <Grid item>
            <Box>
              <Navbar
                open={isOpenNavbar}
                onOpen={openNavbar}
                onClose={closeNavbar}
                items={navigateItems}
              />
            </Box>
          </Grid>

          <Grid item flex="1" position={"relative"}>
            <Box
              component={"div"}
              sx={{
                minHeight: "100%",
                border: (theme) => `1px solid ${theme.palette.grey[300]}`,
                background: (theme) => theme.palette.grey[100],
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                overflow: "auto",
              }}
            >
              <Outlet />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Paper>
  );
}
