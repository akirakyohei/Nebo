// import { Editor, WebEditor } from "./index";
// // import "./style.scss";
// import { usePlugin } from "grapesjs";
// import { useEffect, useMemo, useRef, useState } from "react";
// import { renderToString } from "react-dom/server";
// import {
//   Button,
//   ButtonGroup,
//   ButtonToolbar,
//   Col,
//   Container,
//   InputGroup,
//   OverlayTrigger,
//   Row,
//   Stack,
//   Tab,
//   Tabs,
//   Tooltip,
// } from "react-bootstrap";
// import $ from "jquery";
// import { ToolButton, ToolButtonProps } from "./compoents/ToolButton";
// import { ZoomButton } from "./compoents/ZoomButton";

// export const App = () => {
//   const ref = useRef<Editor | null>(null);
//   const [hasUndo, setHasUndo] = useState(false);
//   const [hasRedo, setHasRedo] = useState(false);
//   const [isFullScreen, setIsFullScreen] = useState(
//     !!document.fullscreenElement
//   );
//   const [isActiveRuler, setIsActiveRulers] = useState(false);
//   const [isActiveOutline, setIsActiveOutline] = useState(false);
//   useEffect(() => {
//     // setInterval(() => {
//     //   const _hasUndo = ref.current?.UndoManager.hasUndo() || false;
//     //   if (_hasUndo !== hasUndo) setHasUndo(_hasUndo);
//     //   const _hasRedo = ref.current?.UndoManager.hasRedo() || false;
//     //   if (_hasRedo !== hasRedo) setHasRedo(_hasRedo);
//     // }, 1000);
//   }, []);
//   useEffect(() => {
//     // return () => {
//     const editor = WebEditor({
//       title: "moiws",
//       container: "#nebo-editor",
//       blockManager: {
//         appendTo: "#nebo-block",
//       },
//       styleManager: {
//         appendTo: "#nebo-style",
//       },
//       layerManager: {
//         appendTo: "#nebo-layer",
//       },
//       traitManager: {
//         appendTo: "#nebo-trait",
//       },
//       selectorManager: {
//         appendTo: "#nebo-selector",
//       },
//       storageManager: {
//         type: "local",
//       },
//       dragMode: "absolute",
//       deviceManager: {
//         devices: [
//           {
//             name: "custom",
//             width: `420mm`,
//             height: `594mm`,
//           },
//         ],
//       },
//     });

//     $(".panel__devices").html("");
//     $(".panel__basic-actions").html("");
//     $(".panel__editor").html("");
//     $("#nebo-block").html("");
//     $("#nebo-style").html("");
//     $("#nebo-layer").html("");
//     $("#nebo-trait").html("");
//     $("#nebo-selector").html("");

//     editor.onReady(() => {
//       const panelManager = editor.Panels;
//       panelManager.removePanel("views-container");

//       panelManager.addPanel({
//         id: "left-group-actions-panel",
//         el: ".panel__left-group-actions",
//       });
//       const leftGroupPanel = editor.Panels.addPanel({
//         id: "left-group-btn-actions",
//         el: ".left-group-btn-actions",
//         buttons: [],
//       });
//       const leftGroupButtons = leftGroupPanel?.get("buttons");
//       if (!leftGroupButtons?.get("back-btn")) {
//         leftGroupButtons?.add(
//           [
//             {
//               id: "back-btn",
//               className: "btn-toggle-borders",
//               attributes: {
//                 title: "back",
//               },
//               label: `${renderToString(
//                 <a href="/" className="link-btn">
//                   <i
//                     className="fa fa-chevron-circle-left"
//                     aria-hidden="true"
//                   ></i>
//                   back
//                 </a>
//               )}`,
//               command: (_editor: any) => {
//                 window.location.href = "/";
//               },
//             },
//           ],
//           { merge: true, temporary: true }
//         );
//         // editor.render();
//       }
//       editor.render();
//       ref.current = editor;
//     });
//     // };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const btnGropus: ToolButtonProps[] = [
//     {
//       id: "undo",
//       content: <i className="fa fa-undo"></i>,
//       className: hasUndo
//         ? "nebo-layout-btn-color-secondary"
//         : "nebo-layout-btn-color-secondary-disabled",
//       disabled: !hasUndo,
//       tooltip: "Hoàn tác",
//       onClick: () => ref.current?.UndoManager.undo(),
//     },
//     {
//       id: "redo",
//       content: <i className="fa fa-repeat"></i>,
//       className: hasRedo
//         ? "nebo-layout-btn-color-secondary"
//         : "nebo-layout-btn-color-secondary-disabled",
//       disabled: !hasRedo,
//       tooltip: "Tái thực hiện",
//       onClick: () => ref.current?.UndoManager.undo(),
//     },
//     {
//       id: "view-components",
//       active: isActiveOutline,
//       content: <i className="fa fa-square-o"></i>,
//       className: "nebo-layout-btn-color-secondary",
//       tooltip: "Xem khối",
//       onClick: () => {
//         if (!isActiveOutline) {
//           ref.current?.runCommand("core:component-outline");
//         } else {
//           ref.current?.stopCommand("core:component-outline");
//         }
//         setIsActiveOutline(!isActiveOutline);
//       },
//     },
//     {
//       id: "fullscreen",
//       active: isFullScreen,
//       content: <i className="fa fa-arrows-alt"></i>,
//       className: "nebo-layout-btn-color-secondary",
//       tooltip: "Toàn màn hình",
//       onClick: () => {
//         const containerDiv = document.getElementById("nebo-container");
//         if (containerDiv) {
//           if (!document.fullscreenElement) {
//             containerDiv.requestFullscreen();
//             setIsFullScreen(true);
//           } else {
//             document.exitFullscreen();
//             setIsFullScreen(false);
//           }
//         }
//       },
//     },
//     {
//       id: "ruler",
//       active: isActiveRuler,
//       content: <i className="fa fa-minus-square-o" aria-hidden="true"></i>,
//       className: "nebo-layout-btn-color-secondary",
//       tooltip: "Thước",
//       onClick: () => {
//         if (!isActiveRuler) {
//           ref.current?.runCommand("ruler-visibility");
//         } else {
//           ref.current?.stopCommand("ruler-visibility");
//         }
//         setIsActiveRulers(!isActiveRuler);
//       },
//     },
//   ];

