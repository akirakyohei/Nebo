import { Editor } from "grapesjs";

export const move = {
  attributes: { class: "fa-light fa-grip-dots-vertical move", title: "Move" },
  command: "tlb-move",
};

export const logic = {
  attributes: { class: "fa-light fa-code-fork", title: "Edit Logic" },
  command: "edit-logic",
};

export const parent = {
  attributes: { class: "fa-light fa-arrow-turn-up", title: "Select Parent" },
  command: (ed: Editor) => ed.runCommand("core:component-exit", { force: 1 }),
};

export const clone = {
  attributes: { class: "fa-light fa-clone", title: "Clone" },
  command: "tlb-clone",
};

export const remove = {
  attributes: { class: "fa-light fa-trash-o", title: "Delete" },
  command: "tlb-delete",
};

export const convert = {
  attributes: { class: "fa-light fa-circle-up", title: "Upgrade component" },
  command: "convert-legacy",
};

export const all = [move, parent, logic, clone, remove];

const toolbarItems = { all, move, logic, parent, clone, remove, convert };

export default toolbarItems;
