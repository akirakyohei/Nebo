import * as React from "react";
import { useEditor } from "@grapesjs/react";
import { mdiEyeOffOutline, mdiEyeOutline, mdiMenuDown } from "@mdi/js";
import Icon from "@mdi/react";
import type { Component } from "grapesjs";
import { MouseEvent, useEffect, useMemo, useRef, useState } from "react";
import { cx } from "./common";
import { Box } from "@mui/material";

export declare interface LayerItemProps
  extends React.HTMLProps<HTMLDivElement> {
  component: Component;
  level: number;
  draggingCmp?: Component;
  dragParent?: Component;
  parentVisible?: boolean;
}

const itemStyle = { maxWidth: `100%` };

export default function LayerItem({
  component,
  draggingCmp,
  dragParent,
  parentVisible = true,
  ...props
}: LayerItemProps) {
  const editor = useEditor();
  const { Layers } = editor;
  const layerRef = useRef<HTMLDivElement>(null);
  const [layerData, setLayerData] = useState(Layers.getLayerData(component));
  const { open, selected, hovered, components, visible, name } = layerData;
  const componentsIds = components.map((cmp) => cmp.getId());
  const isDragging = draggingCmp === component;
  const cmpHash = componentsIds.join("-");
  const level = props.level + 1;
  const isHovered = hovered || dragParent === component;
  const elementVisible = visible && parentVisible;
  useEffect(() => {
    level === 0 && setLayerData(Layers.getLayerData(component));
    if (layerRef.current) {
      (layerRef.current as any).__cmp = component;
    }
  }, [component]);

  useEffect(() => {
    const up = (cmp: Component) => {
      cmp === component && setLayerData(Layers.getLayerData(cmp));
    };
    const ev = Layers.events.component;
    editor.on(ev, up);

    return () => {
      editor.off(ev, up);
    };
  }, [editor, Layers, component]);

  const cmpToRender = useMemo(() => {
    return components.map((cmp) => (
      <Box
        key={cmp.getId()}
        sx={{ paddingTop: 1, borderLeft: "1px solid var(--gjs-border-color)" }}
      >
        <LayerItem
          component={cmp}
          level={level}
          draggingCmp={draggingCmp}
          dragParent={dragParent}
          parentVisible={elementVisible}
        />
      </Box>
    ));
  }, [cmpHash, draggingCmp, dragParent, elementVisible]);

  const toggleOpen = (ev: MouseEvent) => {
    ev.stopPropagation();
    Layers.setLayerData(component, { open: !open });
  };

  const toggleVisibility = (ev: MouseEvent) => {
    ev.stopPropagation();
    Layers.setLayerData(component, { visible: !elementVisible });
  };

  const select = (event: MouseEvent) => {
    event.stopPropagation();
    Layers.setLayerData(component, { selected: true }, { event });
  };

  const hover = (hovered: boolean) => {
    if (!hovered || !draggingCmp) {
      Layers.setLayerData(component, { hovered });
    }
  };

  return (
    <Box
      className={"layer-item"}
      sx={(theme) => ({
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingLeft: level !== 0 ? 2 : undefined,
      })}
    >
      <Box
        onClick={select}
        onMouseEnter={() => hover(true)}
        onMouseLeave={() => hover(false)}
        data-layer-item
        sx={(theme) => ({
          width: "100%",
          border: "1px solid var(--gjs-border-color)",
          borderRadius: "6px",
          opacity: !elementVisible || isDragging ? 50 : undefined,
        })}
        ref={layerRef}
      >
        <Box
          sx={(theme) => ({
            display: "flex",
            justifyContent: "space-between",
            padding: 1,
            paddingRight: 2,
            background: isHovered
              ? "#4CB7FF99"
              : selected
                ? "#4CB7FF"
                : "#F5F5F5",
            color:
              selected || isHovered
                ? theme.palette.common.white
                : theme.palette.text.primary,
            "&:hover": {
              cursor: "pointer",
            },
          })}
        >
          <Box display={"flex"}>
            <div
              className={cx(
                !components.length && "pointer-events-none opacity-0"
              )}
              onClick={toggleOpen}
            >
              <Icon path={mdiMenuDown} size={0.7} rotate={open ? 0 : -90} />
            </div>
            <div className="truncate flex-grow" style={itemStyle}>
              {name}
            </div>
          </Box>

          <Box
            className={cx(
              "group-hover:opacity-100 cursor-pointer",
              elementVisible ? "opacity-50" : "opacity-100"
            )}
            onClick={toggleVisibility}
          >
            <Icon
              path={elementVisible ? mdiEyeOutline : mdiEyeOffOutline}
              size={0.7}
            />
          </Box>
        </Box>
      </Box>
      {!!(open && components.length) && (
        <Box className={cx(!open && "hidden")} sx={{ width: "100%" }}>
          {cmpToRender}
        </Box>
      )}
    </Box>
  );
}
