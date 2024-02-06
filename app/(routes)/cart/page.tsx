"use client";
import CartItem from "@/components/CartItem";
import Summary from "@/components/Summary";
import { cartContext } from "@/context/cart-context";
import React, { useContext } from "react";

const CartPage = () => {
  const CartCtx = useContext(cartContext);

  return (
    <div className="bg-white mx-auto mt-4">
      <div className="px-4 md:py-16 sm:px-6 lg:px-8">
        <h1 className="text-xl md:text-3xl font-bold text-black">
          Shopping Cart
        </h1>
        <div className="mt-12">
          <div className="lg:col-span-7">
            {CartCtx.data.length === 0 && (
              <p className="text-neutral-500">No items added to cart</p>
            )}
            <ul>
              {CartCtx.data.map((item) => (
                <CartItem key={item.product.id} item={item} />
              ))}
            </ul>
          </div>
          <Summary />
        </div>
      </div>
    </div>
  );
};

export default CartPage;
