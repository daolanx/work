import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { navs } from "@/app/config/navs";

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

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="top" className="w-screen  pt-10 ">
          <SheetHeader className="hidden">
            <SheetTitle className="">Landing Page</SheetTitle>
          </SheetHeader>

          <div className="flex flex-col gap-4">
            <Accordion type="single" collapsible className="w-full">
              {navs.map((nav, index) => {
                // 如果没有二级菜单，直接渲染成链接样式
                if (nav.subNavs.length === 0) {
                  return (
                    <a
                      key={index}
                      href="#"
                      className="text-sm  p-4 block  border-b border-gray-200 font-medium w-full transition-colors hover:bg-gray-100"
                    >
                      {nav.label}
                    </a>
                  );
                }

                return (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-sm font-medium  p-4 hover:bg-gray-100 hover:no-underline">
                      {nav.label}
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-col gap-3 pl-2  ml-1 py-2 border-l mr-4">
                        {nav.subNavs.map((sub, subIndex) => (
                          <a
                            key={subIndex}
                            href="#"
                            className="flex flex-col gap-1 p-2  rounded-lg transition-all hover:bg-gray-100"
                          >
                            <span className="text-sm font-semibold  text-zinc-800  ">
                              {sub.label}
                            </span>
                          </a>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </div>

          <div className="grid w-full grid-cols-1 gap-y-4 p-4 ">
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
