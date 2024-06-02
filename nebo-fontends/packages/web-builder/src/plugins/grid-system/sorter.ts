import { Editor } from "grapesjs";
import { GridSystemPluginOptions, TYPES } from "./types";

export default (editor: Editor, opts: GridSystemPluginOptions) => {
  editor.on("block:drag:stop", function (element: any, block: any) {
    if (!element) {
      return;
    }
    const parent = element.parent();
    if (!parent) {
      return;
    }

    if (
      element?.get("type") != TYPES.row &&
      parent?.get("type") == opts.mainComponent
    ) {
      element.replaceWith({
        type: TYPES.row,
        components: [{ type: TYPES.column, components: [element] }],
      });
    }

    if (
      element?.get("type") == TYPES.column &&
      parent?.get("type") == opts.mainComponent
    ) {
      element.replaceWith({
        type: TYPES.row,
        components: [element],
      });
    }
  });
};
