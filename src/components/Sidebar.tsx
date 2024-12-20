"use client";

import React, { useState } from "react";
import {
  Github,
  HomeIcon,
  Layers2Icon,
  MenuIcon,
  ShieldCheckIcon,
} from "lucide-react";
import Logo from "./Logo";
import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import { usePathname } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

const routes = [
  {
    href: "",
    label: "首页",
    icon: HomeIcon,
  },
  {
    href: "workflows",
    label: "工作流",
    icon: Layers2Icon,
  },
  {
    href: "credentials",
    label: "凭证",
    icon: ShieldCheckIcon,
  },
  {
    href: "https://github.com/zczhao1992/next-workflow",
    label: "Github",
    icon: Github,
  },
];

function DesktopSidebar() {
  const pathname = usePathname();

  const activeRoute =
    routes.find(
      (route) => route.href.length > 0 && pathname.includes(route.href)
    ) || routes[0];

  return (
    <div
      className="hidden relative md:block min-w-[280px] max-w-[280px] 
    h-screen overflow-hidden w-full bg-primary/5 dark:bg-secondary/30 
    dark:text-foreground text-muted-foreground border-r-2 border-separate"
    >
      <div className="flex items-center justify-center gap-2 border-b-[1px] border-separate p-4">
        <Logo />
      </div>

      <div className="flex flex-col p-3">
        {routes.map((route) => {
          return (
            <Link
              key={route.href}
              href={route.label === "Github" ? route.href : `/${route.href}`}
              className={buttonVariants({
                variant:
                  activeRoute.href === route.href
                    ? "sidebarActiveItem"
                    : "sidebarItem",
              })}
            >
              <route.icon size={20} />
              {route.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export function MobileSidebar() {
  const [isOpen, setOpen] = useState(false);

  const pathname = usePathname();
  const activeRoute =
    routes.find(
      (route) => route.href.length > 0 && pathname.includes(route.href)
    ) || routes[0];

  return (
    <div className="block border-separate bg-background md:hidden">
      <nav className="container flex items-center justify-between px-8">
        <Sheet open={isOpen} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant={"ghost"} size={"icon"}>
              <MenuIcon />
            </Button>
          </SheetTrigger>

          <SheetContent
            className="w-[400px] sm:w-[540px] space-y-4"
            side={"left"}
          >
            <Logo />
            <div className="flex flex-col gap-1">
              {routes.map((route) => {
                return (
                  <Link
                    key={route.href}
                    href={`/${route.href}`}
                    className={buttonVariants({
                      variant:
                        activeRoute.href === route.href
                          ? "sidebarActiveItem"
                          : "sidebarItem",
                    })}
                    onClick={() => setOpen((prev) => !prev)}
                  >
                    <route.icon size={20} />
                    {route.label}
                  </Link>
                );
              })}
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  );
}

export default DesktopSidebar;
