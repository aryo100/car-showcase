"use client";

import { Fragment, useState } from "react";
import { useRouter } from "next/navigation";
import { Listbox, Transition } from "@headlessui/react";
import Image from "next/image";
import { CustomFilterProps } from "@/types/indext";
import { updateSearchParams } from "@/utils";

export default function CustomFilter({
  options,
  title,
  searchParams,
  setFilter,
}: CustomFilterProps & {
  setFilter?: (filter: string) => void;
}) {
  const [selectedOption, setSelected] = useState(
    searchParams && searchParams[title]
      ? { title: searchParams[title], value: searchParams[title] }
      : options[0]
  );
  const router = useRouter();

  const handleUpdateParams = (e: { title: string; value: string }) => {
    const newPathName = updateSearchParams(title, e.value);

    router.push(newPathName);
  };

  return (
    <div className="w-fit">
      <Listbox
        value={selectedOption}
        onChange={(e) => {
          setSelected(e);
          // server side rendering
          // handleUpdateParams(e);
          if (setFilter) {
            setFilter(e.value);
          }
        }}
      >
        <div className="relative w-fit z-10">
          <Listbox.Button className="custom-filter__btn">
            <span className="block truncate">{selectedOption.title}</span>
            <Image
              src="/public/chevron-up-down.svg"
              width={20}
              height={20}
              className="ml-4 object-contain"
              alt="chevron up down"
            />
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="custom-filter__options">
              {options.map((option) => (
                <Listbox.Option
                  key={option.title}
                  value={option}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 px-4 ${
                      active ? "bg-primary-blue text-white" : "text-gray-900"
                    }`
                  }
                >
                  {(selected) => (
                    <span
                      className={`block truncate ${
                        selected ? "font-medium" : "font-normal"
                      }`}
                    >
                      {option.title}
                    </span>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
