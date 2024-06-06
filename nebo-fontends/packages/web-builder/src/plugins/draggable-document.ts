import { Editor } from "grapesjs";

export default (editor: Editor, opts: {}) => {
  let isDown = false;

  editor.on("canvas:frame:load:body", ({ window }) => {
    window.document.body?.addEventListener(
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
};
