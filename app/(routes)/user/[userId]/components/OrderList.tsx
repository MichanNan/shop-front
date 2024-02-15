"use client";
import React, { useState } from "react";
import OrderItem from "./OrderItem";
import { ArrowLeft } from "lucide-react";
import { Order } from "@/types";
import { useRouter } from "next/navigation";
import { Button } from "@/ui/button";

interface OrderListProps {
  orders: Order[];
}

const OrderList: React.FC<OrderListProps> = ({ orders }) => {
  const [pageStartIndex, setPageStartIndex] = useState(0);
  const [pageEndIndex, setPageEndIndex] = useState(10);

  const router = useRouter();
  const testOrder = orders.slice(pageStartIndex, pageEndIndex);

  const handleGoPreviousPage = () => {
    if (pageStartIndex > 10 && pageEndIndex <= orders.length) {
      setPageStartIndex((prev) => prev - 10);
      setPageEndIndex((prev) => prev - 10);
    } else if (pageStartIndex < 10) {
      setPageStartIndex(0);
      setPageEndIndex(10);
    }
  };

  const handleGoNextPage = () => {
    if (orders.length - pageEndIndex < 10) {
      setPageEndIndex(orders.length - 1);
      setPageStartIndex(orders.length - 11);
    } else {
      setPageEndIndex((prev) => prev + 10);
      setPageStartIndex((prev) => prev + 10);
    }
  };

  return (
    <div className="flex flex-col gap-6 w-[90%] md:w-[80%] mx-auto mt-10">
      <div onClick={() => router.push("/")} className="flex items-center gap-6">
        <ArrowLeft className="hover:cursor-pointer" />
        <h1 className="text-xl text-slate-600">Your Orders</h1>
      </div>

      <div className="flex flex-col gap-4">
        {testOrder.map((order) => (
          <OrderItem key={order.id} order={order} />
        ))}
      </div>
      <div className="flex justify-end gap-4">
        {pageStartIndex > 0 ? (
          <Button
            onClick={handleGoPreviousPage}
            variant="outline"
            className="hover:bg-gray-100"
          >
            Previous
          </Button>
        ) : (
          <div className="w-[72px]"></div>
        )}
        {pageEndIndex < orders.length - 1 ? (
          <Button
            onClick={handleGoNextPage}
            variant="outline"
            className="hover:bg-gray-100"
          >
            Next
          </Button>
        ) : (
          <div className="w-[72px]"></div>
        )}
      </div>
    </div>
  );
};

export default OrderList;
