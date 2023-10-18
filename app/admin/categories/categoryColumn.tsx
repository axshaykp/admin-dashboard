"use client";

import { ColumnDef } from "@tanstack/react-table";

export type CategoryType = {
  id: string;
  name: string;
};

export const categoryColumns: ColumnDef<CategoryType>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
];
