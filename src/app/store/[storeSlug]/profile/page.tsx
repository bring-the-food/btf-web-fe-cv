"use client";

import Back from "@/components/Back";
import Icon from "@/components/Icon";
import { DialogC } from "@/components/Dialog";
import { Button } from "@/components/ui/button";
import { swrfetcher } from "@/lib/swrfetcher";
import { currencyFormatter, koboToNaira } from "@/lib/formatCurrency";
import { Loader2Icon } from "lucide-react";
import Image from "next/image";
import React, { use } from "react";
import useSWR from "swr";

const Profile = ({ params }: { params: Promise<{ storeSlug: string }> }) => {
  const { storeSlug } = use(params);

  const [openModal, setOpenModal] = React.useState(false);
  const [copied, setCopied] = React.useState(false);
  const copyTimerRef = React.useRef<number | null>(null);

  const { data, isLoading } = useSWR(
    `/api/profile?storeSlug=${storeSlug}`,
    swrfetcher
  );

  const vendor = data?.data;
  const vendorAvailability = vendor?.store?.availability?.weekly;

  React.useEffect(() => {
    return () => {
      if (copyTimerRef.current) {
        clearTimeout(copyTimerRef.current);
      }
    };
  }, []);

  const handleCopy = async () => {
    const slug = vendor?.store?.slug;
    const base = "bringthisfood.com/store";
    const textToCopy = slug ? `${base}/${slug}` : base;

    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      if (copyTimerRef.current) {
        clearTimeout(copyTimerRef.current);
      }
      copyTimerRef.current = window.setTimeout(() => {
        setCopied(false);
        copyTimerRef.current = null;
      }, 5000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = textToCopy;
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand("copy");
        setCopied(true);
        if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
        copyTimerRef.current = window.setTimeout(() => {
          setCopied(false);
          copyTimerRef.current = null;
        }, 5000);
      } finally {
        document.body.removeChild(textarea);
      }
    }
  };

  return (
    <div className="col-start-center clamp-[px,5,12,@sm,@lg] clamp-[py,10,20,@sm,@lg] w-full">
      <Image
        className="clamp-[mb,3.5,8,@sm,@lg] clamp-[w,3.8125rem,8rem,@sm,@lg]"
        src="/svg/logo.svg"
        alt="Bring this food logo"
        width={61}
        height={48}
        priority
      />

      <div className="w-full">
        <div className="clamp-[my,1.3125rem,1.5625rem,@sm,@lg] center w-full">
          <Back />

          <h4 className="text-[#1D2939] font-semibold clamp-[text,sm,lg,@sm,@lg] leading-normal text-center mr-auto clamp-[ml,0,-8,@sm,@lg]">
            Vendor Profile
          </h4>
        </div>

        {isLoading ? (
          <div className="mx-auto">
            <Loader2Icon className="animate-spin clamp-[size,8,14,@sm,@lg] clamp-[mt,20,32,@sm,@lg] mx-auto" />
          </div>
        ) : (
          <div className="space-y-5 md:space-y-8 clamp-[mt,6,8,@sm,@lg]">
            <div className="clamp-[pt,3.5,5,@sm,@lg] between">
              <div className="start">
                <Image
                  className="clamp-[size,10,16,@sm,@lg] rounded-full object-cover"
                  src={
                    vendor?.store?.picture?.url ??
                    "/images/logo_placeholder.png"
                  }
                  alt={vendor?.store?.name ?? "placeholder logo"}
                  width={40}
                  height={40}
                  priority
                />

                <div className="clamp-[ml,2,4,@sm,@lg]">
                  <h6 className="font-semibold clamp-[text,sm,lg,@sm,@lg] leading-normal">
                    {vendor?.store?.name}
                  </h6>
                </div>
              </div>

              <Button
                onClick={() => setOpenModal(true)}
                className="text-[#A46900] rounded-full clamp-[text,xs,sm,@sm,@lg] font-semibold bg-[#FFF9E9] hover:bg-[#fcf2d8] !clamp-[py,1.5,2,@sm,@lg] !clamp-[px,2,4,@sm,@lg] cursor-pointer space-x-[2px] h-auto"
              >
                <span>Refer Vendor</span>
                <Icon
                  icon="share"
                  size={12}
                  className="clamp-[size,3,4,@sm,@lg]"
                />
              </Button>
            </div>

            <div className="clamp-[mt,2,3,@sm,@lg] space-y-2">
              <div className="start space-x-2">
                <Icon
                  icon="marker2"
                  size={20}
                  className="clamp-[size,4,5,@sm,@lg]"
                />

                <p className="text-[#344054] clamp-[text,sm,base,@sm,@lg] leading-normal">
                  {vendor?.store?.locations &&
                  vendor.store.locations.length > 0 ? (
                    vendor.store.locations.map(
                      (
                        location: {
                          city: string;
                          street: string;
                          description: string;
                        },
                        index: number
                      ) => (
                        <span key={index}>
                          {location.description && (
                            <>{location.description}, </>
                          )}
                          {location.street && <>{location.street}, </>}
                          {location.city}
                          {index < vendor.store.locations.length - 1 && <br />}
                        </span>
                      )
                    )
                  ) : (
                    <span>No location information available</span>
                  )}
                </p>
              </div>

              <div className="clamp-[py,2,3,@sm,@lg] start space-x-5 clamp-[mt,4,6,@sm,@lg]">
                <p className="col-start clamp-[text,xs,sm,@sm,@lg] font-medium">
                  <span className="text-[#98A2B3] ">Average Meal Price</span>
                  <span className="text-[#1D2939] mt-1">
                    {koboToNaira(vendor?.store?.items?.averagePrice?.amount)}
                  </span>
                </p>
                <div className="bg-[#F2F4F7] clamp-[h,5,6,@sm,@lg] w-px" />
                <p className="col-start clamp-[text,xs,sm,@sm,@lg] font-medium">
                  <span className="text-[#98A2B3] ">Delivery Fee</span>
                  <span className="text-[#1D2939] mt-1">
                    {vendor?.store?.delivery?.price ? (
                      <>
                        {currencyFormatter(vendor?.store?.delivery?.price?.min)}{" "}
                        -{" "}
                        {currencyFormatter(vendor?.store?.delivery?.price?.max)}{" "}
                      </>
                    ) : (
                      "--"
                    )}
                  </span>
                </p>
                <div className="bg-[#F2F4F7] clamp-[h,5,6,@sm,@lg] w-px" />
                <p className="col-start clamp-[text,xs,sm,@sm,@lg] font-medium">
                  <span className="text-[#98A2B3] ">Expect In</span>
                  <span className="text-[#1D2939] mt-1">
                    {vendor?.store?.delivery?.time ? (
                      <>
                        {vendor?.store?.delivery?.time?.min} -{" "}
                        {vendor?.store?.delivery?.time?.max} min{" "}
                      </>
                    ) : (
                      "--"
                    )}
                  </span>
                </p>
              </div>
            </div>

            <div className="text-[#1D2939]">
              <h4 className="font-semibold clamp-[text,base,lg,@sm,@lg]">
                Opening hours
              </h4>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-4 clamp-[gap,4,6,@sm,@lg]">
                <Pallet
                  title="Monday"
                  value={
                    vendorAvailability?.mon
                      ? `${vendorAvailability?.mon?.start} - ${vendorAvailability?.mon?.end}`
                      : "--"
                  }
                />
                <Pallet
                  title="Tuesday"
                  value={
                    vendorAvailability?.tue
                      ? `${vendorAvailability?.tue?.start} - ${vendorAvailability?.tue?.end}`
                      : "--"
                  }
                />
                <Pallet
                  title="Wednesday"
                  value={
                    vendorAvailability?.wed
                      ? `${vendorAvailability?.wed?.start} - ${vendorAvailability?.wed?.end}`
                      : "--"
                  }
                />
                <Pallet
                  title="Thursday"
                  value={
                    vendorAvailability?.thur
                      ? `${vendorAvailability?.thur?.start} - ${vendorAvailability?.thur?.end}`
                      : "--"
                  }
                />
                <Pallet
                  title="Friday"
                  value={
                    vendorAvailability?.fri
                      ? `${vendorAvailability?.fri?.start} - ${vendorAvailability?.fri?.end}`
                      : "--"
                  }
                />
                <Pallet
                  title="Saturday"
                  value={
                    vendorAvailability?.sat
                      ? `${vendorAvailability?.sat?.start} - ${vendorAvailability?.sat?.end}`
                      : "--"
                  }
                />
                <Pallet
                  title="Sunday"
                  value={
                    vendorAvailability?.sun
                      ? `${vendorAvailability?.sun?.start} - ${vendorAvailability?.sun?.end}`
                      : "--"
                  }
                />
              </div>
            </div>
          </div>
        )}
      </div>

      <DialogC open={openModal} setOpen={setOpenModal}>
        <>
          <div className="grid gap-3 text-[#1D2939] px-4">
            <h3 className="font-semibold leading-normal text-[20px] text-center">
              {vendor?.store?.name}
            </h3>

            <div className="grid grid-cols-2 border border-[#E6E8EC] divide-x divide-[#E6E8EC] rounded-xl py-0.5 px-1">
              <p className="text-[#98A2B3] italic truncate text-sm px-2 py-[11px]">
                bringthisfood.com/store
              </p>
              <p className="text-[#475467] text-sm px-2 py-[11px] font-medium">
                {vendor?.store?.slug}
              </p>
            </div>

            <Button
              onClick={handleCopy}
              className="bg-[#FFC247] hover:bg-[#ffc247e5] cursor-pointer rounded-xl text-[#59201A] text-sm font-semibold leading-5 py-[18px] mt-5"
            >
              {copied ? "Url copied to clipboard" : "Copy Url"}
            </Button>
          </div>
        </>
      </DialogC>
    </div>
  );
};

export default Profile;

type PalletProps = {
  title: string;
  value: string;
};

const Pallet = ({ title, value }: PalletProps) => {
  return (
    <div className="col-start">
      <h6
        className={`clamp-[text,sm,base,@sm,@lg] leading-medium text-[#1D2939] font-semibold`}
      >
        {title}
      </h6>

      <p
        className={`mt-1 text-[#475467] clamp-[text,sm,base,@sm,@lg] leading-normal`}
      >
        {value}
      </p>
    </div>
  );
};
