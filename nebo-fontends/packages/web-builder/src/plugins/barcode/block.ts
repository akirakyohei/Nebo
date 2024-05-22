import { Editor } from "grapesjs";
import { cmpId } from "./constants";
import { BarcodeBlockOptions, BarcodePluginOptions } from "./types";

export const barcodeBlock: BarcodeBlockOptions = {
  label: "Barcode",
  media: `<svg  viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <g>
      <path fill="none" d="M0 0h24v24H0z"/>
      <path d="M2 4h2v16H2V4zm4 0h1v16H6V4zm2 0h2v16H8V4zm3 0h2v16h-2V4zm3 0h2v16h-2V4zm3 0h1v16h-1V4zm2 0h3v16h-3V4z"/>
  </g>
</svg>
`,
  category: "Content",
  active: true,
  select: true,
  content: {
    type: cmpId,
  },
};

export default (editor: Editor, options: BarcodePluginOptions) => {
  const bm = editor.BlockManager;
  const { blocks = [], blockBarcode = {} } = options;
  if (!blocks || !Array.isArray(blocks)) return;
  if (blocks.includes(cmpId))
    bm.add(cmpId, { ...barcodeBlock, ...blockBarcode });
};
