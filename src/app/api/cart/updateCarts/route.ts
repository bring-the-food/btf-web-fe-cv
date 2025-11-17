import { fetchData } from "@/lib/fetcher";
import { NextRequest } from "next/server";

export async function PUT(request: NextRequest) {
  const body = await request?.json();
  const { searchParams } = new URL(request.url);

  const storeId = searchParams.get("storeId");
  const payload = body;

  const response = await fetchData(
    `${process.env.NEXT_PUBLIC_BASE_URL}/store/${storeId}/cart`,
    "PUT",
    payload
  );

  return Response.json(response?.data, {
    status: response?.status,
  });
}
