import { fetchData } from "@/lib/fetcher";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const orderId = searchParams.get("orderId");

  const response = await fetchData(
    `${process.env.BASE_URL}/order/${orderId}`,
    "GET"
  );

  return Response.json(response?.data, {
    status: response?.status,
  });
}
