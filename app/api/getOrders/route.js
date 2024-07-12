import fetchApigee from "@/utils/apigeeService";
import { fetchCommerce } from "@/utils/commerce";

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  const customerId = searchParams.get("customerId");
  const res = await fetchCommerce(
    `/orders?where=(customerId%20%3D%20%22${customerId}%22)&sort=createdAt DESC`,
    {
      cache: "no-store",
    }
  );

  return Response.json(res);
}
