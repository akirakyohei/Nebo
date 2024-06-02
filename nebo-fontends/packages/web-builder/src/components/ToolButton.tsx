import { useEditor } from "@grapesjs/react";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { cx } from "./common";

export type ToolButtonProps = {
  id: string;
  className?: string;
  disabled?: () => boolean;
  tooltip?: string;
  onClick?: () => void;
  content: React.ReactNode;
  options?: any;
  active?: () => boolean;
};

export const ToolButton = ({
  id,
  className,
  disabled,
  tooltip,
  onClick,
  content,
  active,
  options,
}: ToolButtonProps) => {
  const editor = useEditor();
  const { Commands } = editor;
  const markup = (
    <span className="d-inline-block">
      <Button
        variant="link"
        className={cx(
          !disabled?.()
            ? "nebo-layout-btn-color-secondary"
            : "nebo-layout-btn-color-secondary-disabled",
          active?.() ? "bg-primary-subtle" : ""
        )}
        disabled={disabled?.()}
        onClick={() => {
          Commands.isActive(id) ? Commands.stop(id) : Commands.run(id, options);
        }}
        active={active?.()}
      >
        {content}
      </Button>
    </span>
  );

  if (tooltip)
    return (
      <OverlayTrigger
        placement="bottom"
        overlay={<Tooltip id={id}>{tooltip}</Tooltip>}
      >
        {markup}
      </OverlayTrigger>
    );

  return markup;
};
