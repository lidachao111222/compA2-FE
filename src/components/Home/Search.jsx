// eslint-disable-next-line no-unused-vars
import React from "react";
import useSWR from "swr";
import { useAtom } from "jotai";
import {
  SimpleGrid,
  Box,
  Heading,
  Highlight,
  Select,
  Flex,
  Text,
} from "@chakra-ui/react";
import fetcher from "../../utils/fetch";
import {
  SearchInputValue,
  SearchPhoneBrand,
  SearchMinPrice,
  SearchMaxPrice,
  SearchOrder,
} from "../../stateManagement/searchReqInfos";
import Product from "../Home/Product";
import NotFound from "../../pages/404";
import Loading from "../../components/Loading";

const order = ["price", "stock", "title"];

const Search = () => {
  const [searchInputValue] = useAtom(SearchInputValue);
  const [searchPhoneBrand] = useAtom(SearchPhoneBrand);
  const [searchMinPrice] = useAtom(SearchMinPrice);
  const [searchMaxPrice] = useAtom(SearchMaxPrice);
  const [searchOrder, setSearchOrder] = useAtom(SearchOrder);

  const { data, error, isLoading } = useSWR(
    `https://oldphonedeals.azurewebsites.net/?title=${searchInputValue}&brand=${searchPhoneBrand}&minPrice=${searchMinPrice}&maxPrice=${searchMaxPrice}&order=${searchOrder}`,
    (url) => fetcher(url, "get"),
    { revalidateOnMount: true }
  );

  if (error) return <NotFound />;
  if (isLoading) return <Loading />;

  const handleChange = (e) => {
    setSearchOrder(e.target.value);
  };

  return (
    <Box my={"4rem"}>
      <Box>
        <Flex
          mx="5rem"
          alignItems={"center"}
          mb={["2rem", "2rem", "0rem", "0rem"]}
        >
          <Text>sort: &nbsp;</Text>
          <Select
            // minW={"13rem"}
            alignItems={"center"}
            value={searchOrder}
            variant="filled"
            onChange={handleChange}
            maxW={["10rem", "10rem", "12rem", "13rem"]}
          >
            {order?.map((order) => (
              <option key={order} value={order}>
                {order}
              </option>
            ))}
          </Select>
        </Flex>
        {/* Sold out soon header*/}
        <Heading lineHeight="tall" textAlign={"center"} mb="2rem">
          <Highlight
            query="Result"
            styles={{
              px: "2",
              py: "1",
              rounded: "full",
              bg: "red.100",
              color: "white",
            }}
          >
            Result
          </Highlight>
        </Heading>

        {/* Sold out soon Grid*/}
        <SimpleGrid
          minChildWidth={["auto", "330px", "330px", "330px"]}
          spacing="40px"
          justifyContent={"centrer"}
          px={["0rem", "4rem", "4rem", "4rem"]}
        >
          {data?.data?.length === 0 ? (
            <Text fontSize={"2xl"}>
              We apologize, there are currently no available products to
              display. 🙇‍♂️
            </Text>
          ) : (
            <>
              {data?.data?.map((item) => {
                return (
                  <Box margin={"0 auto"} key={item._id}>
                    <Product item={item} tag={"search"}></Product>
                  </Box>
                );
              })}
            </>
          )}
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default Search;
