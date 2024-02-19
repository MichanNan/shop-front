"use client";
import { cartContext } from "@/context/cart-context";
import { cn } from "@/lib/utils";
import { Category } from "@/types";
import { Button } from "@/ui/button";
import {
  ChevronRight,
  ChevronUp,
  ChevronsDown,
  ChevronsDownUp,
  ChevronsUp,
  CircleUserIcon,
  ShoppingBag,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

interface MainNavProps {
  categories: Category[] | null;
  showNav: boolean;
  userId: string | undefined | null;
}

type Route = {
  href: string;
  label: string;
  active: boolean;
};

type Routes = Route[] | null;

const MainNav: React.FC<MainNavProps> = ({ categories, showNav, userId }) => {
  const pathname = usePathname();

  const routes = categories?.map((category) => ({
    href: `/categories/${category.id}`,
    label: category.name,
    active: pathname === `/category/${category.id}`,
  }));

  useEffect(() => {
    if (routes && routes.length > 5) {
      setShowRoutes(shortRoutes);
      setRoutesIsShort(true);
      setFoldedNav(routes.slice(5));
    }
  }, []);

  const [showRoutes, setShowRoutes] = useState(routes);
  const [routesIsShort, setRoutesIsShort] = useState(false);
  const [foldedNav, setFoldedNav] = useState<Routes>([]);
  const [navIsfolded, setNavIsFolded] = useState(true);

  const router = useRouter();

  const session = useSession();

  const cartCtx = useContext(cartContext);

  const isLoggedIn = session?.data?.user ? true : false;

  const totalAmount = cartCtx.data.reduce((total, item) => {
    return (total = total + item.amount);
  }, 0);

  if (!routes) return;
  const handleUnfoldNav = () => {
    setNavIsFolded(false);
  };

  const shortRoutes = routes.slice(0, 5);

  const handleFoldNav = () => {
    setNavIsFolded(true);
  };

  return (
    <div
      className={` flex text-md p-8 md:p-0 pl-10 fixed -left top-0 bg-bgGray  ${
        showNav
          ? " left-0 bg-white space-y-6 md:space-y-2 mt-14 md:mt-0 text-start flex-col md:flex-row"
          : "-left-full flex-col md:flex-row"
      } md: w-full md:static md:grid grid-cols-6 md:space-x-6 transition-all`}
    >
      <div className="relative flex gap-4 flex-col md:col-span-4 md:flex-row md:items-center">
        {showRoutes &&
          showRoutes.map((route) => (
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
        {routes.length > 5 && routesIsShort && navIsfolded && (
          <Button
            onClick={handleUnfoldNav}
            className=" font-bold text-xl text-gray-800 p-0 w-3"
          >
            ...
          </Button>
        )}
        {!navIsfolded && foldedNav && (
          <div className=" md:absolute md:left-[16rem] md:top-6 bg-white md:border-x-2 md:border-b-2 md: border-black justify-center text-cente p-2">
            <div className=" grid md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 pt-0">
              {foldedNav.map((route) => (
                <div key={route.href}>{route.label}</div>
              ))}
            </div>
            <Button onClick={handleFoldNav}>
              <ChevronUp size={15} />
            </Button>
          </div>
        )}
      </div>

      <div className="  flex flex-col gap-1 justify-center items-start text-sm md:text-md  md:items-center xl:gap-4 xl:flex-row transition-all">
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

      <div className=" flex flex-col gap-2 md:flex-row items-start md:items-center gap-x-4 transition-all">
        {isLoggedIn && (
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
    </div>
  );
};

export default MainNav;
