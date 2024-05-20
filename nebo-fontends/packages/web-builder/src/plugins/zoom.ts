import { Editor } from "grapesjs";

export default (editor: Editor, opts: {}) => {
  editor.Commands.add("zoom", {
    run(editor: Editor, sender, { value }: { value: number }) {
      editor.Canvas.setZoom(`${value}`);
      editor.Canvas.refresh();
    },
  });
  editor.Commands.add("zoom-in", {
    run(editor: Editor) {
      const zoom = editor.Canvas.getZoom();
      editor.Canvas.setZoom(`${zoom + 5}`);
      editor.Canvas.refresh();
    },
  });
  editor.Commands.add("zoom-out", {
    run: () => {
      const zoom = editor.Canvas.getZoom();
      editor.Canvas.setZoom(`${zoom - 5}`);
      editor.Canvas.refresh();
    },
  });

  //   document.addEventListener("keydown", function (event) {
  //     // debugger;
  //     if (event.ctrlKey && (event.key === "W" || event.key === "D")) {
  //       event.preventDefault();
  //       editor.runCommand("zoom-in");
  //     }
  //     if (event.shiftKey && (event.key === "-" || event.key === "_")) {
  //       event.preventDefault();
  //       editor.runCommand("zoom-out");
  //     }
  //   });
  editor.onReady(() => {
    const editorEl =
      typeof editor.config.container === "string" ||
      editor.config.container === undefined
        ? document.querySelector<HTMLElement>(editor.config.container || "gjs")
        : editor.config.container;
    if (editorEl) {
      editorEl.addEventListener("wheel", (event) => {
        if (event.ctrlKey) {
          event.preventDefault();
          if (event.deltaY > 0) {
            editor.runCommand("zoom-in");
          } else {
            editor.runCommand("zoom-out");
          }
        }
      });
      editorEl
        .querySelector<HTMLIFrameElement>(".gjs-frame")
        ?.contentDocument?.addEventListener("wheel", (event) => {
          if (event.ctrlKey) {
            event.preventDefault();
            if (event.deltaY > 0) {
              editor.runCommand("zoom-in");
            } else {
              editor.runCommand("zoom-out");
            }
          }
        });
    }
  });
};
