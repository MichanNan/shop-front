"use client";
import React, { useContext, useState } from "react";
import Link from "next/link";
import { AlignJustify, Divide, ShoppingBag } from "lucide-react";
import { Category } from "@/types";
import MainNav from "./MainNav";
import { cartContext } from "@/context/cart-context";
import { Button } from "@/ui/button";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

interface NavbarProps {
  categories: Category[] | null;
}
const Navbar: React.FC<NavbarProps> = ({ categories }) => {
  const [showNav, setShowNav] = useState(false);

  const router = useRouter();

  const session = useSession();

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

      <div className="absolute right-[7rem] z-30 flex justify-center items-center gap-1 md:gap-4">
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

      {session && (
        <div className="absolute right-[2rem] flex items-center gap-x-4">
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
      )}
    </div>
  );
};

export default Navbar;
