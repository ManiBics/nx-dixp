import fetchApigee from "@/utils/apigeeService";
import { fetchCommerce } from "@/utils/commerce";

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id");
  const res = await fetchCommerce(`/orders/${id}`, {
    cache: "no-store",
  });

  return Response.json(res);
}
