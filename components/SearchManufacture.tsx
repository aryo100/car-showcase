"use client";

import React, { useState, Fragment } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { SearchManufactureProps } from "@/types/indext";
import Image from "next/image";
import { manufacturers } from "@/constants";

export default function SearchManufacture({
  selected,
  setSelected,
}: {
  selected: string;
  setSelected?: (selected: string) => void;
}) {
  // server side rendering
  // {
  // manufacturer,
  // setManufacturer,
  // }: SearchManufactureProps
  const [query, setQuery] = useState("");

  const filterManufacturers =
    query === ""
      ? manufacturers
      : manufacturers.filter((item) =>
          item
            .toLocaleLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLocaleLowerCase().replace(/\s+/g, ""))
        );

  return (
    <div className="search-manufacturer">
      <Combobox
        // server side rendering
        // value={manufacturer} onChange={setManufacturer}
        value={selected}
        onChange={setSelected}
      >
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
            className={"search-manufacturer__input"}
            placeholder="Volkswagen"
            displayValue={(manufacturer: string) => manufacturer}
            onChange={(e) => setQuery(e.target.value)}
          />

          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options>
              {filterManufacturers.map((item) => (
                <Combobox.Option
                  key={item}
                  className={({ active }) =>
                    `relative search-manufacturer__option ${
                      active ? "bg-primary-blue text-white" : "text-gray-900"
                    }`
                  }
                  value={item}
                >
                  {({ active, selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-bold" : "font-normal"
                        }`}
                      >
                        {item}
                      </span>
                      {selected && (
                        <span
                          className={`${
                            active
                              ? "bg-primary-blue text-white"
                              : "text-gray-900"
                          }`}
                        ></span>
                      )}
                    </>
                  )}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
}
