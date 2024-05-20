import { Editor } from "grapesjs";
import { BarcodePluginOptions } from "./types";

export default function (editor: Editor, opts: BarcodePluginOptions) {
  const options = {
    name: "info-select",
  };
  // const tm = editor.Traits
  // const select = tm.getType("select");

  // tm.types[name] = new select(name).createLabel({ label,component, trait: { model } }) {
  //   const title = model.get("info");
  //   return `<div class="gjs-label-wrp-2" ${title ? `title="${title}"` : ""}>
  //         ${label}
  //         ${title ? `<i class="fa-solid fa-square-info"></i>` : ""}
  //       </div>`;
  // },
}
