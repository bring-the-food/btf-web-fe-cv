import { fetchData } from "@/lib/fetcher";

export async function GET() {
  // const { searchParams } = new URL(request.url);

  // const storeSlug = searchParams.get("storeSlug");

  const response = await fetchData(`${process.env.BASE_URL}/stores`, "GET");

  return Response.json(response?.data, {
    status: response?.status,
  });
}
