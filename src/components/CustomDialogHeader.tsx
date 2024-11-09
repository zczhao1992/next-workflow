"use client";

import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

import { cn } from "@/lib/utils";

interface CustomDialogHeaderProps {
  title?: string;
  titleClassName?: string;
}

export default function CustomDialogHeader(props: CustomDialogHeaderProps) {
  return (
    <DialogHeader className="px-6">
      <DialogTitle asChild>
        <div className="flex items-start gap-2">
          {props.title && (
            <p className={cn("text-xl", props.titleClassName)}>{props.title}</p>
          )}
        </div>
      </DialogTitle>
      <Separator />
    </DialogHeader>
  );
}
