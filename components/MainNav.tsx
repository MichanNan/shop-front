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
    href: `/categories/${category.id}`,
    label: category.name,
    active: pathname === `/category/${category.id}`,
  }));
  return (
    <div
      className={`flex p-4 text-xl font-medium pl-12 z-30 w-[10rem] h-[300px] md:h-auto absolute ${
        showNav
          ? "left-0 bg-white flex-col space-y-6 mt-12  text-start"
          : "-left-full"
      } md:static md:flex-row md:space-x-6 transition-all`}
    >
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
  );
};

export default MainNav;
