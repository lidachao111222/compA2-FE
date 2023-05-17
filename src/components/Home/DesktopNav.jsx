/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars

import { useState } from "react";
import {
  Box,
  Flex,
  Button,
  Stack,
  Select,
  Input,
  Link,
} from "@chakra-ui/react";
import PriceRange from "./PriceRange";
import { useAtom } from "jotai";
import ShowTools from "../../stateManagement/searchTools";
import {
  SearchInputValue,
  SearchPhoneBrand,
  SearchMinPrice,
  SearchMaxPrice,
} from "../../stateManagement/searchReqInfos";
import { Link as RichLink } from "react-router-dom";
import useSWR from "swr";
import fetcher from "../../utils/fetch";

const brands = [
  "all",
  "Apple",
  "HTC",
  "Huawei",
  "LG",
  "Motorola",
  "Nokia",
  "Samsung",
  "Sony",
];
const DesktopNav = () => {
  const [showTools, setShowTools] = useAtom(ShowTools);
  const [searchInputValue, setSearchInputValue] = useAtom(SearchInputValue);
  const [searchPhoneBrand, setSearchPhoneBrand] = useAtom(SearchPhoneBrand);
  const [searchMinPrice] = useAtom(SearchMinPrice);
  const [searchMaxPrice, setSearchMaxPrice] = useAtom(SearchMaxPrice);

  const handleChange = (e) => {
    setSearchPhoneBrand(e.target.value);
  };

  const { data, error, isLoading } = useSWR(
    "https://oldphonedeals.azurewebsites.net/home/getMaxPrice",
    (url) => fetcher(url, "get"),
    { revalidateOnMount: true }
  );

  let fetchMaxPrice = undefined;

  if (data?.data != undefined) {
    // eslint-disable-next-line no-const-assign
    fetchMaxPrice = data?.data;
  }

  if (searchMaxPrice === -1 && fetchMaxPrice != undefined) {
    setSearchMaxPrice(fetchMaxPrice);
  }

  const [inputValue, setInputValue] = useState("");

  function handleInputChange(e) {
    setInputValue(e.target.value);
  }

  return (
    <Stack direction={"row"} spacing={10}>
      <Flex alignItems={"center"}>
        <Input
          minW={"20rem"}
          placeholder="Find phone"
          onFocus={(e) => {
            setShowTools(true);
          }}
          onBlur={(e) => {
            setShowTools(true);
          }}
          onChange={handleInputChange}
        />
        <Button
          isLoading={isLoading === true ? true : false}
          onClick={() => {
            setShowTools(true);
            setSearchInputValue(inputValue);
          }}
        >
          <Link
            as={RichLink}
            to={"/search"}
            _hover={{
              textDecoration: "none",
            }}
          >
            Search
          </Link>
        </Button>
      </Flex>
      {showTools === true ? (
        <Flex>
          <Flex alignItems="center">
            <Select
              minW={"13rem"}
              alignItems={"center"}
              value={searchPhoneBrand}
              onChange={handleChange}
            >
              {brands.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </Select>
          </Flex>

          <Box>
            <PriceRange fetchMaxPrice={fetchMaxPrice}></PriceRange>
          </Box>
        </Flex>
      ) : (
        <></>
      )}
    </Stack>
  );
};

export default DesktopNav;
