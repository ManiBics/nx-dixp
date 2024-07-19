import { fetchCommerce } from 'apps/frontend/src/utils/commerce';

export async function POST(request) {
  const body = await request.json();
  const res = await fetchCommerce('/orders', {
    method: 'POST',
    body: JSON.stringify(body),
  });

  return Response.json(res);
}
