import { fetchCommerce } from 'apps/next-app/src/utils/commerce';

export async function GET(request, { params }) {
  const slug = params.slug;
  const res = await fetchCommerce(`/customers/${slug}`);

  return Response.json(res);
}
