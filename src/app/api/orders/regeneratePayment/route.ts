import { fetchData } from "@/lib/fetcher";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { orderId, amount } = body;

  if (!orderId) {
    return Response.json({ message: "orderId is required" }, { status: 400 });
  }

  // Call the payment initiation endpoint for an order. We pass the order id
  // as part of the "object" so the backend can associate the beneficiary
  // with the order. The remote API expects the fund amount.
  const response = await fetchData(
    `${process.env.NEXT_PUBLIC_BASE_URL}/finance/payments/one-time/initiate`,
    "POST",
    {
      object: {
        type: "order",
        id: orderId,
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
