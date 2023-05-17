// eslint-disable-next-line no-unused-vars
import React from "react";
import {
  Box,
  Container,
  Stack,
  Text,
  Link,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link as RichLink } from "react-router-dom";
import { useAtom } from "jotai";
import ShowTools from "../stateManagement/searchTools";

const Footer = () => {
  const [, setShowTools] = useAtom(ShowTools);
  return (
    <Box
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
    >
      <Container
        as={Stack}
        maxW={"6xl"}
        py={4}
        direction={{ base: "column", md: "row" }}
        spacing={4}
        justify={{ base: "center", md: "space-between" }}
        align={{ base: "center", md: "center" }}
      >
        <Stack direction={"row"} spacing={6}>
          <Link
            as={RichLink}
            to={"/"}
            _hover={{
              textDecoration: "none",
            }}
            onClick={() => {
              setShowTools(false);
            }}
          >
            Home
          </Link>
          <Link
            as={RichLink}
            to={"/checkout"}
            _hover={{
              textDecoration: "none",
            }}
          >
            Checkout
          </Link>
        </Stack>
        <Text>© 2023 OldPhoneDeals Ltd. Made with ❤️ in 🇦🇺 🇨🇦 🇨🇳</Text>
      </Container>
    </Box>
  );
};

export default Footer;
