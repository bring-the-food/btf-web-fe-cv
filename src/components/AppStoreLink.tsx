"use client";

import { usePlatform } from "@/hooks/usePlatform";
import { APP_LINKS, type AppVariant, getStoreLink } from "@/lib/appLinks";
import React from "react";

type AppStoreLinkProps = {
  appVariant?: AppVariant;
  children: React.ReactNode;
  className?: string;
  target?: string;
  rel?: string;
};

const AppStoreLink = ({
  appVariant = "consumer",
  children,
  className,
  target = "_blank",
  rel = "noopener noreferrer",
}: AppStoreLinkProps) => {
  const platform = usePlatform();
  const href =
    platform === "desktop"
      ? APP_LINKS.STORES.ANDROID.CONSUMER
      : getStoreLink(platform, appVariant);

  return (
    <a href={href} className={className} target={target} rel={rel}>
      {children}
    </a>
  );
};

export default AppStoreLink;
