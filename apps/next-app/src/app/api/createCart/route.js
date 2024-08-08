import { fetchCommerce } from 'apps/next-app/src/utils/commerce';

export async function POST(request) {
  const body = await request.json();
  const res = await fetchCommerce('/carts', {
    method: 'POST',
    body: JSON.stringify(body),
  });

  return Response.json(res);
}
