import {
  Box,
  Collapse,
  Divider,
  Drawer,
  Link,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { matchPath, useLocation } from "@remix-run/react";
import { useEffect, useState } from "react";
import { Fragment } from "react/jsx-runtime";

export type NavigateItemProp = {
  icon?: React.ReactElement;
  label: string;
  url: string;
  excludePaths?: string[];
  disabled?: boolean;
};

export type NavigateSectionProp = {
  label?: string;
  items: NavigateItemProp[];
  disabled?: boolean;
};

interface Props {
  open: boolean;
  onClose: () => void;
  items: NavigateSectionProp[];
}

export const Navbar = ({ open, onClose, items }: Props) => {
  const theme = useTheme();
  const lgUp = useMediaQuery(theme.breakpoints.up("lg"));
  const [hideLabel, setHideLabel] = useState(open);
  useEffect(() => {
    if (!hideLabel && (!lgUp || open)) {
      setHideLabel(true);
    } else if (hideLabel && lgUp && !open) {
      setHideLabel(false);
    }
  }, [hideLabel, lgUp, open]);
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

  const navbarMarkup = (
    <Box component={"div"}>
      {items.map((section, index) => (
        <Fragment key={index}>
          {index !== 0 && <Divider />}
          <Box component={"div"} sx={{ padding: 1 }}>
            {section.label && open && (
              <Typography fontWeight={"500"} color={"secondary"}>
                {section.label}
              </Typography>
            )}
            {section.items.map((item, index) => (
              <Link
                href={item.url}
                key={index}
                sx={{
                  textDecoration: "none",
                  ":hover": {
                    textDecoration: "underline",
                    textDecorationColor: (theme) =>
                      isEnabledPath(item)
                        ? theme.palette.secondary.dark
                        : theme.palette.secondary.main,
                    cursor: "pointer",
                  },
                }}
              >
                <Tooltip title={item.label} placement="right">
                  <Box
                    component={"div"}
                    sx={{
                      display: "flex",
                      gap: 2,
                      padding: 1,
                      borderRadius: (theme) => theme.shape.borderRadius,
                      color: (theme) =>
                        isEnabledPath(item)
                          ? theme.palette.secondary.dark
                          : theme.palette.secondary.main,
                      background: isEnabledPath(item)
                        ? (theme) => theme.palette.secondary.light
                        : "transparent",
                    }}
                  >
                    {!!item.icon && item.icon}
                    {hideLabel && (
                      <Typography whiteSpace={"nowrap"}>
                        {item.label}
                      </Typography>
                    )}
                  </Box>
                </Tooltip>
              </Link>
            ))}
          </Box>
        </Fragment>
      ))}
    </Box>
  );

  if (lgUp)
    return (
      <Box>
        <Collapse
          in={open}
          orientation="horizontal"
          collapsedSize={56}
          translate="yes"
          timeout={400}
          onExited={() => {
            setHideLabel(false);
          }}
          onEnter={() => setHideLabel(true)}
        >
          <Box sx={{ height: "80vh", overflow: "scroll" }}>{navbarMarkup}</Box>
        </Collapse>
      </Box>
    );

  return (
    <Drawer open={open} onClose={onClose}>
      {navbarMarkup}
    </Drawer>
  );
};
