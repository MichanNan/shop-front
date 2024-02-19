"use client";

import { cn } from "@/lib/utils";
import { Color, Size } from "@/types";
import { Button } from "@/ui/button";
import { ChevronUp } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import React, { useEffect, useState } from "react";

interface FilterProps {
  data: Size[] | Color[] | undefined;
  name: string;
  valueKey: string;
}

const FilterItem: React.FC<FilterProps> = ({ data, name, valueKey }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [showData, setShowData] = useState(data);
  const [dataIsShort, setDataIsShort] = useState(false);

  if (!showData || !data) return;

  const shortData = data.slice(0, 8);

  useEffect(() => {
    if (data.length > 8) {
      setShowData(shortData);
      setDataIsShort(true);
    }
  }, []);

  const selectedValue = searchParams.get(valueKey);

  const onClick = (id: string) => {
    const current = qs.parse(searchParams.toString());
    const query = {
      ...current,
      [valueKey]: id,
    };

    if (current[valueKey] === id) {
      query[valueKey] = null;
    }

    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      {
        skipNull: true,
      }
    );
    router.push(url, { scroll: false });
  };

  const handleUnfoldData = () => {
    setShowData(data);
    setDataIsShort(false);
  };

  const handleFoldData = () => {
    setShowData(shortData);
    setDataIsShort(true);
  };

  return (
    <div className="mb-8 p-x-4">
      <h3 className="text-lg font-semibold">{name}</h3>
      <hr className="my-4" />
      <div className="grid grid-cols-2 gap-1 md:grid-cols-4 md:gap-2 ">
        {showData.map((filter) => (
          <div key={filter.id} className="flex items-center">
            <Button
              className={cn(
                "rounded-md text-sm text-gray-800 p-2 bg-white border border-gray-300",
                selectedValue === filter.id && "bg-black text-white"
              )}
              onClick={() => onClick(filter.id)}
            >
              {filter.name}
            </Button>
          </div>
        ))}
        {data.length > 8 && dataIsShort && (
          <Button
            onClick={handleUnfoldData}
            variant={"ghost"}
            className=" font-bold text-sm text-gray-800 p-0 w-3"
          >
            ...
          </Button>
        )}
        {data.length > 8 && !dataIsShort && (
          <Button
            onClick={handleFoldData}
            variant={"ghost"}
            className=" font-bold text-sm text-gray-800 p-0 w-3"
          >
            <ChevronUp size={20} className="col-start-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default FilterItem;
