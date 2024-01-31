import { cn } from "@/lib/utils";
import { Category } from "@/types";
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
    href: `/category/${category.id}`,
    label: category.name,
    active: pathname === `/category/${category.id}`,
  }));
  return (
    <div
      className={`flex p-4 font-3xl font-medium pl-8 fixed z-30 w-[12rem] ${
        showNav
          ? "left-0 bg-white flex-col space-y-6 mt-12 justify-center text-start"
          : "-left-full"
      } md:static md:flex-row md:space-x-6 transition-all`}
    >
      {routes?.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "transition-colors hover:text-black",
            route.active ? "text-black font-bold" : "text-neutral-500"
          )}
        >
          {route.label}
        </Link>
      ))}
    </div>
  );
};

export default MainNav;
