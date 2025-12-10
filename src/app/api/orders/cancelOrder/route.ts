import { fetchData } from "@/lib/fetcher";
import { NextRequest } from "next/server";

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const orderId = searchParams.get("orderId");

  const response = await fetchData(
    `${process.env.NEXT_PUBLIC_BASE_URL}/order/${orderId}/cancel`,
    "DELETE"
  );

  return Response.json(response?.data, {
    status: response?.status,
  });
}
