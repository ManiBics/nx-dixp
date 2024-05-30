import { Button, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import { getLocale } from "@/utils";
import { useParams, useRouter } from "next/navigation";
import { getPageFromSlug } from "@/utils/content";
import CartItem from "./CartItem";

const Cart = ({ items, ...rest }) => {
  const total = items?.reduce(
    (sum, item) => sum + item.price.value.centAmount,
    0
  );
  const totalItems = items?.reduce((sum, item) => sum + item.quantity, 0);

  const { isInCart, updateItemQuantity, removeItem, cancelOrder } = useCart();

  const router = useRouter();
  return (
    <div className="container mx-auto p-4 flex flex-col">
      <div className="flex-grow">
        <h1 className="text-2xl font-bold mb-4 mt-2">{rest.title}</h1>
        {items?.length > 0 ? (
          <div className="grid grid-cols-2 gap-6">
            {items.map((item) => (
              <CartItem
                updateItemQuantity={updateItemQuantity}
                removeItem={removeItem}
                isInCart={isInCart}
                key={item.id}
                item={item}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">{rest.emptycartMessage}</p>
        )}
      </div>
      {items?.length > 0 && (
        <div className="mt-4 p-4 bg-white  ">
          <div className="flex  justify-end">
            <div>
              <h2 className="text-xl font-semibold">
                {rest.cartSummary.title}
              </h2>
              <p className="mt-2">
                {rest.cartSummary.totalProducts} {totalItems}
              </p>
              <p className="mt-2">
                {rest.cartSummary.productTotal} ${(total / 100).toFixed(2)}
              </p>
            </div>
          </div>
          <Stack
            direction="row"
            className="mt-4"
            justifyContent="flex-end"
            spacing={2}
          >
            <Button
              onClick={cancelOrder}
              variant={rest.cancelOrder.theme}
              color="error"
            >
              {rest.cancelOrder.label}
            </Button>
            <Button
              onClick={() => {
                if (rest.continueShopping.url)
                  router.push(rest.continueShopping.url);
              }}
              variant={rest.continueShopping.theme}
              color="primary"
            >
              {rest.continueShopping.label}
            </Button>
            <Button variant={rest.placeOrder.theme} color="success">
              {rest.placeOrder.label}
            </Button>
          </Stack>
        </div>
      )}
    </div>
  );
};

const ViewCart = (props) => {
  const { cart } = useCart();
  const params = useParams();
  const [productListing, setProductListing] = useState([]);
  const [cartContentful, setCartContentful] = useState([]);

  useEffect(() => {
    (async () => {
      const { locale = "en-US" } = getLocale(params?.slug);
      const slug = "/product-listing";
      const page = await getPageFromSlug(slug, locale, "productListing");
      setProductListing(page.products);
    })();
  }, [params?.slug]);

  useEffect(() => {
    if (productListing?.length && cart?.lineItems?.length) {
      const newCart = cart.lineItems.map((item) => {
        const findProduct = productListing.find(
          (product) => product.productTitle === item?.variant?.sku
        );

        return {
          ...item,
          pricevalue: findProduct?.pricevalue,
          productTitle1: findProduct?.productTitle1,
          productDescription: findProduct?.productDescription,
          productImage: findProduct?.productImage,
        };
      });
      setCartContentful(newCart);
    } else if (!cart) {
      setCartContentful([]);
    }
  }, [productListing, cart]);

  return (
    <div className="flex flex-col" style={{ minHeight: "calc(100vh - 400px)" }}>
      <main className="flex-grow flex">
        <Cart items={cartContentful} {...props} />
      </main>
    </div>
  );
};

export default ViewCart;
