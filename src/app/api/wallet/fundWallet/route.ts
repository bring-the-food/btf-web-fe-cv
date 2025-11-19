import { fetchData } from "@/lib/fetcher";

import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { amount } = body;

  const response = await fetchData(
    `${process.env.NEXT_PUBLIC_BASE_URL}/finance/payments/one-time/initiate`,
    "POST",
    {
      object: {
        type: "wallet",
      },
      fund: {
        currency: "ngn",
        amount,
      },
    }
  );

  return Response.json(response?.data, {
    status: response?.status,
  });
}
