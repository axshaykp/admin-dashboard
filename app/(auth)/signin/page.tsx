"use client";
import React from "react";
import signIn from "../signIn";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Label } from "@/app/components/ui/label";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { useToast } from "@/app/components/ui/use-toast";

function SignIn() {
  const router = useRouter();
  const toast = useToast();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleForm = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { result, error } = await signIn(email, password);

    if (error) {
      toast.toast({ description: error.toString() });
      return console.log(error);
    }

    console.log(result);
    return router.push("/admin");
  };
  return (
    <>
      <Card className="w-[350px] mx-auto mt-6">
        <CardHeader>
          <CardTitle>Sign in</CardTitle>
          <CardDescription>Sign in with your email</CardDescription>
        </CardHeader>
        <form onSubmit={handleForm}>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Email</Label>
                <Input
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  type="email"
                  name="email"
                  id="email"
                  placeholder="example@mail.com"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Password</Label>
                <Input
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  type="password"
                  name="password"
                  id="password"
                  placeholder="password"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="submit">Sign in</Button>
          </CardFooter>
        </form>
      </Card>
    </>
  );
}

export default SignIn;
