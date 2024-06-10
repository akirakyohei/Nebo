import loadComponents from "./components";
import loadBlocks from "./blocks";
import { Editor } from "grapesjs";
import { QrcodeBlockOptions, QrcodePluginOptions } from "./types";
import defaultOptions from "./constants";

export default (
  editor: Editor,
  opts: Partial<
    Omit<QrcodePluginOptions, "blockQrcode"> & {
      blockQrcode?: Partial<QrcodeBlockOptions>;
    }
  >
) => {
  const options: QrcodePluginOptions = {
    ...defaultOptions,
    ...opts,
    blockQrcode: { ...defaultOptions.blockQrcode, ...opts.blockQrcode },
  };

  // Add components
  loadComponents(editor, options);

  // Add blocks
  loadBlocks(editor, options);
};
