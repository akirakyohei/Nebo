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
import { useEditor } from "@grapesjs/react";

export const Toolbar = () => {
  const editor = useEditor();
  const { UndoManager, Commands, Canvas } = editor;
  const [, setUpdateCounter] = useState(0);
  const [dragMode, setDragMode] = useState<"absolute" | "translate">(
    editor.config.dragMode || "translate"
  );
  const [zoomValue, setZoomValue] = useState(editor.Canvas.getZoom());
  const btnGropus: ToolButtonProps[] = [
    {
      id: "core:undo",
      content: <i className="fa fa-undo"></i>,
      disabled: () => !UndoManager.hasUndo(),
      tooltip: "Hoàn tác",
    },
    {
      id: "core:redo",
      content: <i className="fa fa-repeat"></i>,
      disabled: () => !UndoManager.hasRedo(),
      tooltip: "Tái thực hiện",
    },
    {
      id: "core:component-outline",
      active: () => Commands.isActive("core:component-outline"),
      content: <i className="fa fa-square-o"></i>,
      tooltip: "Xem khối",
    },
    {
      id: "core:fullscreen",
      active: () => Commands.isActive("core:fullscreen"),
      content: <i className="fa fa-arrows-alt"></i>,
      tooltip: "Toàn màn hình",
      options: { target: "#root" },
    },
    {
      id: "ruler-visibility",
      active: () => Commands.isActive("ruler-visibility"),
      content: <i className="fa fa-minus-square-o" aria-hidden="true"></i>,
      tooltip: "Thước",
    },
  ];

  useEffect(() => {
    const cmdEvent = "run stop";
    const updateEvent = "update";
    const updateCounter = () => setUpdateCounter((value) => value + 1);
    const onCommand = (id: string) => {
      btnGropus.find((btn) => btn.id === id) && updateCounter();
    };
    editor.on(cmdEvent, onCommand);
    editor.on(updateEvent, updateCounter);

    const hanldeZoom = () => {
      setZoomValue(editor.Canvas.getZoom());
    };
    editor.on("canvas:zoom", hanldeZoom);

    return () => {
      editor.off(cmdEvent, onCommand);
      editor.off(updateEvent, updateCounter);
      editor.off("canvas:zoom", hanldeZoom);
    };
  }, []);

  const handleDragMode = (mode: "absolute" | "translate") => {
    setDragMode(mode);
    editor?.getModel().setDragMode(mode);
    editor?.refresh();
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
          value={zoomValue}
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
