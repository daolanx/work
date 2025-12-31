import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";

import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { Menu } from "lucide-react";

export default function ToolBar() {
  return (
    <>
      <LargeToolbar />
      <MiniToolbar />
    </>
  );
}

const links = [
  {
    href: "/products",

    label: "products",
  },
  {
    href: "/features",

    label: "features",
  },
  {
    href: "/price",

    label: "price",
  },
];

function LargeToolbar() {
  return (
    <div className="hidden md:flex  space-x-4 text-sm items-center">
      <SignedOut>
        <SignInButton>
          <Button className=" cursor-pointer" variant={"ghost"}>
            Sign In
          </Button>
        </SignInButton>
        <SignUpButton>
          <Button className=" cursor-pointer">Sign Up</Button>
        </SignUpButton>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  );
}

function MiniToolbar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div className="flex md:hidden items-center justify-end">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button size="icon" variant="ghost">
            <Menu className="w-5 h-5" />
          </Button>
        </SheetTrigger>
        <SheetContent className="w-screen p-4">
          <SheetHeader className="hidden">
            <SheetTitle className="">Landing Page</SheetTitle>
          </SheetHeader>

          

          <ul className="mt-8 mb-2">
            {links.map((link) => (
              <li className="w-full" key={link.href}>
                <Link
                  className="block p-2 rounded-sm hover:bg-gray-100"
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="grid w-full grid-cols-1 gap-y-2 ">
            <SignedOut>
              <SignInButton>
                <Button variant={"outline"}>Sign In</Button>
              </SignInButton>
              <SignUpButton>
                <Button>Sign Up</Button>
              </SignUpButton>
            </SignedOut>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
