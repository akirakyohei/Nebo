import { type LinkProps as ReactRouterLinkProps } from "react-router-dom";
import { Link as UILink } from "@mui/material";
import { LinkComponent, LinkComponentProps } from "./LinkComponent";

export interface LinkProps
  extends Omit<LinkComponentProps, "url">,
    Pick<ReactRouterLinkProps, "replace" | "state"> {
  url?: ReactRouterLinkProps["to"];
}

/**
 * Customize UI Link components for some behavior from react-router-dom
 */
export function Link({ url, ...rest }: LinkProps) {
  if (url) {
    return <LinkComponent url={url} {...rest} />;
  }
  // fallback to UI Link button
  const { replace, state, ...restButtonLinkProps } = rest;
  return <UILink {...restButtonLinkProps} />;
}
