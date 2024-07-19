import { useCart } from 'apps/frontend/src/context/CartContext';
import React, { useEffect, useState } from 'react';
import { combineCMSData } from './helper';
import { useCMSProducts } from 'apps/frontend/src/context/CMSProductContext';

const useCMSCart = () => {
  const [cartContentful, setCartContentful] = useState([]);
  const { cart } = useCart();
  const { CMSproducts } = useCMSProducts();

  useEffect(() => {
    const data = combineCMSData(CMSproducts, cart);
    setCartContentful(data);
  }, [CMSproducts, cart]);

  return { cartContentful };
};

export default useCMSCart;
