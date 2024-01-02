"use client";

import React from "react";
import { Combobox, Transition } from "@headlessui/react";
import { SearchManufactureProps } from "@/types/indext";
import Image from "next/image";

export default function SearchManufacture({
  manufacturer,
  setManufacturer,
}: SearchManufactureProps) {
  return (
    <div className="search-manufacturer">
      <Combobox>
        <div className="relative w-full">
          <Combobox.Button className={"absolute top-[14px]"}>
            <Image
              src={"./public/car-logo.svg"}
              width={20}
              height={20}
              className="ml-4"
              alt="Car Logo"
            />
          </Combobox.Button>

          <Combobox.Input
            className={'search-manufacturer__input'}
            placeholder="Volkswagen"
            displayValue={(manufacturer: string) => manufacturer}
          />
        </div>
      </Combobox>
    </div>
  );
}
