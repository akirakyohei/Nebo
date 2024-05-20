import { Editor } from "grapesjs";
import { cmpId } from "./constants";
import { BarcodeBlockOptions, BarcodePluginOptions } from "./types";

export const barcodeBlock: BarcodeBlockOptions = {
  label: "Barcode",
  media: `<svg version="1.1" id="svg2" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://creativecommons.org/ns#" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:svg="http://www.w3.org/2000/svg" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" sodipodi:docname="barcode.svg" inkscape:version="0.48.4 r9939" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="159px" height="159px" viewBox="0 0 1200 1200" enable-background="new 0 0 1200 1200" xml:space="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <sodipodi:namedview inkscape:cy="-213.09829" inkscape:cx="1918.0743" inkscape:zoom="0.18624688" showgrid="false" id="namedview3072" guidetolerance="10" gridtolerance="10" objecttolerance="10" borderopacity="1" bordercolor="#666666" pagecolor="#ffffff" inkscape:current-layer="svg2" inkscape:window-maximized="1" inkscape:window-y="24" inkscape:window-height="876" inkscape:window-width="1535" inkscape:pageshadow="2" inkscape:pageopacity="0" inkscape:window-x="65"> </sodipodi:namedview> <path id="path3031" inkscape:connector-curvature="0" d="M0,99.87v1000.26h100.26V99.87H0L0,99.87z M186.135,99.87v1000.26h24.089 V99.87H186.135L186.135,99.87z M244.018,99.87v1000.26h76.219V99.87H244.018L244.018,99.87z M397.676,99.87v1000.26h32.525V99.87 H397.676L397.676,99.87z M516.125,99.87v1000.26h24.041V99.87H516.125L516.125,99.87z M550.504,99.87v1000.26h99.626V99.87H550.504 L550.504,99.87z M709.915,99.87v1000.26h50.18V99.87H709.915L709.915,99.87z M858.94,99.87v1000.26h11.118V99.87H858.94 L858.94,99.87z M946.57,99.87v1000.26h33.501V99.87H946.57L946.57,99.87z M1065.946,99.87v1000.26h24.09V99.87H1065.946 L1065.946,99.87z M1100.374,99.87v1000.26H1200V99.87H1100.374L1100.374,99.87z"></path> </g></svg>`,
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
