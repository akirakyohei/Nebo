import { useState, useEffect, useContext } from "react";
import { ToolButton, ToolButtonProps } from "./ToolButton";
import {
  Button,
  ButtonGroup,
  ButtonToolbar,
  Dropdown,
  OverlayTrigger,
  Stack,
  Tooltip,
} from "react-bootstrap";
import { ZoomButton } from "./ZoomButton";
import { EditorContext } from "../context/EditorContext";
import zoom from "../plugins/zoom";
import grapesjs, { Editor } from "grapesjs";
interface Props {
  editor: Editor;
}
export const Toolbar = ({ editor }: Props) => {
  const [hasUndo, setHasUndo] = useState(false);
  const [hasRedo, setHasRedo] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(
    !!document.fullscreenElement
  );
  const [isActiveRuler, setIsActiveRulers] = useState(false);
  const [isActiveOutline, setIsActiveOutline] = useState(false);
  const [dragMode, setDragMode] = useState<"absolute" | "translate">(
    "absolute"
  );
  // const { editor } = useContext(EditorContext);

  useEffect(() => {
    setInterval(() => {
      const _hasUndo = editor?.UndoManager.hasUndo() || false;
      if (_hasUndo !== hasUndo) setHasUndo(_hasUndo);
      const _hasRedo = editor?.UndoManager.hasRedo() || false;
      if (_hasRedo !== hasRedo) setHasRedo(_hasRedo);
    }, 1000);
  }, []);

  const btnGropus: ToolButtonProps[] = [
    {
      id: "undo",
      content: <i className="fa fa-undo"></i>,
      className: hasUndo
        ? "nebo-layout-btn-color-secondary"
        : "nebo-layout-btn-color-secondary-disabled",
      disabled: !hasUndo,
      tooltip: "Hoàn tác",
      onClick: () => editor?.UndoManager.undo(),
    },
    {
      id: "redo",
      content: <i className="fa fa-repeat"></i>,
      className: hasRedo
        ? "nebo-layout-btn-color-secondary"
        : "nebo-layout-btn-color-secondary-disabled",
      disabled: !hasRedo,
      tooltip: "Tái thực hiện",
      onClick: () => editor?.UndoManager.undo(),
    },
    {
      id: "view-components",
      active: isActiveOutline,
      content: <i className="fa fa-square-o"></i>,
      className: "nebo-layout-btn-color-secondary",
      tooltip: "Xem khối",
      onClick: () => {
        if (!isActiveOutline) {
          editor?.runCommand("core:component-outline");
        } else {
          editor?.stopCommand("core:component-outline");
        }
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
        if (!isActiveRuler) {
          editor?.runCommand("ruler-visibility");
        } else {
          editor?.stopCommand("ruler-visibility");
        }
        setIsActiveRulers(!isActiveRuler);
      },
    },
  ];

  const handleDragMode = (mode: "absolute" | "translate") => {
    setDragMode(mode);
    editor?.getModel().setDragMode(mode);
    editor?.getModel().setStyle({ margin: "3rem" });
    editor?.refresh();
    // editor?.render();
  };

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
            return editor?.Canvas.getZoom() || 100;
          }}
          onZoom={function (value: number): void {
            editor?.runCommand("set-zoom", { zoom: value });
          }}
          onZoomIn={function (): void {
            editor?.runCommand("zoom-in");
          }}
          onZoomOut={function (): void {
            editor?.runCommand("zoom-out");
          }}
        />
        <OverlayTrigger
          placement="bottom"
          overlay={<Tooltip id={"drag-mode"}>Chế độ kéo</Tooltip>}
        >
          <Dropdown as={ButtonGroup}>
            <Button variant="outline-secondary" className="nebo-border-btn">
              {dragMode === "absolute"
                ? "Vị trí tuyệt đối"
                : "Vị trí tương đổi"}
            </Button>
            <Dropdown.Toggle
              split
              variant="outline-secondary"
              id="dropdown-split-basic"
              className="nebo-border-btn"
            />

            <Dropdown.Menu>
              <Dropdown.Item
                onClick={() => {
                  handleDragMode("absolute");
                }}
              >
                Vị trí tuyệt đối
              </Dropdown.Item>

              <Dropdown.Item
                onClick={() => {
                  handleDragMode("translate");
                }}
              >
                Vị trí tương đổi
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </OverlayTrigger>
      </Stack>
    </ButtonToolbar>
  );
};
