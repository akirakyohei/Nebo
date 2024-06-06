import grapesjs, { Editor } from "grapesjs";
import { BLOCK_CATEGORIES } from "../constants";

import contentBlocks from "./content";
import layoutBlocks from "./layout";

const categories = [
  {
    name: BLOCK_CATEGORIES.content,
    blocks: contentBlocks,
  },
  {
    name: BLOCK_CATEGORIES.layout,
    blocks: layoutBlocks,
  },
];

function customRender({ model, className }: any) {
  return `
      <div class="gjs-block-header">
        <i class="dm-grip block-handle"></i>
      </div>
      <div class="gjs-block-icon">
        <i class="${model.get("iconClass")}"></i>
      </div>
      <div class="gjs-block-label">${model.get("label")}</div>
  `;
}

export default function (editor: Editor) {
  const bm = editor.BlockManager;
  const blocks = categories.reduce((acc: any, cat) => {
    const categoryBlocks = Object.values(cat.blocks).map((b) => ({
      ...b,
      category: cat.name,
      render: customRender,
    }));
    return [...acc, ...categoryBlocks];
  }, []);

  blocks.forEach((block: any) => bm.add(block.name, block));
}
