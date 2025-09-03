import { fetchData } from "@/lib/fetcher";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const storeId = searchParams.get("storeId");
  const categoryId = searchParams.get("categoryId");

  const response = await fetchData(
    `${process.env.BASE_URL}/store/${storeId}/menu/category/${categoryId}/items`,
    "GET"
  );

  return Response.json(response?.data, {
    status: response?.status,
  });
}
