import { Editor } from "grapesjs";
import { cmpId } from "./constants";
import { BarcodeBlockOptions, BarcodePluginOptions } from "./types";

export const barcodeBlock: BarcodeBlockOptions = {
  label: "Barcode",
  media: `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M2 6h2v12H2zm3 0h1v12H5zm2 0h3v12H7zm4 0h1v12h-1zm3 0h2v12h-2zm3 0h3v12h-3zm4 0h1v12h-1z"/></svg>
  `,
  category: "Content",
  active: true,
  select: true,
  content: {
    type: cmpId,
  },
};

export default (editor: Editor, options: BarcodePluginOptions) => {
  const {BlockManager} = editor;
  const { blocks = [], blockBarcode = {} } = options;
  if (!blocks || !Array.isArray(blocks)) return;
  if (blocks.includes(cmpId))
    BlockManager.add(cmpId, { ...barcodeBlock, ...blockBarcode });
};
