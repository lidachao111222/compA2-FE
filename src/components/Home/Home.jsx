// eslint-disable-next-line no-unused-vars
import React from "react";
import useSWR from "swr";
import { SimpleGrid, Box, Heading, Highlight, Divider } from "@chakra-ui/react";
import Product from "../Home/Product";
import NotFound from "../../pages/404";
import Loading from "../../components/Loading";
import fetcher from "../../utils/fetch";

const Home = () => {
  const { data, error, isLoading } = useSWR(
    "https://oldphonedeals.azurewebsites.net",
    (url) => fetcher(url, "get"),
    { revalidateOnMount: true }
  );

  if (error) return <NotFound />;
  if (isLoading) return <Loading />;
  return (
    <Box my={"4rem"}>
      <Box>
        {/* Sold out soon header*/}
        <Heading lineHeight="tall" textAlign={"center"} mb="2rem">
          <Highlight
            query="Sold out"
            styles={{ px: "2", py: "1", rounded: "full", bg: "red.100" }}
          >
            Sold out soon
          </Highlight>
        </Heading>
        {/* Sold out soon Grid*/}
        <SimpleGrid
          minChildWidth={["auto", "330px", "330px", "330px"]}
          spacing="40px"
          justifyContent={"centrer"}
          px={["0rem", "4rem", "4rem", "4rem"]}
        >
          {data.lowStock.map((item) => {
            return (
              <Box margin={"0 auto"} key={item._id}>
                <Product item={item} tag={"soldOut"}></Product>
              </Box>
            );
          })}
        </SimpleGrid>
      </Box>
      {/* Divider */}
      <Divider my={"4rem"} />
      {/* Best sellers  header*/}
      <Box my={"4rem"}>
        <Heading lineHeight="tall" textAlign={"center"} mb="2rem">
          <Highlight
            query="Best"
            styles={{ px: "2", py: "1", rounded: "full", bg: "red.100" }}
          >
            Best sellers
          </Highlight>
        </Heading>
        {/* Best sellers  Grid*/}
        <SimpleGrid
          minChildWidth={["auto", "330px", "330px", "330px"]}
          spacing="40px"
          justifyContent={"centrer"}
          px={["0rem", "4rem", "4rem", "4rem"]}
        >
          {data.popular.map((item) => {
            return (
              <Box margin={"0 auto"} key={item._id}>
                <Product item={item} tag={"bestSeller"}></Product>
              </Box>
            );
          })}
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default Home;
