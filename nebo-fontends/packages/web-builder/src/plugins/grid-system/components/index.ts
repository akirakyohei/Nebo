import { GS_TYPES, GridSystemPluginOptions } from "../types";
import Column from "./Column";
import Columns from "./Columns";
import Row from "./Row";
import { Editor } from "grapesjs";

export default (editor: Editor, config: GridSystemPluginOptions) => {
  const dc = editor.DomComponents;
  const opts = {
    ...config,
    editor,
  };

  [Row, Columns, Column].forEach((c) => c(dc, opts));

  editor.on("component:mount", (component) => {
    if (component.getAttributes()["data-gjs-type"] === GS_TYPES.column) {
      const parent = component.parent();
      const row = parent.parent();
      const columns = component.getColumns && component.getColumns();
      !row && component.resetHandles(component, false);
      row && columns && component.setColumns(columns);
    }
  });
};
