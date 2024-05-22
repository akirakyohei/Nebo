import { useState } from "react";
import { ToolButton, ToolButtonProps } from "./ToolButton";
import { ButtonGroup, ButtonToolbar, Stack } from "react-bootstrap";
import { ZoomButton } from "./ZoomButton";
export const Toolbar = () => {
  const [hasUndo, setHasUndo] = useState(false);
  const [hasRedo, setHasRedo] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(
    !!document.fullscreenElement
  );
  const [isActiveRuler, setIsActiveRulers] = useState(false);
  const [isActiveOutline, setIsActiveOutline] = useState(false);

  const btnGropus: ToolButtonProps[] = [
    {
      id: "undo",
      content: <i className="fa fa-undo"></i>,
      className: hasUndo
        ? "nebo-layout-btn-color-secondary"
        : "nebo-layout-btn-color-secondary-disabled",
      disabled: !hasUndo,
      tooltip: "Hoàn tác",
      // onClick: () => ref.current?.UndoManager.undo(),
    },
    {
      id: "redo",
      content: <i className="fa fa-repeat"></i>,
      className: hasRedo
        ? "nebo-layout-btn-color-secondary"
        : "nebo-layout-btn-color-secondary-disabled",
      disabled: !hasRedo,
      tooltip: "Tái thực hiện",
      // onClick: () => ref.current?.UndoManager.undo(),
    },
    {
      id: "view-components",
      active: isActiveOutline,
      content: <i className="fa fa-square-o"></i>,
      className: "nebo-layout-btn-color-secondary",
      tooltip: "Xem khối",
      onClick: () => {
        // if (!isActiveOutline) {
        //   ref.current?.runCommand("core:component-outline");
        // } else {
        //   ref.current?.stopCommand("core:component-outline");
        // }
        setIsActiveOutline(!isActiveOutline);
      },
    },
    {
      id: "fullscreen",
      active: isFullScreen,
      content: <i className="fa fa-arrows-alt"></i>,
      className: "nebo-layout-btn-color-secondary",
      tooltip: "Toàn màn hình",
      onClick: () => {
        const containerDiv = document.getElementById("nebo-container");
        if (containerDiv) {
          if (!document.fullscreenElement) {
            containerDiv.requestFullscreen();
            setIsFullScreen(true);
          } else {
            document.exitFullscreen();
            setIsFullScreen(false);
          }
        }
      },
    },
    {
      id: "ruler",
      active: isActiveRuler,
      content: <i className="fa fa-minus-square-o" aria-hidden="true"></i>,
      className: "nebo-layout-btn-color-secondary",
      tooltip: "Thước",
      onClick: () => {
        // if (!isActiveRuler) {
        //   ref.current?.runCommand("ruler-visibility");
        // } else {
        //   ref.current?.stopCommand("ruler-visibility");
        // }
        setIsActiveRulers(!isActiveRuler);
      },
    },
  ];

  return (
    <ButtonToolbar className="justify-content-between py-1 px-2">
      <ButtonGroup style={{ gap: "4px" }}>
        {btnGropus.map((item, index) => (
          <ToolButton key={index} {...item} />
        ))}
      </ButtonGroup>
      <Stack direction="horizontal" gap={4}>
        <ZoomButton
          getZoom={() => {
            return 100;
            // return ref.current?.Canvas.getZoom() || 100;
          }}
          onZoom={function (value: number): void {
            // ref.current?.runCommand("zoom", { value: value });
          }}
          onZoomIn={function (): void {
            // ref.current?.runCommand("zoom-in");
          }}
          onZoomOut={function (): void {
            // ref.current?.runCommand("zoom-out");
          }}
        />
      </Stack>
    </ButtonToolbar>
  );
};
