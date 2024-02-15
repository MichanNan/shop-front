"use client";
import React, { useState } from "react";
import OrderItem from "./OrderItem";
import { ArrowLeft } from "lucide-react";
import { Order } from "@/types";
import { useRouter } from "next/navigation";
import { Button } from "@/ui/button";
import Pagination from "@/components/Pagination";

interface OrderListProps {
  orders: Order[];
}

const OrderList: React.FC<OrderListProps> = ({ orders }) => {
  const [pageStartIndex, setPageStartIndex] = useState(0);
  const [pageEndIndex, setPageEndIndex] = useState(10);

  const router = useRouter();
  const PaginatedOrder = orders.slice(pageStartIndex, pageEndIndex);

  return (
    <div className="flex flex-col gap-6 w-[90%] md:w-[80%] mx-auto mt-10">
      <div onClick={() => router.push("/")} className="flex items-center gap-6">
        <ArrowLeft className="hover:cursor-pointer" />
        <h1 className="text-xl text-slate-600">Your Orders</h1>
      </div>

      <div className="flex flex-col gap-4">
        {PaginatedOrder.map((order) => (
          <OrderItem key={order.id} order={order} />
        ))}
      </div>
      <Pagination
        data={orders}
        pageStartIndex={pageStartIndex}
        pageEndIndex={pageEndIndex}
        setPageStartIndex={setPageStartIndex}
        setPageEndIndex={setPageEndIndex}
      />
    </div>
  );
};

export default OrderList;
