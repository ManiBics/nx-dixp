import fetchApigee from "@/utils/apigeeService";

export async function GET() {
  const res = await fetchApigee(`/web-commercetools/orders`, {
    cache: "no-store",
  });

  return Response.json(res);
}
