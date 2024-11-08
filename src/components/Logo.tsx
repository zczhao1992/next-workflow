import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { SquareDashedMousePointer } from "lucide-react";

interface LogoPropsType {
  fontSize?: string;
  iconSize?: number;
}

const Logo = ({ fontSize = "text-2xl", iconSize = 20 }: LogoPropsType) => {
  return (
    <Link
      href="/"
      className={cn(
        "text-2xl font-extrabold flex items-center gap-3",
        fontSize
      )}
    >
      <div className="rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-500 p-2">
        <SquareDashedMousePointer size={iconSize} className="stroke-white" />
      </div>
      <div>
        {/* <span
          className="bg-gradient-to-r from-indigo-500
         to-indigo-600 bg-clip-text text-transparent"
        >
          Work
        </span> */}
        <span className="text-stone-700 dark:text-stone-300">
          Next-WorkFlow
        </span>
      </div>
    </Link>
  );
};

export default Logo;
