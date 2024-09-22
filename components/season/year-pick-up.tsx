"use client";

import * as React from "react";
import { Badge } from "../ui/badge";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SetStateAction } from "react";
import { Dispatch } from "react";

type YearPickUpProps = {
  value: number;
  label: string;
};

export function YearPickUp({
  onChange,
}: {
  onChange: Dispatch<SetStateAction<number>>;
}) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<number>(new Date().getFullYear());
  const [years, setYears] = React.useState<YearPickUpProps[]>([]);

  React.useEffect(() => {
    const currentYear = new Date().getFullYear();
    const yearList = Array.from({ length: 10 }, (_, i) => {
      return { value: currentYear - i, label: (currentYear - i).toString() };
    });
    setYears(yearList);
    setValue(currentYear);
  }, []);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          <p>YEAR</p>
          <Badge variant={"secondary"}>{value || "Select year..."}</Badge>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <ul className="max-h-40 overflow-y-auto">
          {years.map((year) => (
            <li
              key={year.value}
              className={`cursor-pointer p-2 hover:bg-secondary ${
                value === year.value ? "font-bold" : ""
              }`}
              onClick={() => {
                setValue(year.value);
                setOpen(false);
                onChange(year.value);
              }}
            >
              {year.label}
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
}
