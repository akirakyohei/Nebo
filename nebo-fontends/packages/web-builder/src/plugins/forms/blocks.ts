import { Editor } from "grapesjs";
import { TYPES } from "../constants";

export const inputBlock = {
  label: "Input",
  media: `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M7.5 5H13a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5H7.5m-5 0H1a.5.5 0 0 1-.5-.5v-3A.5.5 0 0 1 1 5h1.5M4 2.5h2m-2 9h2m-1-9v9"/></svg>
  `,
  category: "Biểu mẫu",
  activate: true,
  select: true,
  content: { type: TYPES.input },
};

export const textAreaBlock = {
  label: "TextArea",
  media: `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M1 2v3h2V4h2v5H3.5v2h5V9H7V4h2v1h2V2zm20 1h-7v2h6v14H4v-5H2v6a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1"/></svg>
      `,
  category: "Biểu mẫu",
  activate: true,
  select: true,
  content: { type: TYPES.textarea },
};

export const selectBlock = {
  label: "Select",
  media: `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill="currentColor" d="M5.75 7.5h7.5a.75.75 0 0 1 0 1.5h-7.5a.75.75 0 0 1 0-1.5m0 5h7.5a.75.75 0 0 1 0 1.5h-7.5a.75.75 0 0 1 0-1.5m-4-10h6.5a.75.75 0 0 1 0 1.5h-6.5a.75.75 0 0 1 0-1.5M2 14a1 1 0 1 1 0-2a1 1 0 0 1 0 2m1-6a1 1 0 1 1-2 0a1 1 0 0 1 2 0m10.314-3.082L11.07 2.417A.25.25 0 0 1 11.256 2h4.488a.25.25 0 0 1 .186.417l-2.244 2.5a.25.25 0 0 1-.372 0Z"/></svg>
      `,
  category: "Biểu mẫu",
  activate: true,
  select: true,
  content: { type: TYPES.select },
};

export const buttonBlock = {
  label: "Button",
  media: `
     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill="currentColor" d="M1 5.5A2.5 2.5 0 0 1 3.5 3h9A2.5 2.5 0 0 1 15 5.5v4a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 9.5zM3.5 4A1.5 1.5 0 0 0 2 5.5v4A1.5 1.5 0 0 0 3.5 11h9A1.5 1.5 0 0 0 14 9.5v-4A1.5 1.5 0 0 0 12.5 4zM7 7.5a.5.5 0 0 1 .5-.5H12a.5.5 0 0 1 0 1H7.5a.5.5 0 0 1-.5-.5m-1 0a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0"/></svg>
        `,
  category: "Biểu mẫu",
  activate: true,
  select: true,
  content: { type: TYPES.checkbox },
};

export const labelBlock = {
  label: "Label",
  media: `
     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><g fill="none"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m10 19l5.5-5.5M13 22l2.5-2.5M4.414 16.586l11-11A2 2 0 0 1 16.828 5H25a2 2 0 0 1 2 2v8.172a2 2 0 0 1-.586 1.414l-11 11a2 2 0 0 1-2.828 0l-8.172-8.172a2 2 0 0 1 0-2.828"/><path fill="currentColor" d="M23 10a1 1 0 1 1-2 0a1 1 0 0 1 2 0"/></g></svg>
        `,
  category: "Biểu mẫu",
  activate: true,
  select: true,
  content: { type: TYPES.label },
};

export const checkboxBlock = {
  label: "Checkbox",
  media: `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M4 13c-1.11 0-2 .89-2 2v4c0 1.11.89 2 2 2h4c1.11 0 2-.89 2-2v-4c0-1.11-.89-2-2-2m.2 1.5l1.06 1.05l-3.99 3.95l-2.53-2.55l1.07-1.05l1.47 1.49M4 3c-1.11 0-2 .89-2 2v4c0 1.11.89 2 2 2h4c1.11 0 2-.89 2-2V5c0-1.11-.89-2-2-2M4 5h4v4H4m8-4h10v2H12m0 12v-2h10v2m-10-8h10v2H12Z"/></svg>
  `,
  category: "Biểu mẫu",
  activate: true,
  select: true,
  content: { type: TYPES.checkbox },
};

export const radioBlock = {
  label: "Radio",
  media: `
 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M6 13c-2.21 0-4 1.79-4 4s1.79 4 4 4s4-1.79 4-4s-1.79-4-4-4m0 6c-1.1 0-2-.9-2-2s.9-2 2-2s2 .9 2 2s-.9 2-2 2M6 3C3.79 3 2 4.79 2 7s1.79 4 4 4s4-1.79 4-4s-1.79-4-4-4m6 2h10v2H12zm0 14v-2h10v2zm0-8h10v2H12z"/></svg> 
 `,
  category: "Biểu mẫu",
  activate: true,
  select: true,
  content: { type: TYPES.radio },
};

export default (editor: Editor, options = {}) => {
  const { BlockManager } = editor;

  BlockManager.add(TYPES.input, { ...inputBlock });
  BlockManager.add(TYPES.textarea, { ...textAreaBlock });
  BlockManager.add(TYPES.select, { ...selectBlock });
  BlockManager.add(TYPES.checkbox, { ...checkboxBlock });
  BlockManager.add(TYPES.radio, { ...radioBlock });
  BlockManager.add(TYPES.label, { ...labelBlock });
  BlockManager.add(TYPES.button, { ...buttonBlock });
};
