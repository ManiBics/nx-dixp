import { Button, ButtonGroup, IconButton, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import { useCart } from "@/context/CartContext";
import { getLocale } from "@/utils";
import { useParams, useRouter } from "next/navigation";
import { getPageFromSlug } from "@/utils/content";

const CartItem = ({ item, updateItemQuantity }) => {
  const quantity = item?.quantity || 1;
  return (
    <div className="flex justify-between items-center p-4 bg-white shadow-md rounded-md my-2">
      <div className="flex items-center">
        <img
          className="w-16 h-16 object-cover rounded-md"
          src={item.productImage.src}
          alt={item.productImage.src}
          data-sb-object-id={item.productImage.id}
        />
        <div className="ml-4">
          <h2 className="text-lg font-semibold">{item.productTitle1}</h2>
          <p className="text-sm text-gray-600 line-clamp-1">
            {item.productDescription}
          </p>
          <div className="mt-2">
            <ButtonGroup variant="outlined" aria-label="Basic button group">
              <Button
                onClick={() =>
                  updateItemQuantity(item.id, quantity - 1, item?.pricevalue)
                }
              >
                <RemoveIcon fontSize="small" />
              </Button>
              <Button>{quantity}</Button>
              <Button
                onClick={() =>
                  updateItemQuantity(item.id, quantity + 1, item?.pricevalue)
                }
              >
                <AddIcon fontSize="small" />
              </Button>
            </ButtonGroup>
          </div>
        </div>
      </div>
      <div className="text-right h-full flex flex-col">
        <div>
          <IconButton
            onClick={() => updateItemQuantity(item.id, 0, item?.pricevalue)}
            color="error"
            aria-label="delete"
          >
            <ClearIcon />
          </IconButton>
        </div>

        <p className="text-lg font-semibold mt-auto">
          ${(item?.price?.value?.centAmount / 100).toFixed(2)}
        </p>
      </div>
    </div>
  );
};

const Cart = ({ items }) => {
  const total = items?.reduce(
    (sum, item) => sum + item.price.value.centAmount,
    0
  );
  const totalItems = items?.reduce((sum, item) => sum + item.quantity, 0);

  const { isInCart, updateItemQuantity } = useCart();

  const router = useRouter();
  return (
    <div className="container mx-auto p-4 flex flex-col">
      <div className="flex-grow">
        <h1 className="text-2xl font-bold mb-4 mt-2">Your Shopping Cart</h1>
        {items?.length > 0 ? (
          <div className="grid grid-cols-2 gap-6">
            {items.map((item) => (
              <CartItem
                updateItemQuantity={updateItemQuantity}
                isInCart={isInCart}
                key={item.id}
                item={item}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">Your cart is empty.</p>
        )}
      </div>
      {items?.length > 0 && (
        <div className="mt-4 p-4 bg-white  ">
          <div className="flex  justify-end">
            <div>
              <h2 className="text-xl font-semibold">Cart Summary</h2>
              <p className="mt-2">Total Products: {totalItems}</p>
              <p className="mt-2">Total: ${(total / 100).toFixed(2)}</p>
            </div>
          </div>
          <Stack
            direction="row"
            className="mt-4"
            justifyContent="flex-end"
            spacing={2}
          >
            <Button variant="outlined" color="error">
              Cancel Order
            </Button>
            <Button
              onClick={() => router.push("/products")}
              variant="outlined"
              color="primary"
            >
              Continue Shopping
            </Button>
            <Button variant="contained" color="success">
              Place Order
            </Button>
          </Stack>
        </div>
      )}
    </div>
  );
};

const ViewCart = () => {
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
    }
  }, [productListing, cart]);

  return (
    <div className="flex flex-col" style={{ minHeight: "calc(100vh - 400px)" }}>
      <main className="flex-grow flex">
        <Cart items={cartContentful} />
      </main>
    </div>
  );
};

export default ViewCart;
