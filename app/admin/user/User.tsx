import React, { useState, ChangeEvent, useEffect } from "react";
import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/components/ui/avatar";
import { User, getAuth, signOut, updateProfile } from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { auth, storage } from "@/app/lib/config";
import { useRouter } from "next/navigation";

export default function UserProfile() {
  const router = useRouter();
  const fileName = "images/" + uuidv4() + ".jpg";
  const storageRef = ref(storage, fileName);

  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState<string>("");
  const [url, setUrl] = useState<string | null>(null);

  const [user, setUser] = useState<User | null>(null);
  const [userUpdated, setUserUpdated] = useState(false);
  useEffect(() => {
    const auth = getAuth();
    setUser(auth.currentUser);
  }, [userUpdated]);

  useEffect(() => {
    if (user && user.displayName !== null) {
      setName(user.displayName);
    }
  }, [user]);

  useEffect(() => {
    if (file) {
      uploadBytes(storageRef, file).then((snapshot) => {
        getDownloadURL(ref(storage, fileName)).then((url) => {
          setUrl(url);
        });
      });
    }
  }, [file]);

  return (
    <Card className="w-[400px] mx-auto">
      <CardHeader className="flex gap-3 flex-row items-center">
        <Avatar>
          <AvatarImage src={user?.photoURL || undefined} />
          <AvatarFallback>
            {user?.displayName?.substring(0, 2).toLocaleUpperCase() || "US"}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-1">
          <CardTitle>{user?.displayName}</CardTitle>
          <CardDescription>{user?.email}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-3">
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder={user?.displayName || "Enter your name"}
                value={name}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setName(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="picture">Picture</Label>
            <Input
              id="picture"
              type="file"
              accept="image/jpeg, image/jpg"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                if (e.target.files && e.target.files.length > 0) {
                  setFile(e.target.files[0]);
                }
              }}
            />
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => {
            signOut(auth)
              .then(() => {
                router.push("/");
              })
              .catch(() => {});
          }}
        >
          Logout
        </Button>
        <Button
          onClick={() => {
            if (user) {
              updateProfile(user, {
                displayName: name,
                photoURL: url || user.photoURL,
              })
                .then(() => {
                  setUserUpdated(!userUpdated);
                })
                .catch((error) => {
                  // An error occurred
                  // ...
                });
            }
          }}
        >
          Update
        </Button>
      </CardFooter>
    </Card>
  );
}
