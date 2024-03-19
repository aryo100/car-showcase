"use client";

import { CarCard, CustomFilter, Hero, SearchBar, ShowMore } from "@/components";
import { fuels, yearsOfProduction } from "@/constants";
import { CarProps } from "@/types/indext";
// import { FilterProps } from "@/types/indext";
import { fetchCars } from "@/utils";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  // server side rendering
  //   {
  //   searchParams,
  // }: {
  //   searchParams: FilterProps;
  // }

  // start client side
  const [allCars, setAllCars] = useState<{ message: string } | CarProps[]>([]);
  const [loading, setLoading] = useState(false);

  const [manufacturer, setManufacturer] = useState("");
  const [model, setModel] = useState("");

  const [fuel, setFuel] = useState("");
  const [year, setYear] = useState(2020);

  const [limit, setLimit] = useState(10);

  const getCars = async () => {
    setLoading(true);
    try {
      const result = await fetchCars({
        manufacturer: manufacturer || "",
        year: `${year || "2022"}`,
        fuel: fuel || "",
        limit: `${limit || "10"}`,
        model: model || "",
      });

      setAllCars(result);
    } catch (error) {
      console.log("error: ", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getCars();
  }, [fuel, year, limit, manufacturer, model]);
  // end client side rendering

  // server side rendering
  // const allCars = await fetchCars({
  //   manufacturer: searchParams.manufacturer || "",
  //   year: searchParams.year || "2022",
  //   fuel: searchParams.fuel || "",
  //   limit: searchParams.limit || "10",
  //   model: searchParams.model || "",
  // });

  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;

  return (
    <main className="overflow-hidden">
      <Hero />
      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
          <p>Explore the cars you might link</p>
        </div>

        <div className="home__filters">
          <SearchBar
            // searchParams={searchParams}
            setManufacturer={setManufacturer}
            setModel={setModel}
          />

          <div className="home__filter-container">
            <CustomFilter
              // searchParams={searchParams}
              title="fuel"
              options={fuels}
              setFilter={setFuel}
            />
            <CustomFilter
              // searchParams={searchParams}
              title="year"
              options={yearsOfProduction}
              setFilter={(e) => setYear(Number(e))}
            />
          </div>
        </div>
        {/* server side rendering */}
        {/* {!isDataEmpty ? ( */}
        {!isDataEmpty ? (
          <section>
            <div className="home__cars-wrapper">
              {allCars?.map((car) => (
                <CarCard car={car} />
              ))}
            </div>

            {loading && (
              <div className="mt-16 w-full flex justify-center">
                <Image
                  src="/public/logo.svg"
                  alt="loader"
                  width={50}
                  height={50}
                  className="object-contain"
                />
              </div>
            )}

            <ShowMore
              pageNumber={Number(limit) / 10}
              isNext={Number(limit) > allCars.length}
              setLimit={setLimit}
            />
            {/* server side rendering
            <ShowMore
              pageNumber={Number(searchParams.limit || 10) / 10}
              isNext={Number(searchParams.limit || 10) > allCars.length}
            /> */}
          </section>
        ) : (
          <div className="home__error-container">
            <h2 className="text-black text-xl font-bold">Oops, no results</h2>
            <p>{!Array.isArray(allCars) && allCars?.message}</p>
          </div>
        )}
      </div>
    </main>
  );
}
