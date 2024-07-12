"use client";
import CartProvider from "@/context/CartContext";
import BackdropProvider from "@/context/BackDropContext";
import DynamicComp from "@/components/common/DynamicComp";
import UserProvider from "@/context/UserContext";
import CMSProductProvider from "@/context/CMSProductContext";

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
