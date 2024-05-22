import { Editor, usePlugin } from "grapesjs";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Button,
  ButtonGroup,
  ButtonToolbar,
  Col,
  Container,
  InputGroup,
  OverlayTrigger,
  Row,
  Stack,
  Tab,
  Tabs,
  Tooltip,
} from "react-bootstrap";
import $ from "jquery";
import { ToolButton, ToolButtonProps } from "./compoents/ToolButton";
import { ZoomButton } from "./compoents/ZoomButton";
import React from "react";
import { useEditor } from "./useEditor";

interface Props {
  designingMode?: boolean;
}

export const GrapesjsEditor = ({ designingMode = true }: Props) => {
  const ref = useRef<Editor | null>(null);
  const [hasUndo, setHasUndo] = useState(false);
  const [hasRedo, setHasRedo] = useState(false);

  useEffect(() => {
    setInterval(() => {
      const _hasUndo = ref.current?.UndoManager.hasUndo() || false;
      if (_hasUndo !== hasUndo) setHasUndo(_hasUndo);
      const _hasRedo = ref.current?.UndoManager.hasRedo() || false;
      if (_hasRedo !== hasRedo) setHasRedo(_hasRedo);
    }, 1000);
  }, []);
  // useEffect(() => {
  //   return () => {
  //     const editor = WebEditor({
  //       container: "#nebo-editor",
  //       blockManager: {
  //         appendTo: "#nebo-block",
  //       },
  //       styleManager: {
  //         appendTo: "#nebo-style",
  //       },
  //       layerManager: {
  //         appendTo: "#nebo-layer",
  //       },
  //       traitManager: {
  //         appendTo: "#nebo-trait",
  //       },
  //       selectorManager: {
  //         appendTo: "#nebo-selector",
  //       },
  //       storageManager: {
  //         type: "local",
  //       },
  //       dragMode: "absolute",
  //       fromElement: true,
  //       showToolbar: false,
  //       deviceManager: {
  //         devices: [
  //           {
  //             name: "custom",
  //             width: `420mm`,
  //             height: `594mm`,
  //           },
  //         ],
  //       },
  //       height: "100%",
  //     });

  //     $(".panel__devices").html("");
  //     $(".panel__basic-actions").html("");
  //     $(".panel__editor").html("");
  //     $("#nebo-block").html("");
  //     $("#nebo-style").html("");
  //     $("#nebo-layer").html("");
  //     $("#nebo-trait").html("");
  //     $("#nebo-selector").html("");

  //     editor.onReady(() => {
  //       editor.render();
  //       ref.current = editor;
  //     });
  //   };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const editor = useEditor({ width: "210mm", height: "594mm" });

  useEffect(() => {
    return () => {
      handleChangeMode(designingMode);
    };
  }, [designingMode]);

  const handleChangeMode = (_value: boolean) => {
    ref.current?.onReady(() => {
      if (!_value) {
        ref.current?.runCommand("core:preview");
        // ref.current?.runCommand("sw-visibility");
      } else {
        ref.current?.stopCommand("core:preview");
        // ref.current?.stopCommand("sw-visibility");
      }
    });
  };

  return <div></div>;
};
