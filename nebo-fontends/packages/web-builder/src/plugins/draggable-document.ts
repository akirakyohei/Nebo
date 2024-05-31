import { Editor } from "grapesjs";
import { event } from "jquery";

export default (editor: Editor, opts: {}) => {
  let isDown = false;

  editor.onReady(() => {
    const editorEl =
      typeof editor.config.container === "string" ||
      editor.config.container === undefined
        ? document.querySelector<HTMLElement>(editor.config.container || "gjs")
        : editor.config.container;
    if (editorEl) {
      if (true) {
        editor.on("canvas:frame:load:body", () => {
          editor.Canvas.getDocument()
            .querySelector("body")
            ?.addEventListener(
              "mousedown",
              function (e) {
                console.log("mouse down");
                isDown = true;
              },
              true
            );
        });

        document.addEventListener(
          "mouseup",
          function () {
            isDown = false;
          },
          true
        );
        document.addEventListener("mousemove", function (event) {
          if (isDown && event.ctrlKey) {
            var deltaX = event.movementX;
            var deltaY = event.movementY;
            var rect = editor.Canvas.getCoords();
            editor.Canvas.setCoords(`${rect.x + deltaX}`, `${rect.y + deltaY}`);
          }
        });
      }
    }
  });
};
