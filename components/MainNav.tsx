"use client";
import { cartContext } from "@/context/cart-context";
import { cn } from "@/lib/utils";
import { Category } from "@/types";
import { Button } from "@/ui/button";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface MainNavProps {
  categories: Category[] | null;
  showNav: boolean;
}

const MainNav: React.FC<MainNavProps> = ({ categories, showNav }) => {
  const pathname = usePathname();

  const routes = categories?.map((category) => ({
    href: `/categories/${category.id}`,
    label: category.name,
    active: pathname === `/category/${category.id}`,
  }));

  return (
    <div
      className={`flex text-md p-4 fixed -left top-0 bg-bgGray  ${
        showNav ? "left-0 bg-white space-y-6 mt-16 text-start" : "-left-full"
      } md:static md:flex-row md:space-x-6 transition-all`}
    >
      <div className={cn("flex gap-4", showNav ? "flex-col" : "")}>
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
    </div>
  );
};

export default MainNav;
