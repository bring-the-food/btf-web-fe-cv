import { fetchData } from "@/lib/fetcher";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request?.json();
  const { searchParams } = new URL(request.url);

  const userId = searchParams.get("userId");
  const payload = body;

  const response = await fetchData(
    `${process.env.BASE_URL}/user/${userId}/review`,
    "POST",
    payload
  );

  return Response.json(response?.data, {
    status: response?.status,
  });
}
