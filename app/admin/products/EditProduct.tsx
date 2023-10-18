import React, { useEffect, useState } from "react";
import { Button } from "@/app/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { db } from "@/app/lib/config";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import Combobox from "../actions/ComboBox";
import { AiFillEdit } from "react-icons/ai";

interface EditProductProps {
  setProductUpdated: React.Dispatch<React.SetStateAction<boolean>>;
  productUpdated: boolean;
  categories: any[];
  data: any;
}

export function EditProduct({
  setProductUpdated,
  productUpdated,
  categories,
  data,
}: EditProductProps) {
  const [product, setProduct] = useState<string>(data.name);
  const [amount, setAmount] = useState<number>(data.amount);
  const [category, setCategory] = useState<string>(data.category);

  async function updateData() {
    await updateDoc(doc(db, "products", data.id), {
      name: product,
      amount,
      category,
    }).then(() => {
      setProductUpdated(!productUpdated);
    });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <AiFillEdit />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
          <DialogDescription>Edit this product</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              placeholder="Type something."
              className="col-span-3"
              type="text"
              value={product}
              onChange={(e) => {
                if (e.target.value && e.target.value.length !== 0) {
                  setProduct(e.target.value);
                }
              }}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Amount
            </Label>
            <Input
              type="tel"
              id="amount"
              placeholder="Type something."
              className="col-span-3"
              value={data.amount}
              onChange={(e) => {
                if (e.target.value && e.target.value.length !== 0) {
                  setAmount(parseInt(e.target.value));
                }
              }}
            />
          </div>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label className="text-right">Category</Label>
          <Combobox
            data={categories.map((item, index) => ({
              key: index,
              label: item.name,
              name: item.name,
            }))}
            setValue={setCategory}
            value={category}
          />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="submit" onClick={updateData}>
              Edit product
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
