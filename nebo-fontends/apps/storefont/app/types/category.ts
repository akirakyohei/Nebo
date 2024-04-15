import React from "react";

export type GroupCategory = {
  id: number;
  icon: React.ReactNode;
  name: string;
  description: string;
};

export type Category = {
  id: number;
  name: string;
  group_id: number;
  created_on: string;
  updated_on: string;
};

export type CategoryByGroup = {
  group_id: number;
  categories: Category[];
};

export type CategoryByGroupFilterRequest = {
  owner?: boolean;
};
