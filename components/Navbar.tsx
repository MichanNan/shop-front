"use client";
import React, { useState } from "react";
import Link from "next/link";
import { AlignJustify } from "lucide-react";
import { Category } from "@/types";
import MainNav from "./MainNav";

interface NavbarProps {
  categories: Category[] | null;
}
const Navbar: React.FC<NavbarProps> = ({ categories }) => {
  const [showNav, setShowNav] = useState(false);
  return (
    <div className="flex items-center gap-4 relative ml-10 mt-4">
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
    </div>
  );
};

export default Navbar;
