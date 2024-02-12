"use client";

import axios from "axios";
import { useContext } from "react";
import Currency from "./Currency";
import { Button } from "@/ui/button";
import toast from "react-hot-toast";
import { cartContext } from "@/context/cart-context";
import { useSession } from "next-auth/react";

const Summary = () => {
  const cartCtx = useContext(cartContext);
  const session = useSession();

  const totalPrice = cartCtx.data.reduce((total, item) => {
    return (total += Number(item.product.price) * item.amount);
  }, 0);

  const items = cartCtx.data;

  const onCheckout = async () => {
    await fetch("http://localhost:3000/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items,
        clientEmail: session.data?.user?.email,
      }),
    })
      .then((res) => res.json())
      .then(({ url }) => (window.location = url));
  };

  return (
    <div className="flex justify-center md:justify-end ">
      <div
        className="w-full md:w-[50%] mt-12 rounded-lg bg-gray-50 px-5 py6
   sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
      >
        <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between border-t border-gray-200 pt-4">
            <div className="text-base font-medium text-gray-900">
              Order total
            </div>
            <Currency value={totalPrice} />
          </div>
        </div>
        <Button
          disabled={cartCtx.data.length === 0}
          variant="outline"
          onClick={onCheckout}
          className="w-full mt-6 bg-black text-white hover:bg-gray-800"
        >
          Checkout
        </Button>
      </div>
    </div>
  );
};

export default Summary;
