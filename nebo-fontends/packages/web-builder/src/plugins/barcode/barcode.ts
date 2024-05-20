import loadComponents from "./components";
import loadBlocks from "./block";
import loadTraits from "./trait";
import { Editor } from "grapesjs";
import { BarcodeBlockOptions, BarcodePluginOptions } from "./types";
import defaultOptions from "./constants";

export default (
  editor: Editor,
  opts: Partial<
    Omit<BarcodePluginOptions, "blockBarcode"> & {
      blockBarcode?: Partial<BarcodeBlockOptions>;
    }
  >
) => {
  const options: BarcodePluginOptions = {
    ...defaultOptions,
    ...opts,
    blockBarcode: { ...defaultOptions.blockBarcode, ...opts.blockBarcode },
  };

  // Add traits
  loadTraits(editor, options);

  // Add components
  loadComponents(editor, options);

  // Add blocks
  loadBlocks(editor, options);
};
