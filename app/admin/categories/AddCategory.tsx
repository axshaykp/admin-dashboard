import React, { useState } from "react";
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

interface AddCategoryProps {
  setCategoryUpdated: React.Dispatch<React.SetStateAction<boolean>>;
  categoryUpdated: boolean;
}

export function AddCategory({
  setCategoryUpdated,
  categoryUpdated,
}: AddCategoryProps) {
  const [category, setCategory] = useState<string>("");

  async function updateDoc() {
    await setDoc(doc(db, "category", uuidv4()), {
      name: category,
    }).then(() => {
      setCategoryUpdated(!categoryUpdated);
    });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add category</DialogTitle>
          <DialogDescription>Add a new category to the list</DialogDescription>
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
              onChange={(e) => {
                if (e.target.value && e.target.value.length !== 0) {
                  setCategory(e.target.value);
                }
              }}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="submit" onClick={updateDoc}>
              Add category
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
