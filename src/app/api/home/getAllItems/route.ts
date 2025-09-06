import { fetchData } from "@/lib/fetcher";
import { buildUrlWithParams, filteredParams } from "@/lib/urlParamBuilder";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const storeId = searchParams.get("storeId");
  const keyword = searchParams.get("keyword");
  const pageSize = searchParams.get("pageSize");
  const lastEvaluatedKey = searchParams.get("lastEvaluatedKey");

  const params = {
    keyword,
    pageSize,
    lastEvaluatedKey,
  };

  const response = await fetchData(
    buildUrlWithParams(
      `${process.env.BASE_URL}/store/${storeId}/menu/items`,
      filteredParams(params)
    ),
    "GET"
  );

  return Response.json(response?.data, {
    status: response?.status,
  });
}
