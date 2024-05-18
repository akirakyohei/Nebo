import {
  FolderZipOutlined,
  ImageOutlined,
  MenuOpenOutlined,
  MenuOutlined,
  PrintOutlined,
  SearchOutlined,
  StoreOutlined,
  TaskAltOutlined,
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
        icon: <FolderZipOutlined />,
        label: "Trang chủ",
        url: "/documents",
      },
      {
        icon: <FolderZipOutlined />,
        label: "Dự án",
        url: "/documents/projects",
      },
      {
        icon: <ImageOutlined />,
        label: "Ảnh tải lên",
        url: "/documents/images",
      },
      { icon: <TaskAltOutlined />, label: "Mẫu", url: "/documents/templates" },
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
  const { value: isOpenNavbar, toggle: toggleNavbar } = useToggle(false);
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
      <AppBar position="sticky" color="inherit">
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            variant="dense"
            sx={{ justifyContent: "space-between", gap: 2 }}
          >
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

            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                justifyContent: "center",
              }}
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
          </Toolbar>
        </Container>
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
                onClose={toggleNavbar}
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