//   return (
//     <div id="nebo-container">
//       <Container fluid className="p-0 nebo-layout-container">
//         <Row className="border">
//           <div>Navbar</div>
//         </Row>
//         <div className="nebo-layout-row">
//           <div className="p-0 nebo-layout-col">
//             <Tabs
//               fill
//               defaultValue="block"
//               className="nebo-pn-left-container rounded-0"
//             >
//               <Tab eventKey="block" title="Thêm">
//                 <div id="nebo-block"></div>
//               </Tab>
//               <Tab eventKey="style" title="Thuộc tính">
//                 <div id="nebo-style"></div>
//               </Tab>
//             </Tabs>
//           </div>
//           <div className="p-0 border border-1 flex-fill">
//             <div id="nebo-options">
//               <ButtonToolbar className="justify-content-between py-1 px-2">
//                 <ButtonGroup style={{ gap: "4px" }}>
//                   {btnGropus.map((item, index) => (
//                     <ToolButton key={index} {...item} />
//                   ))}
//                 </ButtonGroup>
//                 <Stack direction="horizontal" gap={4}>
//                   <ZoomButton
//                     getZoom={() => {
//                       return ref.current?.Canvas.getZoom() || 100;
//                     }}
//                     onZoom={function (value: number): void {
//                       ref.current?.runCommand("zoom", { value: value });
//                     }}
//                     onZoomIn={function (): void {
//                       ref.current?.runCommand("zoom-in");
//                     }}
//                     onZoomOut={function (): void {
//                       ref.current?.runCommand("zoom-out");
//                     }}
//                   />
//                   <ButtonGroup>
//                     <Button>
//                       <i className="fa fa-plus"></i>
//                     </Button>
//                     <Button>
//                       <i className="fa fa-plus"></i>
//                     </Button>
//                   </ButtonGroup>
//                 </Stack>
//               </ButtonToolbar>
//             </div>
//             <div id="nebo-editor"></div>
//           </div>
//           <div className="p-0 nebo-layout-col">
//             <Tabs fill defaultValue="data" className="nebo-pn-right-container">
//               <Tab eventKey="data" title="Dữ liệu">
//                 <div id="nebo-data"></div>
//               </Tab>
//               <Tab eventKey="layer" title="Cấu trúc">
//                 <div id="nebo-layer"></div>
//               </Tab>
//               <Tab eventKey="trait" title="Đặc điểm">
//                 <div id="nebo-trait"></div>
//               </Tab>
//             </Tabs>
//           </div>
//         </div>
//       </Container>
//       <div id="nebo-selector" className="d-none"></div>
//     </div>
//   );
// };

// export default App;

//

import { WebEditor } from "./editor";
import { Editor, usePlugin } from "grapesjs";
import { useEffect, useMemo, useRef } from "react";

export const App = () => {
  const ref = useRef<Editor | null>(null);

  useEffect(() => {
    return () => {
      const editor = WebEditor({
        container: "#gjs",
        storageManager: {
          type: "local",
        },
        // dragMode: "absolute",
        deviceManager: {
          devices: [
            {
              name: "custom",
              width: `${210}mm`,
              height: `${594}mm`,
            },
          ],
        },
      });
      // editor.onReady(() => {
      //   editor.Panels.addPanel({
      //     id: "left-group-actions-panel",
      //     el: ".panel__left-group-actions",
      //   });
      //   const leftGroupPanel = editor.Panels.addPanel({
      //     id: "left-group-btn-actions",
      //     el: ".left-group-btn-actions",
      //     buttons: [],
      //   });
      //   const leftGroupButtons = leftGroupPanel?.get("buttons");
      //   if (!leftGroupButtons?.get("back-btn")) {
      //     leftGroupButtons?.add(
      //       [
      //         {
      //           id: "back-btn",
      //           className: "btn-toggle-borders",
      //           attributes: {
      //             title: "back",
      //           },
      //           label: `<div>dds</div>`,
      //           command: (_editor: any) => {
      //             console.log("fdskjf");
      //           },
      //         },
      //       ],
      //       { merge: true, temporary: true }
      //     );
      //     // editor.render();
      //   }
      //   ref.current = editor;
      // });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log(ref.current?.storeData());
  }, [ref.current?.storeData]);
  return (
    <div>
      <div>
        <div className="panel__left-group-actions">
          <div className="left-group-btn-actions"></div>
        </div>
        <div id="gjs"></div>
        <div id="block"></div>
      </div>
      <div></div>
    </div>
  );
};

export default App;
