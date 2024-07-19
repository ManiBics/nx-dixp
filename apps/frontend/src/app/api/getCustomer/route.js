import { fetchCommerce } from 'apps/frontend/src/utils/commerce';

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  const email = searchParams.get('email');
  const res = await fetchCommerce(
    `/customers?where=(email%20%3D%20%22${email}%22)`
  );

  return Response.json(res);
}
