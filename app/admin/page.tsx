"use client";
import React, { useState } from "react";
import { useAuthContext } from "../(auth)/AuthContext";
import { useRouter } from "next/navigation";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { ProductsTable } from "./products/ProductsTable";
import { productColumns } from "./products/productsColumn";
import getData from "./getData";
import {
  DocumentData,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../lib/config";
import { CategoryTable } from "./categories/CategoryTable";
import { categoryColumns } from "./categories/categoryColumn";
import User from "./user/User";
import { AddCategory } from "./categories/AddCategory";
import { AddProduct } from "./products/AddProduct";
import { User as UserType, getAuth } from "firebase/auth";

function Page() {
  const { user } = useAuthContext();
  const router = useRouter();

  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [categoryUpdated, setCategoryUpdated] = useState(false);
  const [productUpdated, setProductUpdated] = useState(false);
  const [activeUser, setActiveUser] = useState<UserType | null>(null);

  React.useEffect(() => {
    if (user == null) router.push("/");
  }, [user]);

  React.useEffect(() => {
    const auth = getAuth();
    setActiveUser(auth.currentUser);
  }, []);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(
          collection(db, "products"),
          where("email", "==", activeUser?.email || "")
        );
        const querySnapshot = await getDocs(q);

        const documents = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
          amount: doc.data().amount,
          category: doc.data().category,
        }));
        setProducts(documents);
        console.log(documents);
      } catch (error) {
        console.error("Error getting documents: ", error);
      }
    };

    fetchData();
  }, [productUpdated, activeUser]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "category"));
        const documents = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
        }));
        setCategories(documents);
        console.log(documents);
      } catch (error) {
        console.error("Error getting documents: ", error);
      }
    };

    fetchData();
  }, [categoryUpdated]);

  return (
    <div className="p-3">
      <Tabs defaultValue="products" className="w-full">
        <TabsList className="grid grid-cols-3 max-w-[400px] mx-auto">
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="account">Profile</TabsTrigger>
        </TabsList>
        <TabsContent value="products">
          <div className="flex gap-3 p-3 max-w-[400px] mx-auto">
            <AddProduct
              setProductUpdated={setProductUpdated}
              productUpdated={productUpdated}
              categories={categories}
            />
          </div>
          <ProductsTable
            columns={productColumns}
            data={products}
            setProductUpdated={setProductUpdated}
            productUpdated={productUpdated}
            categories={categories}
          />
        </TabsContent>
        <TabsContent value="categories">
          <div className="flex gap-3 p-3 max-w-[400px] mx-auto">
            <AddCategory
              setCategoryUpdated={setCategoryUpdated}
              categoryUpdated={categoryUpdated}
            />
          </div>
          <CategoryTable
            columns={categoryColumns}
            data={categories}
            setCategoryUpdated={setCategoryUpdated}
            categoryUpdated={categoryUpdated}
          />
        </TabsContent>
        <TabsContent value="account">
          <User />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Page;
