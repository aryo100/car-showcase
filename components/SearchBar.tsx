"use client";

import React, { useState } from "react";
import { SearchManufacture } from ".";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FilterProps } from "@/types/indext";

const SearchButton = ({ otherClass }: { otherClass: string }) => (
  <button type="submit" className={`-ml-3 z-10 ${otherClass}`}>
    <Image
      src={"/public/magnifying-glass.svg"}
      alt="magnifying glass"
      width={40}
      height={40}
      className="object-contain"
    />
  </button>
);

export default function SearchBar({
  searchParams,
  setManufacturer,
  setModel,
}: {
  searchParams?: FilterProps;
  setManufacturer?: (manufacturer: string) => void;
  setModel?: (manufacturer: string) => void;
}) {
  const [searchManufacturer, setSearchManufacturer] = useState("");
  const [searchModel, setSearchModel] = useState("");

  // server side rendering
  // const [manufacturer, setManufacturer] = useState(
  //   searchParams?.manufacturer || ""
  // );
  // const [model, setModel] = useState(searchParams?.model || "");
  // const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (searchManufacturer === "" && searchModel === "") {
      return alert("Please fill in the search bar");
    }

    // server side rendering
    // updateSearchParams(searchModel, searchManufacturer);

    if (setModel && setManufacturer) {
      setModel(searchModel);
      setManufacturer(searchManufacturer);
    }
  };

  // const updateSearchParams = (model: string, manufacturer: string) => {
  //   const searchParams = new URLSearchParams(window.location.search);

  //   if (model) {
  //     searchParams.set("model", model);
  //   } else {
  //     searchParams.delete("model");
  //   }

  //   if (manufacturer) {
  //     searchParams.set("manufacturer", manufacturer);
  //   } else {
  //     searchParams.delete("manufacturer");
  //   }

  //   const newPathName = `${
  //     window.location.pathname
  //   }?${searchParams.toString()}`;
  //   router.push(newPathName);
  // };

  return (
    <form className="searchbar" onSubmit={handleSearch}>
      <div className="searchbar__item">
        <SearchManufacture
          // server side rendering
          // manufacturer={searchManufacturer}
          // setManufacturer={setSearchManufacturer}
          selected={searchManufacturer}
          setSelected={setSearchManufacturer}
        />
        <SearchButton otherClass="sm:hidden" />
      </div>
      <div className="searchbar__item">
        <Image
          src={"/public/model-icon.png"}
          width={25}
          height={25}
          className="absolute w-[20px] h-[20px] ml-4"
          alt="car model"
        />
        <input
          type="text"
          name="model"
          value={searchModel}
          onChange={(e) => setSearchModel(e.target.value)}
          className="searchbar__input"
        />
        <SearchButton otherClass="sm:hidden" />
      </div>
      <SearchButton otherClass="max-sm:hidden" />
    </form>
  );
}
