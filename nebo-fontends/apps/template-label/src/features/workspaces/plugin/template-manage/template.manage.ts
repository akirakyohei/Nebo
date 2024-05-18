import { Editor, Plugin } from "grapesjs";

interface TemplateManagerPluginOptions {
  onSaveTemplate: (editor: Editor) => void;
}

export const TemplateManagerPlugin: Plugin<TemplateManagerPluginOptions> = (
  editor: Editor,
  options: TemplateManagerPluginOptions
) => {
  editor.Commands.add("save-as-templates", {
    run(editor: Editor) {
      options.onSaveTemplate(editor);
    },
  });
  const pn = editor.Panels;
  pn.addButton("options", {
    id: "save-as-templates",
    className: "fa fa-folder-o",
    attributes: {
      title: "Save as template",
    },
    command: "save-as-templates", //Open modal
  });
  pn.addButton("views", {
    id: "open-pages",
    className: "fa fa-file-o",
    attributes: {
      title: "Take Screenshot",
    },
    command: "open-pages",
    togglable: false,
  });
};
