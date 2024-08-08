import { fetchCommerce } from 'apps/next-app/src/utils/commerce';

export async function DELETE(request) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get('id');
  const version = searchParams.get('version');
  const res = await fetchCommerce(`/carts/${id}?version=${version}`, {
    method: 'DELETE',
  });

  return Response.json(res);
}
