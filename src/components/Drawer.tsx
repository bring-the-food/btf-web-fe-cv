"use client";

import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { cn } from "@/lib/utils";
import * as React from "react";

type DrawerCProps = {
  open: boolean;
  setOpen?: (open: boolean) => void;
  hasNoClose?: boolean;
  trigger?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
};

export function DrawerC({
  open,
  setOpen,
  trigger,
  children,
  className,
}: DrawerCProps) {
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent>
        <DrawerTitle className="hidden"></DrawerTitle>

        <div className={cn(className, "mx-auto w-full max-w-lg")}>
          {children}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
