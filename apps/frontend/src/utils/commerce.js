import base64 from 'base-64';

async function getCommerceAccessToken() {
  const url = process.env.CT_AUTH + '/oauth/token';
  const username = process.env.CT_CLIENT_ID;
  const password = process.env.CT_SECRET_KEY;
  const response = await fetch(url, {
    method: 'POST',
    headers: new Headers({
      Authorization: `Basic ${base64.encode(`${username}:${password}`)}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    }),
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      scope: process.env.CT_SCOPE,
    }),
    next: { revalidate: 3600 },
  });

  const data = await response.json();

  return data?.access_token ?? null;
}

async function fetchCommerce(url, options) {
  const accessToken = await getCommerceAccessToken();
  const path = process.env.CT_API + `/${process.env.CT_PROJECT_KEY}` + url;

  const payload = {
    headers: new Headers({
      Authorization: `Bearer ${accessToken}`,
    }),
    ...options,
  };

  const response = await fetch(path, payload);
  const data = await response.json();

  return data;
}

export { getCommerceAccessToken, fetchCommerce };
