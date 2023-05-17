import { atom } from "jotai";

const SearchInputValue = atom("");
const SearchPhoneBrand = atom("all");
const SearchMinPrice = atom(0);
const SearchMaxPrice = atom(-1);
const SearchOrder = atom("");

export {
  SearchInputValue,
  SearchPhoneBrand,
  SearchMaxPrice,
  SearchMinPrice,
  SearchOrder,
};
