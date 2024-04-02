import { type LinkProps as ReactRouterLinkProps } from "react-router-dom";
import { Link, LinkProps, styled } from "@mui/material";

export interface LinkComponentProps extends Omit<LinkProps, "url"> {
  url?: ReactRouterLinkProps["to"];
  external?: boolean;
  removeUnderline?: boolean;
}

/**
 * This component for customize all link in UI components. It will replace all link with Link's react-router-dom
 *
 * Dont't use this, use Link component instead, this exists only for customize purpose
 * */
export function LinkComponent({
  url,
  external,
  children,
  removeUnderline,
  ref,
  className,
  ...rest
}: LinkComponentProps) {
  const target = external ? "_blank" : undefined;
  const rel = external ? "noopener noreferrer" : undefined;
  if (className) {
    // Other UI component using UnstyledLink component already styled
    return (
      <Link
        href={url?.toString()}
        rel={rel}
        target={target}
        className={className}
        {...rest}
      >
        {children}
      </Link>
    );
  }

  return (
    <StyledLink
      href={url?.toString()}
      removeUnderline={removeUnderline}
      rel={rel}
      target={target}
      {...rest}
    >
      {children}
    </StyledLink>
  );
}

// same as Link UI
const StyledLink = styled(Link, {
  shouldForwardProp: (prop) => prop !== "removeUnderline",
})<{
  removeUnderline?: boolean;
}>`
  appearance: none;
  display: inline;
  text-align: inherit;
  padding: 0;
  background: none;
  border: 0;
  font-size: inherit;
  font-weight: inherit;
  color: ${(p) => p.theme.palette.common.white};
  cursor: pointer;
  text-decoration: ${(p) => (p.removeUnderline ? "none" : "underline")};
  &:hover {
    color: ${(p) => p.theme.palette.primary.light};
    text-decoration: ${(p) => (p.removeUnderline ? "underline" : "none")};
  }
  &:focus:not(:active) {
    outline: ${(p) => p.theme.palette.primary.main} auto
      ${(p) => p.theme.shape.borderRadius};
  }

  &:active {
    position: relative;
    color: ${(p) => p.theme.palette.primary.contrastText};
  }
`;
