"use client";
import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import { navs } from "@/app/config/navs";

export default function NavBar() {
  return (
    <>
      <NavigationMenu className="hidden md:block ml-10">
        <NavigationMenuList>
          {navs.map((nav) => {
            const { label, subNavs = [] } = nav;
            return (
              <NavigationMenuItem key={label}>
                {subNavs.length ? (
                  <NavigationMenuTrigger>{label}</NavigationMenuTrigger>
                ) : (
                  <NavigationMenuLink asChild>
                    <Link
                      href="#"
                      className={cn(
                        navigationMenuTriggerStyle()
                      )}
                      onClick={(e) => e.preventDefault()}
                    >
                      {label}
                    </Link>
                  </NavigationMenuLink>
                )}

                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] list-none">
                    {subNavs.map((subNav) => (
                      <ListItem
                        key={subNav.label}
                        title={subNav.label}
                        href={subNav.label}
                      >
                        {subNav.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            );
          })}
        </NavigationMenuList>
      </NavigationMenu>
    </>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
          onClick={(e) => e.preventDefault()}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
