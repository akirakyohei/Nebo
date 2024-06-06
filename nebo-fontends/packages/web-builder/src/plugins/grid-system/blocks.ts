import { Editor } from "grapesjs";
import { BLOCKS, GridSystemPluginOptions, TYPES } from "./types";

const { columns, row, column } = TYPES;

export const rowBlock = {
  label: "Row",
  category: "Bố cục",
  media: `<svg fill="currentColor"  viewBox="0 0 256 256" id="Flat" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M208,140H48a12.01375,12.01375,0,0,0-12,12v40a12.01375,12.01375,0,0,0,12,12H208a12.01375,12.01375,0,0,0,12-12V152A12.01375,12.01375,0,0,0,208,140Zm4,52a4.00458,4.00458,0,0,1-4,4H48a4.00458,4.00458,0,0,1-4-4V152a4.00458,4.00458,0,0,1,4-4H208a4.00458,4.00458,0,0,1,4,4ZM208,52H48A12.01375,12.01375,0,0,0,36,64v40a12.01375,12.01375,0,0,0,12,12H208a12.01375,12.01375,0,0,0,12-12V64A12.01375,12.01375,0,0,0,208,52Zm4,52a4.00458,4.00458,0,0,1-4,4H48a4.00458,4.00458,0,0,1-4-4V64a4.00458,4.00458,0,0,1,4-4H208a4.00458,4.00458,0,0,1,4,4Z"></path> </g></svg>`,
  attributes: {
    class: "gjs-fonts gjs-f-b1",
  },
  content: {
    type: row,
    components: {
      type: columns,
      components: { type: column },
    },
  },
};

export const columnBlock = {
  label: "Column",
  category: "Bố cục",
  media: `<svg fill="currentColor" viewBox="0 0 32 32" id="icon" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><defs><style>.cls-1{fill:none;}</style></defs><title>column</title><rect x="24" y="4" width="2" height="24"></rect><path d="M18,6V26H14V6h4m0-2H14a2,2,0,0,0-2,2V26a2,2,0,0,0,2,2h4a2,2,0,0,0,2-2V6a2,2,0,0,0-2-2Z"></path><rect x="6" y="4" width="2" height="24"></rect><rect id="_Transparent_Rectangle_" data-name="<Transparent Rectangle>" class="cls-1" width="32" height="32"></rect></g></svg>`,
  attributes: {
    class: "gjs-fonts gjs-f-b3",
  },
  content: { type: TYPES.column },
};

export default (editor: Editor, options: GridSystemPluginOptions) => {
  const bm = editor.BlockManager;

  const { blocks = [] } = options;

  if (!blocks || !Array.isArray(blocks)) return;
  if (blocks.includes(BLOCKS.row)) bm.add(BLOCKS.row, rowBlock);
  if (blocks.includes(BLOCKS.column)) bm.add(BLOCKS.column, columnBlock);

  editor.BlockManager.add("column-6-6", {
    label: "2 Columns",
    category: "Bố cục",
    media: `
      <svg viewBox="0 0 23 24">
      <path fill="currentColor" d="M2 20h8V4H2v16Zm-1 0V4a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1ZM13 20h8V4h-8v16Zm-1 0V4a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1h-8a1 1 0 0 1-1-1Z"></path>
      </svg>
      `,
    content: {
      type: TYPES.row,
      components: [
        { type: TYPES.column, attributes: { class: "col-md-6" } },
        { type: TYPES.column, attributes: { class: "col-md-6" } },
      ],
    },
  });

  editor.BlockManager.add("column-4-4-4", {
    label: "3 Columns",
    category: "Bố cục",
    media: `<svg viewBox="0 0 23 24">
      <path fill="currentColor" d="M2 20h4V4H2v16Zm-1 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1ZM17 20h4V4h-4v16Zm-1 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1ZM9.5 20h4V4h-4v16Zm-1 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1Z"></path>
    </svg>`,
    content: {
      type: TYPES.row,
      components: [
        { type: TYPES.column, attributes: { class: "col-md-4" } },
        { type: TYPES.column, attributes: { class: "col-md-4" } },
        { type: TYPES.column, attributes: { class: "col-md-4" } },
      ],
    },
  });

  editor.BlockManager.add("column-4-8", {
    label: "2 Columns 4/8",
    category: "Bố cục",
    media: `
      <svg viewBox="0 0 24 24">
      <path fill="currentColor" d="M2 20h5V4H2v16Zm-1 0V4a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1ZM10 20h12V4H10v16Zm-1 0V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H10a1 1 0 0 1-1-1Z"></path>
      </svg>
      `,
    content: {
      type: TYPES.row,
      components: [
        { type: TYPES.column, attributes: { class: "col-md-4" } },
        { type: TYPES.column, attributes: { class: "col-md-8" } },
      ],
    },
  });

  editor.BlockManager.add("column-3-3-3-3", {
    label: "4 Columns 3/3/3/3",
    category: "Bố cục",
    media: `<svg fill="currentColor" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 35 35" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <rect width="6.119" height="35"></rect> <rect x="9.615" width="6.133" height="35"></rect> <rect x="19.245" width="6.116" height="35"></rect> <rect x="28.873" width="6.127" height="35"></rect> </g> </g> </g></svg>`,
    content: {
      type: TYPES.row,
      components: [
        { type: TYPES.column, attributes: { class: "col-md-3" } },
        { type: TYPES.column, attributes: { class: "col-md-3" } },
        { type: TYPES.column, attributes: { class: "col-md-3" } },
        { type: TYPES.column, attributes: { class: "col-md-3" } },
      ],
    },
  });

  editor.BlockManager.add("column-8-4", {
    label: "2 Columns 8/4",
    category: "Bố cục",
    media: `
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" transform="matrix(-1,0,0,1,0,0)">
      <path fill="currentColor" d="M2 20h5V4H2v16Zm-1 0V4a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1ZM10 20h12V4H10v16Zm-1 0V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H10a1 1 0 0 1-1-1Z"></path>
      </svg>
      `,
    content: {
      type: TYPES.row,
      components: [
        { type: TYPES.column, attributes: { class: "col-md-8" } },
        { type: TYPES.column, attributes: { class: "col-md-4" } },
      ],
    },
  });
};
