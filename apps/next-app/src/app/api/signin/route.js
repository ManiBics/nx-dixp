import fetchNode from 'apps/next-app/src/utils/nodeService';

export async function POST(request) {
  const body = await request.json();
  const res = await fetchNode(`/auth/signin`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  });
  return Response.json(res);
}
