import { fetchData } from "@/lib/fetcher";
export async function GET() {
  console.log('----process-env-server', {all: process.env, foc: process.env.BASE_URL, soc: process.env.NEXT_PUBLIC_SOCKET_URL});
  const response = await fetchData(
    `${process.env.NEXT_PUBLIC_BASE_URL}/stores/featured`,
    "GET"
  );

  return Response.json(response?.data, {
    status: response?.status,
  });
}
