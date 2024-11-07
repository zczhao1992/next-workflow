"use client";

import React from "react";
import {
  CoinsIcon,
  HomeIcon,
  Layers2Icon,
  ShieldCheckIcon,
} from "lucide-react";

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
    label: "认证",
    icon: ShieldCheckIcon,
  },
  {
    href: "billing",
    label: "billing",
    icon: CoinsIcon,
  },
];

const DesktopSidebar = () => {
  return (
    <div className="hidden relative md:block min-w-[280px] max-w-[280px] h-screen overflow-hidden w-full bg-primary/5 dark:bg-secondary/30 dark:text-foreground text-muted-foreground border-r-2 border-separate">
      <div className="flex items-center justify-center"></div>
    </div>
  );
};

export default DesktopSidebar;
