import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";

export type ToolButtonProps = {
  id: string;
  className?: string;
  disabled?: boolean;
  tooltip?: string;
  onClick?: () => void;
  content: React.ReactNode;
  active?: boolean;
};

export const ToolButton = ({
  id,
  className,
  disabled,
  tooltip,
  onClick,
  content,
  active,
  ...props
}: ToolButtonProps) => {
  const markup = (
    <span className="d-inline-block">
      <Button
        variant="link"
        className={`${className || ""} ${active && "bg-primary-subtle"}`}
        disabled={disabled}
        onClick={onClick}
        active={active}
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
