"use client";

import { Color, Size } from "@/types";
import { Button } from "@/ui/button";
import React, { useState } from "react";
import FilterItem from "./FilterItem";
import { cn } from "@/lib/utils";

interface FilterProps {
  colors: Color[] | undefined;
  sizes: Size[] | undefined;
}
const Filter: React.FC<FilterProps> = ({ colors, sizes }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="ml-2 relative">
      <Button
        onClick={() => setOpen((prev) => !prev)}
        className={cn(
          "bg-white rounded-none border-x-2 border-t-2 border-black",
          open ? "border-b-none" : "border-b-2"
        )}
      >
        Filters +
      </Button>
      {open && (
        <div
          className={cn(
            "absolute z-20 w-[20rem] h-[10rem] bg-white ",
            open
              ? "border-x-2 border-b-2 after:border-t-[50%] border-black"
              : ""
          )}
        >
          <div className="flex h-full gap-10 items-center ml-10">
            <FilterItem data={colors} name="Colors" valueKey="colorId" />
            <FilterItem data={sizes} name="Sizes" valueKey="sizeId" />
          </div>
          {open && (
            <div className="absolute top-0 left-[26%] w-[235px] h-1/2 border-t-2 border-black"></div>
          )}
        </div>
      )}
    </div>
  );
};

export default Filter;
