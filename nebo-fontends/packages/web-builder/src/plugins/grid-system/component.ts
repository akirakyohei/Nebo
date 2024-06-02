import { Component, Editor } from "grapesjs";
import {
  ACTIONS,
  GridSystemPluginOptions,
  MAX_COLUMNS,
  MAX_GRID,
  RESIZABLE_PROPS,
  RESIZER_NONE,
  TYPES,
} from "./types";

export default (editor: Editor, opts: GridSystemPluginOptions) => {
  const Components = editor.DomComponents;

  Components.addType(TYPES.row, {
    model: {
      defaults: {
        name: "Row",
        draggable: true, // IT CAN BE DRAGGED INTO these components
        droppable: '[data-gjs-type="' + TYPES.column + '"]', // these components CAN BE DROPPED INTO IT
        attributes: { class: "container" },
      },
      init(this: any) {
        editor.on(
          "component:add",
          (component: { parent: () => any; remove: () => void }) => {
            const parent = component.parent();
            if (parent && parent.components().models.length > MAX_COLUMNS) {
              component.remove();
            }
          }
        );

        editor.on("component:create", (component: { setSizeClass: any }) => {
          if (typeof component.setSizeClass === "function") {
          }
        });

        this.on(
          "component:update:components",
          (
            component: any,
            components: any,
            update: { action: any; index: any }
          ) => {
            const { action, index } = update;

            if (
              action === ACTIONS.addComponent ||
              action === ACTIONS.moveComponent ||
              action === ACTIONS.cloneComponent
            ) {
              addNewComponentHandler(component, components, index);
            }

            if (action === ACTIONS.removeComponent) {
              removeComponentHandler(component, components, index);
            }
          }
        );
      },
    },
    isComponent(el: any) {
      return el.dataset && el.dataset.gjsType === TYPES.row;
      return false;
    },
  });

  Components.addType(TYPES.column, {
    model: {
      defaults: {
        tagName: "div",
        name: "Column",
        attributes: {
          "data-dm-category": "layout",
        },
        resizable: {
          onEnd: (em: any) => {
            const selected = editor.getSelected();
            selected?.set(RESIZABLE_PROPS.startX, undefined);
            selected?.set(RESIZABLE_PROPS.prevX, undefined);
            selected?.set(RESIZABLE_PROPS.prevDirection, undefined);
            selected?.set(RESIZABLE_PROPS.prevDeltaX, undefined);
            editor.Canvas.toggleFramesEvents(true);
          },
          updateTarget: (
            el: any,
            rect: any,
            opt: { resizer: { currentPos: any; handlerAttr: any } }
          ) => {
            editor.UndoManager.stop();
            const { currentPos, handlerAttr } = opt.resizer;
            const { x: currentX } = currentPos;
            const selected = editor.getSelected();
            let startX = Number(selected?.get(RESIZABLE_PROPS.startX));
            if (!startX) {
              startX = currentX;
              selected?.set(RESIZABLE_PROPS.startX, startX);
            }

            let prevX = Number(selected?.get(RESIZABLE_PROPS.prevX));
            if (!prevX) {
              prevX = currentX;
              selected?.set(RESIZABLE_PROPS.prevX, prevX);
            }

            let prevDirection = selected?.get(RESIZABLE_PROPS.prevDirection);
            let currentDirection;

            if (currentX > prevX) {
              currentDirection = "right";
            } else if (currentX < prevX) {
              currentDirection = "left";
            } else {
              currentDirection = prevDirection;
            }

            if (currentDirection !== prevDirection) {
              startX = prevX;
              selected?.set(RESIZABLE_PROPS.startX, startX);
              selected?.set(RESIZABLE_PROPS.prevDeltaX, undefined);
            }

            const side = handlerAttr === "cr" ? "right" : "left";
            const deltaX = Math.abs(currentX - startX);
            const prevDeltaX = Number(
              selected?.get(RESIZABLE_PROPS.prevDeltaX) || deltaX
            );
            const parent = selected?.parent();
            const parentEl = parent?.getEl();
            const oneColWidth = (parentEl?.offsetWidth || 1) / 12;
            const prevDiv = Math.trunc(prevDeltaX / oneColWidth);
            const div = Math.trunc(deltaX / oneColWidth);
            const mustBeChanged = div !== prevDiv;

            const grow =
              (currentDirection === "right" && side === "right") ||
              (currentDirection === "left" && side === "left");
            const shrink =
              (currentDirection === "right" && side === "left") ||
              (currentDirection === "left" && side === "right");

            if ((shrink || grow) && mustBeChanged) {
              const columnForChange = (selected as any).getNextColumnForChange(
                side,
                grow
              );

              const spanSum = parent
                ?.components()
                .models.reduce((sum: number, col: Component) => {
                  sum += (col as any).getSpan();
                  return sum;
                }, 0);
              editor.UndoManager.start();
              if ((spanSum && spanSum < 12 && grow) || columnForChange) {
                const selectedNewSpan = (selected as any).getNextSpan(grow);
                (selected as any).setSizeClass(selectedNewSpan);
              }

              if (columnForChange && spanSum === 12) {
                const columnForChangeNewSpan =
                  columnForChange.getNextSpan(!grow);
                columnForChange.setSizeClass(columnForChangeNewSpan);
              }
            }
            editor.UndoManager.stop();
            selected?.set(RESIZABLE_PROPS.prevX, currentX);
            selected?.set(RESIZABLE_PROPS.prevDirection, currentDirection);
            selected?.set(RESIZABLE_PROPS.prevDeltaX, deltaX);
          },
          ...RESIZER_NONE,
          cr: true,
          cl: true,
        },
        draggable:
          '[data-gjs-type="' + TYPES.row + '"], [data-gjs-type="wrapper"]', // IT CAN BE DRAGGED INTO these components
        droppable: true,
      },
      setSizeClass(size: number) {
        const classes = (this as any).getClasses();
        const classNameIndex = classes.findIndex((className: string) =>
          className.startsWith("col-md-")
        );

        if (size > 0 && size <= 12) {
          const sizeClass = `col-md-${size}`;
          if (classNameIndex > -1) {
            classes[classNameIndex] = sizeClass;
          } else {
            classes.push(sizeClass);
          }
          (this as any).setClass(classes);
        }
      },
      getSpan(): number {
        const currentSize = "md";
        const testRegexp = new RegExp("^col-" + currentSize + "-\\d{1,2}$");
        const [columnClassName] = (this as any)
          .getClasses()
          .filter((className: string) => testRegexp.test(className));

        if (columnClassName) {
          const [, , span] = columnClassName.split("-");

          return Number(span);
        }

        return 12;
      },
      getNextSpan(isGrowing: any) {
        const oldSpan = this.getSpan();
        const newSpan = isGrowing ? oldSpan + 1 : oldSpan > 1 ? oldSpan - 1 : 1;

        if (newSpan > 0 && newSpan <= 12) {
          return newSpan;
        }

        return oldSpan;
      },
      getNextColumnForChange(
        side: string,
        isGrowing: boolean
      ): any | undefined {
        const columnIndex = (this as any).index();
        const nextIndex = side === "right" ? columnIndex + 1 : columnIndex - 1;
        const columnsLength = (this as any).parent().components().models.length;
        if (nextIndex < 0 || nextIndex >= columnsLength) {
          return;
        }

        const nextColumn = (this as any).parent().getChildAt(nextIndex);
        if (!nextColumn) {
          return;
        }

        const columnSpan = this.getSpan();
        const nextColumnSpan = nextColumn.getSpan();

        if (
          (!isGrowing && columnSpan > 1) ||
          (isGrowing && nextColumnSpan > 1)
        ) {
          return nextColumn;
        } else if (isGrowing) {
          return nextColumn.getNextColumnForChange(side, isGrowing);
        } else {
          return undefined;
        }
      },
    },

    isComponent(el: any) {
      return el.dataset && el.dataset.gjsType === TYPES.column;
    },
  });

  function addNewComponentHandler(
    component: { setSizeClass: (arg0: number) => void },
    components: { models: any },
    index: number
  ) {
    const { models } = components;
    const oldComponents = [
      ...models.slice(index + 1),
      ...models.slice(0, index).reverse(),
    ];
    let sizeLeft = true;
    let oldComponentIndex = 0;

    while (sizeLeft && oldComponentIndex < oldComponents.length) {
      const oldComponent = oldComponents[oldComponentIndex];
      const span = oldComponent.getSpan();

      if (span !== 1) {
        const newSpan = Math.ceil(span / 2);
        oldComponent.setSizeClass(span - newSpan);
        component.setSizeClass(newSpan);
        sizeLeft = false;
      }

      oldComponentIndex++;
    }
  }

  function removeComponentHandler(
    component: { getSpan: () => any; parent: () => any },
    components: { models?: any; length?: any },
    index: number
  ) {
    const { length: componentsLength } = components;
    if (componentsLength >= MAX_COLUMNS) {
      return;
    }
    const closestIndex = index === componentsLength ? index - 1 : index;
    if (index >= 0 && componentsLength > 0) {
      const closestComponent = components.models[closestIndex];
      const closestComponentSpan = closestComponent.getSpan();
      const deletedComponentSpan = component.getSpan();
      closestComponent.setSizeClass(
        deletedComponentSpan + closestComponentSpan
      );
    } else {
      const parent = component.parent();
      parent.append({
        type: TYPES.column,
      });
    }
  }
};
