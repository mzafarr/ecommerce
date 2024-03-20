"use client";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { forwardRef } from "react";
import { buttonVariants } from "../ui/button";

export function DropDownMenu({ links, userId, handleSignOut }: any) {
  return (
    <NavigationMenu className="bg-transparent text-white">
      <NavigationMenuList className="bg-transparent text-white">
        <NavigationMenuItem className="bg-transparent text-white">
          <NavigationMenuTrigger className="bg-transparent text-white border border-opacity-10">
            Products
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="bg-slate-800 text-white grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              {links.map((link: any) => (
                <ListItem
                  className="bg-slate-800 border-b border-opacity-10 rounded-none m-0 text-white"
                  href={link.href}
                  title={link.label}
                />
              ))}
            {userId ? (
              <ListItem onClick={handleSignOut} className={buttonVariants()}>
                Sign Out
              </ListItem>
            ) : (
              <ListItem
              href={"/signin"}
              title={"Sign In"}
              className={
                "mx-auto w-full bg-yellow-500 text-slate-600 p-2.5 px-4 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              }
              />
              )}
              </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
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
