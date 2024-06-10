import { Editor } from "grapesjs";
import loadBlocks from "./blocks";
import loadComponents from "./components";

export default (editor: Editor, options = {}) => {
  loadComponents(editor, options);
  loadBlocks(editor, options);
};
