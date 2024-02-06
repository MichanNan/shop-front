"use client";

import axios from "axios";
import { useContext, useEffect } from "react";
import Currency from "./Currency";
import { Button } from "@/ui/button";
import toast from "react-hot-toast";
import { cartContext } from "@/context/cart-context";

const Summary = () => {
  const cartCtx = useContext(cartContext);
  //   const items = useCart((state) => state.items);
  //   const removeAll = useCart((state) => state.removeAll);
  //   const searchParams = useSearchParams();

  //   useEffect(() => {
  //     if (searchParams.get("success")) {
  //       toast.success("Payment completed.");
  //     }

  //     if (searchParams.get("canceld")) {
  //       toast.error("Something went wrong!");
  //     }
  //   }, [searchParams, removeAll]);

  // const totalPrice = items.reduce((total, item) => {
  //   return total + Number(item.price);
  // }, 0);

  // const onCheckout = async () => {
  //   const response = await axios.post(
  //     `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
  //     {
  //       productIds: items.map((item) => item.id),
  //     }
  //   );
  //   window.location = response.data.url;
  // };

  // const onCheckout = async () => {
  //   const response = await axios.post(
  //     `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
  //     {
  //       productIds: items.map((item) => item.id),
  //     }
  //   );

  //   window.location = response.data.url;
  // };

  return (
    <div className="flex justify-end">
      <div
        className="w-[50%] mt-16 rounded-lg bg-gray-50 px-5 py6
   sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
      >
        <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between border-t border-gray-200 pt-4">
            <div className="text-base font-medium text-gray-900">
              Order total
            </div>
            <Currency value={0} />
          </div>
        </div>
        <Button
          disabled={cartCtx.data.length === 0}
          variant="outline"
          onClick={() => {}}
          className="w-full mt-6 bg-gray-100 hover:bg-gray-300"
        >
          Checkout
        </Button>
      </div>
    </div>
  );
};

export default Summary;
