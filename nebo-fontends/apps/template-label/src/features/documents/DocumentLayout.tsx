import {
  AnalyticsOutlined,
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
import { Outlet, matchPath, useLocation } from "react-router-dom";

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
  {
    label: "Công cụ",
    items: [
      {
        icon: <StoreOutlined />,
        label: "Tự động hoá dữ liệu",
        url: "/documents/auto_informations",
      },
    ],
  },
  {
    label: "Bản in",
    items: [
      {
        icon: <PrintOutlined />,
        label: "In",
        url: "/documents/prints",
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
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

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
    <Paper sx={{ width: "100vw", minHeight: "100vh", position: "relative" }}>
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
            <Box sx={{ display: "flex", alignItems: "center" }}>
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
          >
            <Box
            // sx={{
            //   flexGrow: 1,
            //   display: { xs: "none", md: "flex" },
            //   justifyContent: "center",
            // }}
            >
              <Box
                sx={{
                  width: "80%",
                  maxWidth: "400px",
                }}
              >
                <TextField
                  variant="outlined"
                  placeholder={`Tìm kiếm ${activeTab}`}
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <SearchOutlined />
                      </InputAdornment>
                    ),
                    sx: (theme) => ({
                      height: "38px",
                      background: theme.palette.background.paper,
                    }),
                  }}
                />
              </Box>
            </Box>
          </Grid>

          <Grid
            lg={5}
            md={4}
            item
            display="flex"
            justifyContent={"end"}
            paddingRight={{ md: 3 }}
          >
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
              ></Menu>
            </Box>
          </Grid>
        </Grid>
      </AppBar>
      <Container
        maxWidth={false}
        sx={{
          padding: (theme) => theme.spacing(0, 0) + " !important",
          position: "fixed",
        }}
      >
        <Grid display={"flex"} sx={{ minHeight: "calc(100vh - 60px)" }}>
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

          <Grid item flex="1">
            <Box
              component={"div"}
              sx={{
                width: "100%",
                minHeight: "100%",
                border: (theme) => `1px solid ${theme.palette.grey[300]}`,
                background: (theme) => theme.palette.grey[100],
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
