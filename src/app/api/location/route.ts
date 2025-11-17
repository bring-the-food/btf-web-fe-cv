import { fetchData } from "@/lib/fetcher";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const areaType = searchParams.get("areaType");

  const response = await fetchData(
    `${process.env.NEXT_PUBLIC_BASE_URL}/resources/locations/city/ile-ife/streets/${areaType}`,
    "GET"
  );

  return Response.json(response?.data, {
    status: response?.status,
  });
}
