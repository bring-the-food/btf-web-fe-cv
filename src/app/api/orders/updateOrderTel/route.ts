import { fetchData } from "@/lib/fetcher";
import { NextRequest } from "next/server";

export async function PUT(request: NextRequest) {
  const body = await request?.json();
  const { searchParams } = new URL(request.url);

  const orderId = searchParams.get("orderId");
  const payload = body;

  const response = await fetchData(
    `${process.env.BASE_URL}/order/${orderId}/delivery`,
    "PUT",
    payload
  );

  return Response.json(response?.data, {
    status: response?.status,
  });
}
