"use client";
import React, { useContext, useState } from "react";
import Link from "next/link";
import { AlignJustify, ShoppingBag } from "lucide-react";
import { Category } from "@/types";
import MainNav from "./MainNav";
import { cartContext } from "@/context/cart-context";
import { Button } from "@/ui/button";
import { useRouter } from "next/navigation";

interface NavbarProps {
  categories: Category[] | null;
}
const Navbar: React.FC<NavbarProps> = ({ categories }) => {
  const [showNav, setShowNav] = useState(false);

  const router = useRouter();

  const cartCtx = useContext(cartContext);
  const totalAmount = cartCtx.data.reduce((total, item) => {
    return (total = total + item.amount);
  }, 0);
  return (
    <div className="flex items-center gap-4 relative mx-2 md:ml-10 mt-4">
      <div
        className="md:hidden items-center p-4 z-30"
        onClick={() => setShowNav(!showNav)}
      >
        <AlignJustify />
      </div>
      <Link href="/" className="w-[10rem]">
        <p className="font-semibold text-xl ">Knit Boutique</p>
      </Link>

      <MainNav categories={categories} showNav={showNav} />
      <div className="ml-auto flex items-center gap-x-4">
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

export default Navbar;
