"use client";
import React from "react";
import OrderItem from "./OrderItem";
import { ArrowLeft } from "lucide-react";
import { Order } from "@/types";
import { useRouter } from "next/navigation";

interface OrderListProps {
  orders: Order[];
}

const OrderList: React.FC<OrderListProps> = ({ orders }) => {
  const router = useRouter();
  const testOrder = orders.slice(0, 1);
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
    </div>
  );
};

export default OrderList;
