import { Order } from "@/types";
import React from "react";
import { format } from "date-fns";
import Image from "next/image";
import Currency from "@/components/Currency";

interface OrderItemProps {
  order: Order;
}
const OrderItem: React.FC<OrderItemProps> = ({ order }) => {
  const totalPrice = order.orderItems.reduce((total, item) => {
    return (total += parseInt(item.product.price) * item.amount);
  }, 0);

  return (
    <div className="flex flex-col bg-gray-100 gap-4 rounded-lg w-full px-10">
      <div className="flex gap-10 mx-4 p-2 items-center text-md md:text-lg font-bold text-gray-700 border-b-[1px]">
        <span>{format(order.createdAt, "MMMM do, yyyy")}</span>
        <span className="flex gap-4">
          Total Price:
          <div>
            {" "}
            <Currency value={totalPrice} />
          </div>
        </span>
      </div>

      <div className="mb-4 ml-4 flex flex-col gap-2">
        {order.orderItems.map((item) => (
          <div
            key={item.id}
            className="flex flex-col md:flex-row gap-10 items-center"
          >
            <Image
              className="rounded-lg"
              src={item.product.images[0].url}
              width={200}
              height={200}
              alt="product image"
            />
            <div className="flex gap-8 flex-col md:flex-row">
              <div className="flex gap-4 items-center">
                <span className="text-lg opacity-80">Name: </span>
                <span className="font-bold">{item.product.name}</span>
              </div>
              <div className="flex gap-4 items-center">
                <span className="text-lg opacity-80">Amount: </span>
                <span className="font-bold">{item.amount}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderItem;
