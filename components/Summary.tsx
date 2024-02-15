"use client";

import axios from "axios";
import { useContext, useState } from "react";
import Currency from "./Currency";
import { Button } from "@/ui/button";
import { cartContext } from "@/context/cart-context";
import { useSession } from "next-auth/react";

const Summary = () => {
  const [isCheckingout, setIscheckingout] = useState(false);
  const cartCtx = useContext(cartContext);
  const session = useSession();

  const totalPrice = cartCtx.data.reduce((total, item) => {
    return (total += Number(item.product.price) * item.amount);
  }, 0);

  const items = cartCtx.data;

  const onCheckout = async () => {
    setIscheckingout(true);
    const response = await axios.post("http://localhost:3000/api/checkout", {
      items,
      clientEmail: session.data?.user?.email,
    });
    setIscheckingout(false);
    window.location = response.data.url;
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
        <p>{isCheckingout && "Checking out..."}</p>
        <Button
          disabled={cartCtx.data.length === 0 || isCheckingout}
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
