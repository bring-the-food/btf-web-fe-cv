import { fetchData } from "@/lib/fetcher";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const storeSlug = searchParams.get("storeSlug");

  const response = await fetchData(
    `${process.env.BASE_URL}/slug/store/${storeSlug}`,
    "GET"
  );

  return Response.json(response?.data, {
    status: response?.status,
  });
}
