import React from "react";
import { PageFilterRequest } from "./common";

export type CategoryRequest = {
  name: string;
};

export type Category = {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
};

export type CategoryByGroupFilterRequest = {
  owner?: boolean;
};

export type CategoryFilterRequest = PageFilterRequest & {
  query?: string;
  ids?: number[];
};
