'use client';
import DynamicComp from '../../components/common/DynamicComp';
import BackdropProvider from '../../context/BackDropContext';
import CartProvider from '../../context/CartContext';
import CMSProductProvider from '../../context/CMSProductContext';
import UserProvider from '../../context/UserContext';

export default function ComposablePage() {
  return (
    <BackdropProvider>
      <UserProvider>
        <CartProvider>
          <CMSProductProvider>
            <DynamicComp />
          </CMSProductProvider>
        </CartProvider>
      </UserProvider>
    </BackdropProvider>
  );
}
