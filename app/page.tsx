import Link from "next/link";
import { Separator } from "./components/ui/separator";

export default function Home() {
  return (
    <>
      <div className="p-6 max-w-[400px] mx-auto">
        <div className="space-y-1">
          <h4 className="text-sm font-medium leading-none">Admin Dashboard</h4>
          <p className="text-sm text-muted-foreground">
            Simple admin dashboard
          </p>
        </div>
        <Separator className="my-4" />
        <div className="flex h-5 items-center space-x-4 text-sm">
          <Link href={"/admin"}>Dashboard</Link>
          <Separator orientation="vertical" />
          <Link href={"/signin"}>Sign in</Link>
          <Separator orientation="vertical" />
          <Link href={"/signup"}>Sign up</Link>
        </div>
      </div>
    </>
  );
}
