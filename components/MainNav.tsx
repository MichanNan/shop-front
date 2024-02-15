"use client";
import { cartContext } from "@/context/cart-context";
import { cn } from "@/lib/utils";
import { Category } from "@/types";
import { Button } from "@/ui/button";
import { CircleUserIcon, ShoppingBag } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

interface MainNavProps {
  categories: Category[] | null;
  showNav: boolean;
  userId: string | undefined | null;
}

const MainNav: React.FC<MainNavProps> = ({ categories, showNav, userId }) => {
  const pathname = usePathname();

  const routes = categories?.map((category) => ({
    href: `/categories/${category.id}`,
    label: category.name,
    active: pathname === `/category/${category.id}`,
  }));

  const router = useRouter();

  const session = useSession();

  const cartCtx = useContext(cartContext);

  const isLoggedIn = session?.data?.user ? true : false;

  const totalAmount = cartCtx.data.reduce((total, item) => {
    return (total = total + item.amount);
  }, 0);

  return (
    <div
      className={`flex text-md p-8 md:p-0 pl-10 fixed -left top-0 bg-bgGray  ${
        showNav
          ? "left-0 bg-white space-y-6 md:space-y-2 mt-16 md:mt-0 text-start flex-col md:flex-row"
          : "-left-full flex-col md:flex-row"
      } md: w-full md:static md:grid grid-cols-6 md:space-x-6 transition-all`}
    >
      <div className="flex gap-4 flex-col md:col-span-4 md:flex-row md:items-center ">
        {routes?.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "transition-colors hover:text-black",
              route.active ? "text-black" : "text-neutral-500"
            )}
          >
            {route.label}
          </Link>
        ))}{" "}
      </div>

      <div className=" z-30 flex flex-col gap-2 justify-center items-start text-sm md:text-md  md:items-center md:gap-4 md:flex-row transition-all">
        {session.data?.user && <div>Hello {session.data?.user?.name}</div>}
        {session.data?.user ? (
          <div onClick={() => signOut()} className=" hover:cursor-pointer">
            Sign Out
          </div>
        ) : (
          <div
            onClick={() => router.push("/sign-in")}
            className=" hover:cursor-pointer"
          >
            Sign In
          </div>
        )}
      </div>

      <div className=" flex flex-col gap-2 md:flex-row items-start md:items-center gap-x-4 transition-all">
        {isLoggedIn && (
          <Button
            onClick={() => router.push(`/user/${userId}`)}
            className="flex item-center rounded-full bg-black px-4 py-2"
          >
            <CircleUserIcon size={20} color="white" />
          </Button>
        )}
        <Button
          onClick={() => router.push("/cart")}
          className="flex item-center rounded-full bg-black px-4 py-2"
        >
          <ShoppingBag size={20} color="white" />
          <span className="ml-2 text-sm font-medium text-white">
            {totalAmount}
          </span>
        </Button>
      </div>
    </div>
  );
};

export default MainNav;
