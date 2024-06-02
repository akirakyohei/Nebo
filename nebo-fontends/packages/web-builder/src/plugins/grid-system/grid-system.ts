import loadComponents from "./component";
import loadBlocks from "./blocks";
import loadStyles from "./styles";
import loadSorter from "./sorter";
import defaultOptions from "./constants";
import { Editor } from "grapesjs";
import { GridSystemPluginOptions } from "./types";

export default (editor: Editor, opts: Partial<GridSystemPluginOptions>) => {
  const options = {
    ...defaultOptions,
    ...opts,
  };

  loadStyles(editor, options);

  // Add blocks
  loadBlocks(editor, options);

  // Add components
  loadComponents(editor, options);

  loadSorter(editor, options);
};
