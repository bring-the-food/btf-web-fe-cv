/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";
import Icon from "./Icon";
import Link from "next/link";

type DialogProps = {
  trigger?: React.ReactNode;
  isDownload?: boolean;
  desc: string;
  header: string;
  downloadRes?: any;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  showCloseButton?: boolean;
};

const DialogC = ({
  trigger,
  isDownload,
  desc,
  header,
  downloadRes,
  open,
  setOpen,
  showCloseButton,
}: DialogProps) => {
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent
          showCloseButton={showCloseButton}
          className="sm:max-w-[420px] lg:max-w-[756px] bg-[#FFF9E9] md:py-10 md:px-20"
        >
          <DialogTitle className="hidden"></DialogTitle>
          <div className="col-center px-3">
            <h5 className="font-caprasimo text-2xl lg:text-[56px] leading-9 lg:leading-[89.6px] tracking-[0.6px] text-center">
              {header}
            </h5>
            <p className="mt-3 text-base lg:text-xl leading-[19.84px] tracking-[0.32px] text-center">
              {desc}
            </p>

            {isDownload ? (
              <div className="clamp-[gap,4,6] mt-8 grid lg:grid-cols-2 w-fit mx-auto">
                <Button
                  onClick={downloadRes}
                  className="py-[18px]! px-4 text-sm lg:text-base font-medium"
                >
                  <Icon
                    icon="playstore"
                    h={18.999780654907227}
                    w={17.305557250976562}
                  />
                  Download on Google Play
                </Button>
                <Button
                  onClick={downloadRes}
                  className="py-[18px]! px-4 text-sm lg:text-base font-medium"
                >
                  <Icon
                    icon="iphone"
                    h={18.999780654907227}
                    w={17.305557250976562}
                  />
                  Download on App Store
                </Button>
              </div>
            ) : (
              <Link
                href={`https://wa.me/2349113727132?text=Hi%2C%20I%27ll%20like%20to%20inquire%20about%20Bring%20This%20Food`}
              >
                <Button className="py-[18px]! text-sm lg:text-base font-medium mt-8 px-[89px]">
                  Contact Us
                </Button>
              </Link>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DialogC;
