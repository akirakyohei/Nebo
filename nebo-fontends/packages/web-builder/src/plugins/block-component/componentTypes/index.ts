import grapesjs, { Editor } from "grapesjs";
import layoutComponents, {
  protectedCss as layoutComponentsCss,
} from "./layout";
import contentComponents, {
  protectedCss as contentComponentsCss,
} from "./content";
import Template from "./template";
// import dynamicComponents from "./dynamic";
import postProcessing from "./postProcessing";

export const protectedCss = `
  /* 
   * GLOBAL COMPONENTS
   **************************/
  *[data-gjs-type^=dm-]{
    background-position: center center;
    background-repeat: no-repeat;
    background-size: 100%;
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
    line-height: inherit;
    padding-top:0;
    padding-right:0;
    padding-bottom:0;
    padding-left:0;
  }
  ${layoutComponentsCss}
  ${contentComponentsCss}
  `;

export default function (editor: Editor) {
  const { DomComponents } = editor;

  const opts = {
    defaultModel: DomComponents.getType("default").model,
    editor,
    api: "https://barcodes-xdm4ptfota-uc.a.run.app/api/v1",
  };
  const allComponents = [
    Template,
    // ...dynamicComponents,
    ...layoutComponents,
    ...contentComponents,
  ];

  allComponents.forEach((c) => c(DomComponents, opts));
  postProcessing(editor);
}
