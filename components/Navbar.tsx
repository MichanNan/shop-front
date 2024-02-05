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
    <div className="flex relative">
      <div
        className="md:hidden items-center p-4 z-30"
        onClick={() => setShowNav(!showNav)}
      >
        <AlignJustify />
      </div>
      <Link href="/" className="p-4">
        <p className="font-semibold text-xl ">Knit Boutique</p>
      </Link>

      <MainNav categories={categories} showNav={showNav} />
    </div>
  );
};

export default Navbar;
