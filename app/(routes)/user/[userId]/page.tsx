"use client";
import React from "react";
import OrderList from "./components/OrderList";
import getOrders from "@/actions/get-order";

const UserAccountPage = async () => {
  const orders = await getOrders();

  return <OrderList orders={orders} />;
};

export default UserAccountPage;
