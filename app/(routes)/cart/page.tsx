"use client";
import CartItem from "@/components/CartItem";
import Summary from "@/components/Summary";
import { cartContext } from "@/context/cart-context";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useContext } from "react";

const CartPage = () => {
  const cartCtx = useContext(cartContext);
  const session = useSession();

  return (
    <div className="bg-white mx-auto mt-4">
      {session.data?.user ? (
        <div className="px-4 md:py-16 sm:px-6 lg:px-8">
          {" "}
          <h1 className="text-xl md:text-3xl font-bold text-black">
            Shopping Cart
          </h1>
          <div className="mt-12">
            <div className="lg:col-span-7">
              {cartCtx.data.length === 0 && (
                <p className="text-neutral-500">No items added to cart</p>
              )}
              <ul>
                {cartCtx.data.map((item) => (
                  <CartItem key={item.product.id} item={item} />
                ))}
              </ul>
            </div>
            {cartCtx.data.length > 0 && <Summary />}
          </div>
        </div>
      ) : (
        <div className="flex justify-center mt-10">
          <Link href="/sign-in">
            <h1 className="text-3xl">
              Please <span className="underline text-blue-600">sign in</span>{" "}
              first!
            </h1>
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartPage;
