import { fetchCommerce } from 'apps/next-app/src/utils/commerce';

export async function POST(request) {
  const body = await request.json();
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get('id');
  const res = await fetchCommerce(`/carts/${id}`, {
    method: 'POST',
    body: JSON.stringify(body),
  });

  return Response.json(res);
}
