"use client";

import React from "react";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import { MobileSidebar } from "./Sidebar";

const routesMap = new Map([
  ["", "首页"],
  ["workflows", "工作流"],
  ["credentials", "凭证"],
]);

const BreadcrumbHeader = () => {
  const pathName = usePathname();
  const paths =
    pathName === "/" ? [""] : pathName?.split("/").map((i) => routesMap.get(i));

  return (
    <div className="flex items-center flex-start">
      <MobileSidebar />
      <Breadcrumb>
        <BreadcrumbList>
          {paths.map((path, index) => {
            return (
              <React.Fragment key={index}>
                <BreadcrumbItem>
                  <BreadcrumbLink className="capitalize" href={`/${path}`}>
                    {path === "" ? "首页" : path}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {index !== paths.length - 1 && <BreadcrumbSeparator />}
              </React.Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default BreadcrumbHeader;
