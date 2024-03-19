import { MouseEventHandler } from "react";

export interface CusttomButtonProps {
  title: string;
  containerStyles?: string;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
  btnType?: "button" | "submit";
  textStyle?: string;
  rightIcon?: string;
  isDisabled?: boolean;
}

export interface SearchManufactureProps {
  manufacturer: string;
  setManufacturer: (manufacturer: string) => void;
}

export interface CarProps {
  city_mpg: number;
  class: string;
  combination_mpg: number;
  cylinders: number;
  displacement: number;
  drive: string;
  fuel_type: string;
  highway_mpg: number;
  make: string;
  model: string;
  transmission: string;
  year: number;
}

export interface FilterProps {
  manufacturer: string;
  year: string;
  fuel: string;
  limit: string;
  model: string;
}

export interface OptionProps {
  title: string;
  value: string;
}

export interface CustomFilterProps {
  title: keyof FilterProps;
  options: OptionProps[];
  searchParams?: FilterProps;
}

export interface ShowMoreProps {
  pageNumber: number;
  isNext: boolean;
}
