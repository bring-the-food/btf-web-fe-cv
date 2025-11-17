import { fetchData } from "@/lib/fetcher";
export async function GET() {
  const response = await fetchData(
    `${process.env.NEXT_PUBLIC_BASE_URL}/stores/featured`,
    "GET"
  );

  return Response.json(response?.data, {
    status: response?.status,
  });
}
