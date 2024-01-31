"use client";
import React, { useState } from "react";
import Container from "./Container";
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
    <Container>
      <div className="flex">
        <div
          className="md:hidden items-center p-4"
          onClick={() => setShowNav(!showNav)}
        >
          <AlignJustify />
        </div>
        <Link href="/" className="p-4">
          <p>Knit Boutique</p>
        </Link>
        <MainNav categories={categories} showNav={showNav} />
      </div>
    </Container>
  );
};

export default Navbar;
