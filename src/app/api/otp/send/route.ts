import { fetchData } from "@/lib/fetcher";

import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { telephone, reason } = body;

  const response = await fetchData(`${process.env.BASE_URL}/otp`, "POST", {
    telephone,
    reason,
  });

  return Response.json(response?.data, {
    status: response?.status,
  });
}
