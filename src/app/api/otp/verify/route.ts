import { fetchData } from "@/lib/fetcher";

import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { telephone, code } = body;

  const response = await fetchData(
    `${process.env.BASE_URL}/otp/verify`,
    "POST",
    {
      telephone,
      code,
    }
  );

  return Response.json(response?.data, {
    status: response?.status,
  });
}
