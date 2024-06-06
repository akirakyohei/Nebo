import grapesjs, { Editor } from "grapesjs";

const showLayers = {
  run(editor: Editor, sender: any) {
    const el = document.getElementById("rc-tabs-0-tab-layer-manager");
    if (el) el.click();
  },
};

const updateEmptyState = {
  run(editor: Editor) {
    const { Canvas, getComponents } = editor;
    const className = "empty-state";
    const body = Canvas.getBody();
    const components = getComponents();
    components.length <= 0
      ? body.classList.add(className)
      : body.classList.remove(className);
  },
};

const editLogic = {
  run(editor: Editor) {},
};

export default function (editor: Editor) {
  const { Commands } = editor;
  const commands = [
    { id: "open-layers", command: showLayers },
    { id: "update-empty-state", command: updateEmptyState },
    { id: "edit-logic", command: editLogic },
    { id: "clear-canvas", command: editLogic },
    { id: "convert-legacy", command: editLogic },
    { id: "revert-canvas", command: editLogic },
    { id: "reload-canvas", command: editLogic },
    { id: "variable-error", command: editLogic },
  ];
  commands.forEach(({ id, command }) => Commands.add(id, command));
}
