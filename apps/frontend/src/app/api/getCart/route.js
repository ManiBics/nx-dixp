import { fetchCommerce } from 'apps/frontend/src/utils/commerce';

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get('id');
  const res = await fetchCommerce(`/carts/${id}`, {
    cache: 'no-store',
  });

  return Response.json(res);
}
