"use client";
import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { AlignJustify, CircleUserIcon, ShoppingBag } from "lucide-react";
import { Category } from "@/types";
import MainNav from "./MainNav";
import { cartContext } from "@/context/cart-context";
import { Button } from "@/ui/button";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import getUser from "@/actions/get-user";

interface NavbarProps {
  categories: Category[] | null;
  userId: string | undefined | null;
}
const Navbar: React.FC<NavbarProps> = ({ categories, userId }) => {
  const [showNav, setShowNav] = useState(false);

  const router = useRouter();

  const session = useSession();

  const cartCtx = useContext(cartContext);

  const totalAmount = cartCtx.data.reduce((total, item) => {
    return (total = total + item.amount);
  }, 0);

  useEffect(() => {
    if (window.screen.width >= 768) {
      setShowNav(false);
    }
  }, [window.screen.width]);

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
      <MainNav categories={categories} showNav={showNav} userId={userId} />

      {/* <div className="absolute right-[10rem] md:right-[12rem] z-30 flex justify-center items-center gap-1 md:gap-4">
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
        <div className="absolute right-2 md:right-[2rem] flex items-center gap-x-4">
          {userId && (
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
      )} */}
    </div>
  );
};

export default Navbar;
