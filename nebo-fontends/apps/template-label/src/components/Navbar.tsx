import {
  Box,
  Collapse,
  Divider,
  Drawer,
  Grow,
  IconButton,
  Link,
  Stack,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { matchPath, useLocation } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";
import { useToggle } from "../utils/useToggle";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";

export type NavigateItemProp = {
  icon?: React.ReactElement;
  label: string;
  url: string;
  excludePaths?: string[];
  disabled?: boolean;
  subNavigation?: SubNavigateItemProp[];
};

export type SubNavigateItemProp = {
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
  onOpen: () => void;
  items: NavigateSectionProp[];
}

export const Navbar = ({ open, onClose, onOpen, items }: Props) => {
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
              <Typography fontWeight={"500"} color={"primary"}>
                {section.label}
              </Typography>
            )}
            {section.items.map((item, index) => (
              <NavigationItem
                key={index}
                item={item}
                onOpen={onOpen}
                hideLabel={hideLabel}
                isEnabledPath={isEnabledPath}
              />
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
          <Box sx={{ height: "80vh", overflow: "auto" }}>{navbarMarkup}</Box>
        </Collapse>
      </Box>
    );

  return (
    <Drawer open={open} onClose={onClose}>
      {navbarMarkup}
    </Drawer>
  );
};

type ItemProps = {
  item: NavigateItemProp;
  hideLabel: boolean;
  onOpen: () => void;
  isEnabledPath: (item: NavigateItemProp) => boolean;
};

const NavigationItem = ({
  item,
  isEnabledPath,
  hideLabel,
  onOpen,
}: ItemProps) => {
  const { value: isOpenSubNavigate, toggle } = useToggle(false);
  const hasSubNavigate = item?.subNavigation
    ? item.subNavigation.length > 0
    : false;

  const handleClick = () => {
    toggle();
    onOpen();
  };
  return (
    <>
      <Link
        href={!hasSubNavigate ? item.url : undefined}
        onClick={hasSubNavigate ? handleClick : undefined}
        sx={{
          textDecoration: "none",
          ":hover": {
            textDecoration: "underline",
            textDecorationColor: (theme) =>
              isEnabledPath(item)
                ? theme.palette.primary.dark
                : theme.palette.primary.main,
            cursor: "pointer",
          },
        }}
      >
        <Tooltip title={item.label} placement="right">
          <Box
            component={"div"}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              padding: 1,
              borderTopLeftRadius: 4,
              borderTopRightRadius: 4,
              borderBottomLeftRadius: !isOpenSubNavigate ? 4 : undefined,
              borderBottomRightRadius: !isOpenSubNavigate ? 4 : undefined,
              color: (theme) =>
                isEnabledPath(item)
                  ? theme.palette.primary.dark
                  : theme.palette.primary.main,
              background: isEnabledPath(item)
                ? (theme) => theme.palette.primary.light
                : "transparent",
            }}
          >
            {!!item.icon && item.icon}
            {hideLabel && (
              <Stack
                direction={"row"}
                justifyContent={"space-between"}
                width={"100%"}
                alignContent={"center"}
              >
                <Typography whiteSpace={"nowrap"} alignSelf={"center"}>
                  {item.label}
                </Typography>
                {hasSubNavigate && (
                  <IconButton
                    size="small"
                    disableTouchRipple
                    onClick={(e) => {
                      e.preventDefault();
                      toggle();
                    }}
                  >
                    {isOpenSubNavigate ? (
                      <KeyboardArrowUp />
                    ) : (
                      <KeyboardArrowDown />
                    )}
                  </IconButton>
                )}
              </Stack>
            )}
          </Box>
        </Tooltip>
      </Link>
      {hasSubNavigate && isOpenSubNavigate && (
        <Grow
          in={isOpenSubNavigate}
          style={{ transformOrigin: "0 0 0" }}
          {...(isOpenSubNavigate ? { timeout: 1000 } : {})}
        >
          <div>
            {item.subNavigation
              ? item.subNavigation.map((sub) => {
                  return (
                    <Link
                      href={sub.url}
                      sx={{
                        textDecoration: "none",
                        ":hover": {
                          textDecoration: "underline",
                          textDecorationColor: (theme) =>
                            isEnabledPath(sub)
                              ? theme.palette.primary.dark
                              : theme.palette.primary.main,
                          cursor: "pointer",
                        },
                      }}
                    >
                      <Tooltip title={sub.label} placement="right">
                        <Box
                          component={"div"}
                          sx={{
                            display: "flex",
                            gap: 2,
                            padding: 1,
                            // borderRadius: (theme) => theme.shape.borderRadius,
                            color: (theme) =>
                              isEnabledPath(sub)
                                ? theme.palette.primary.dark
                                : theme.palette.primary.main,
                            background: isEnabledPath(sub)
                              ? "#3A96F2AA"
                              : "#FAFAFA",
                          }}
                        >
                          {hideLabel && (
                            <Typography whiteSpace={"nowrap"}>
                              {sub.label}
                            </Typography>
                          )}
                        </Box>
                      </Tooltip>
                    </Link>
                  );
                })
              : null}
          </div>
        </Grow>
      )}
    </>
  );
};
