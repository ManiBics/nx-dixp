const getCart = async (id) => {
  try {
    const res = await fetch(`/api/getCart?id=${id}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching the cart:", error);
  }
};

const createCart = async () => {
  try {
    const response = await fetch("/api/createCart", {
      method: "POST",
      body: JSON.stringify({
        currency: "EUR",
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating the cart:", error);
  }
};

const addItemToCart = async (cartId, product, version) => {
  const response = await fetch(`/api/updateCart?id=${cartId}`, {
    method: "POST",
    body: JSON.stringify({
      version,
      actions: [
        {
          action: "addLineItem",
          sku: product.productTitle,
          quantity: 1,
          externalPrice: {
            type: "centPrecision",
            centAmount: Math.round(product.pricevalue * 100) || 0,
            currencyCode: "EUR",
          },
        },
      ],
    }),
  });
  const data = await response.json();
  return data;
};

const removeItemFromCart = async (cartId, lineItemId, version) => {
  const response = await fetch(`/api/updateCart?id=${cartId}`, {
    method: "POST",
    body: JSON.stringify({
      version,
      actions: [
        {
          action: "removeLineItem",
          lineItemId,
        },
      ],
    }),
  });
  const data = await response.json();
  return data;
};

const updateItemQuantityToCart = async (
  cartId,
  lineItemId,
  quantity,
  pricevalue,
  version
) => {
  const response = await fetch(`/api/updateCart?id=${cartId}`, {
    method: "POST",
    body: JSON.stringify({
      version,
      actions: [
        {
          action: "changeLineItemQuantity",
          lineItemId,
          quantity,
          externalPrice: {
            type: "centPrecision",
            centAmount: Math.round(pricevalue * quantity * 100) || 0,
            currencyCode: "EUR",
          },
        },
      ],
    }),
  });
  const data = await response.json();
  return data;
};

const removeCart = async (cartId, version) => {
  const response = await fetch(
    `/api/deleteCart?id=${cartId}&version=${version}`,
    {
      method: "DELETE",
    }
  );
  const data = await response.json();
  return data;
};

export {
  createCart,
  getCart,
  addItemToCart,
  removeItemFromCart,
  updateItemQuantityToCart,
  removeCart,
};
