"use client";

import { ColumnDef } from "@tanstack/react-table";

export type ProductsType = {
  id: string;
  name: string;
  amount: number;
  category: string;
};

export const productColumns: ColumnDef<ProductsType>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
];
