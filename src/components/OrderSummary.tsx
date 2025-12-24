/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Pallet from "@/components/Pallet";

const OrderSummary = ({
  summary,
  category,
}: {
  summary: any;
  category: string;
}) => {
  return (
    <>
      <Pallet
        title={`Sub-total (${summary?.items?.count} item${
          summary?.items?.count <= 1 ? "" : "s"
        })`}
        value={summary?.items?.price?.amount}
      />
      {category !== "groceries" && (
        <Pallet
          title={`Packs (${summary?.packs?.count} item${
            summary?.packs?.count <= 1 ? "" : "s"
          })`}
          value={summary?.packs?.price?.amount}
        />
      )}
      <Pallet title="Delivery Fee" value={summary?.delivery?.price?.amount} />
      <Pallet title="Service Charge" value={summary?.service?.price?.amount} />
      <Pallet title="Total bill" value={summary?.bill?.amount} isTotal />
    </>
  );
};

export default OrderSummary;
