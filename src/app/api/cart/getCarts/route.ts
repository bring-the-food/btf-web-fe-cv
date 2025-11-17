import { fetchData } from "@/lib/fetcher";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const storeId = searchParams.get("storeId");

  const response = await fetchData(
    `${process.env.NEXT_PUBLIC_BASE_URL}/store/${storeId}/cart`,
    "GET"
  );

  return Response.json(response?.data, {
    status: response?.status,
  });
}
