import { TYPES } from "../../componentTypes/constants";

const { dynamic_column, dynamic_columns, row_2, column_2 } = TYPES;

export const Dynamic = {
  name: "dm-dynamic-column",
  label: "Column",
  iconClass: "fa-kit fa-column",
  "dm-column": true,
  content: {
    type: dynamic_column,
  },
};

export const Column = {
  name: "fa-kit fa-columns-1",
  label: "100",
  iconClass: "fa-kit fa-column",
  content: { type: column_2, columns: 24 },
};

export const Column21 = {
  name: "dm-columns-2-1",
  label: "66 | 33",
  iconClass: "fa-kit fa-columns-2-1",
  content: {
    type: dynamic_columns,
    switch: [
      {
        parents: ["wrapper"],
        type: row_2,
        components: [
          {
            type: "gs-columns",
            components: [
              { type: column_2, columns: 16 },
              { type: column_2, columns: 8 },
            ],
          },
        ],
      },
      {
        parents: ["gs-columns"],
        type: "components",
        components: [
          {
            type: column_2,
            columns: 16,
            attributes: { "data-columns-reset": "column" },
          },
          {
            type: column_2,
            columns: 8,
            attributes: { "data-columns-reset": "column" },
          },
        ],
      },
    ],
  },
};

export const Column11 = {
  name: "dm-columns-1-1",
  label: "50 | 50",
  iconClass: "fa-kit fa-columns-1-1",
  content: {
    type: dynamic_columns,
  },
};

export const Column111 = {
  name: "dm-columns-1-1-1",
  label: "33 | 33 | 33",
  iconClass: "fa-kit fa-columns-1-1-1",
  content: {
    type: dynamic_columns,
    switch: [
      {
        parents: ["wrapper"],
        type: row_2,
        components: [
          {
            type: "gs-columns",
            components: [
              { type: column_2, columns: 8 },
              { type: column_2, columns: 8 },
              { type: column_2, columns: 8 },
            ],
          },
        ],
      },
      {
        parents: ["gs-columns"],
        type: "components",
        components: [
          {
            type: column_2,
            columns: 8,
            attributes: { "data-columns-reset": "column" },
          },
          {
            type: column_2,
            columns: 8,
            attributes: { "data-columns-reset": "column" },
          },
          {
            type: column_2,
            columns: 8,
            attributes: { "data-columns-reset": "column" },
          },
        ],
      },
    ],
  },
};

export const Column1111 = {
  name: "dm-columns-1-1-1-1",
  label: "25 | 25 | 25 | 25",
  iconClass: "fa-kit fa-columns-1-1-1-1",
  content: {
    type: dynamic_columns,
    switch: [
      {
        parents: ["wrapper"],
        type: row_2,
        components: [
          {
            type: "gs-columns",
            components: [
              { type: column_2, columns: 6 },
              { type: column_2, columns: 6 },
              { type: column_2, columns: 6 },
              { type: column_2, columns: 6 },
            ],
          },
        ],
      },
      {
        parents: ["gs-columns"],
        type: "components",
        components: [
          {
            type: column_2,
            columns: 6,
            attributes: { "data-columns-reset": "column" },
          },
          {
            type: column_2,
            columns: 6,
            attributes: { "data-columns-reset": "column" },
          },
          {
            type: column_2,
            columns: 6,
            attributes: { "data-columns-reset": "column" },
          },
          {
            type: column_2,
            columns: 6,
            attributes: { "data-columns-reset": "column" },
          },
        ],
      },
    ],
  },
};

const columnBlocks = [Dynamic, Column11, Column21, Column111, Column1111];

export default columnBlocks;
