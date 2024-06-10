import { Editor } from "grapesjs";
import { TYPES } from "../constants";

export default (editor: Editor, opts = {}) => {
  const { DomComponents } = editor;
  DomComponents.addType(TYPES.input, { extend: "input" });
  DomComponents.addType(TYPES.textarea, { extend: "textarea" });
  DomComponents.addType(TYPES.select, { extend: "select" });
  DomComponents.addType(TYPES.radio, { extend: "radio" });
  DomComponents.addType(TYPES.checkbox, { extend: "checkbox" });
  DomComponents.addType(TYPES.button, { extend: "button" });
  DomComponents.addType(TYPES.label, { extend: "label" });
};
