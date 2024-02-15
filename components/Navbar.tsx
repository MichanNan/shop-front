"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { AlignJustify } from "lucide-react";
import { Category } from "@/types";
import MainNav from "./MainNav";

interface NavbarProps {
  categories: Category[] | null;
  userId: string | undefined | null;
}
const Navbar: React.FC<NavbarProps> = ({ categories, userId }) => {
  const [showNav, setShowNav] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  if (typeof window === "undefined") return;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (window.screen.width >= 768) {
      setShowNav(false);
    }
  }, [window.screen.width]);

  if (!isMounted) return;

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
    </div>
  );
};

export default Navbar;
