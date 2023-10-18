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
import { doc, setDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import Combobox from "../actions/ComboBox";
import { User, getAuth } from "firebase/auth";

interface AddProductProps {
  setProductUpdated: React.Dispatch<React.SetStateAction<boolean>>;
  productUpdated: boolean;
  categories: any[];
}

export function AddProduct({
  setProductUpdated,
  productUpdated,
  categories,
}: AddProductProps) {
  const [product, setProduct] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [category, setCategory] = useState<string>("");
  const [user, setUser] = useState<User | null>(null);

  async function updateDoc() {
    await setDoc(doc(db, "products", uuidv4()), {
      name: product,
      amount,
      category,
      email: user?.email,
    }).then(() => {
      setProductUpdated(!productUpdated);
    });
  }

  useEffect(() => {
    const auth = getAuth();
    setUser(auth.currentUser);
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add product</DialogTitle>
          <DialogDescription>Add a new product to the list</DialogDescription>
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
            <Button type="submit" onClick={updateDoc}>
              Add product
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
