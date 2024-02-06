"use client";
import { cartContext } from "@/context/cart-context";
import { cn } from "@/lib/utils";
import { Category } from "@/types";
import { Button } from "@/ui/button";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useContext } from "react";

interface MainNavProps {
  categories: Category[] | null;
  showNav: boolean;
}

const MainNav: React.FC<MainNavProps> = ({ categories, showNav }) => {
  const pathname = usePathname();
  const router = useRouter();

  const routes = categories?.map((category) => ({
    href: `/categories/${category.id}`,
    label: category.name,
    active: pathname === `/category/${category.id}`,
  }));

  const cartCtx = useContext(cartContext);
  return (
    <div
      className={`flex text-xl items-center pl-4 w-[80%] justify-between ${
        showNav
          ? "left-0 bg-white flex-col space-y-6 mt-12  text-start"
          : "-left-full"
      } md:static md:flex-row md:space-x-6 transition-all`}
    >
      <div className="flex gap-4">
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
        ))}
      </div>
      <div className="ml-auto flex items-center gap-x-4">
        <Button
          onClick={() => router.push("/cart")}
          className="flex item-center rounded-full bg-black px-4 py-2"
        >
          <ShoppingBag size={20} color="white" />
          <span className="ml-2 text-sm font-medium text-white">
            {cartCtx.data.length}
          </span>
        </Button>
      </div>{" "}
    </div>
  );
};

export default MainNav;
