import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const imageUrl = searchParams.get("url");

  if (!imageUrl) {
    return Response.json({ error: "Missing url param" }, { status: 400 });
  }

  const response = await fetch(imageUrl, {
    headers: { "x-platform-client-type": "web" },
  });

  if (!response.ok) {
    const text = await response.text();
    return Response.json({ error: text }, { status: response.status });
  }

  const blob = await response.blob();
  const contentType = response.headers.get("content-type") || "image/jpeg";

  return new Response(blob, {
    status: 200,
    headers: {
      "Content-Type": contentType,
      "Content-Disposition": "inline",
    },
  });
}
