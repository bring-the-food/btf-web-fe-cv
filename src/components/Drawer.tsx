"use client";

import {
    Drawer,
    DrawerContent,
    DrawerTitle,
    DrawerTrigger
} from "@/components/ui/drawer";
import * as React from "react";

type DrawerCProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  hasNoClose?: boolean;
  trigger?: React.ReactNode;
  children?: React.ReactNode;
};

export function DrawerC({ open, setOpen, trigger, children }: DrawerCProps) {
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent>
        <DrawerTitle className="hidden"></DrawerTitle>

        <div className="mx-auto w-full max-w-lg">
          {children}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
