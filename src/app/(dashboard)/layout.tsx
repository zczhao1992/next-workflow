import React from "react";
import { Separator } from "@/components/ui/separator";
import DesktopSidebar from "@/components/Sidebar";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex h-screen">
      <DesktopSidebar />
      <div className="flex flex-col flex-1 min-h-screen">
        <header className="flex items-center justify-between px-6 py-4 h-[50px] container">
          workFlow
        </header>

        <Separator />

        <div className="overflow-auto">
          <div className="flex-1 container py-4 text-accent-foreground">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default layout;
