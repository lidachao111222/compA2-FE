/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import {
  Heading,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
  Divider,
  Card,
  CardHeader,
  CardBody,
  StackDivider,
  useToast,
  Select,
} from "@chakra-ui/react";
import useSWR from "swr";
import fetcher from "../../utils/fetch";
import EditPhoneItem from "./EditPhoneItem";
import NotFound from "../../pages/404";
import Loading from "../Loading";

const ManageListings = () => {
  const toast = useToast();

  const { data, error, isLoading, mutate } = useSWR(
    "https://oldphonedeals.azurewebsites.net/user/manage/getPhoneListings",
    (url) => fetcher(url, "post"),
    { revalidateOnMount: true }
  );

  const [title, setTitle] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");

  const handleButtonClick = () => {
    mutate("https://oldphonedeals.azurewebsites.net/user/manage/getPhoneListings", true);
  };

  if (error) return <NotFound />;
  if (isLoading) return <Loading />;

  return (
    <>
      <Flex align={"center"} justify={"center"}>
        <Stack
          spacing={4}
          w={"full"}
          maxW={"md"}
          rounded={"xl"}
          boxShadow={"lg"}
          p={6}
          my={12}
        >
          <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
            Add A New Listing
          </Heading>

          <FormControl id="title" isRequired>
            <FormLabel>Title</FormLabel>
            <Input
              _placeholder={{ color: "gray.500" }}
              type="text"
              placeholder={"Title"}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </FormControl>
          <FormControl id="brand" isRequired>
            <FormLabel>Brand</FormLabel>
            {/* <Input
              _placeholder={{ color: "gray.500" }}
              type="text"
              placeholder={"brand"}
              onChange={(e) => {
                setBrand(e.target.value);
              }}
            /> */}
            <Select
              value={brand}
              onChange={(e) => {
                setBrand(e.target.value);
              }}
            >
              <option value="">Please select a brand</option>
              <option value="Apple">Apple</option>
              <option value="BlackBerry">BlackBerry</option>
              <option value="HTC">HTC</option>
              <option value="Huawei">Huawei</option>
              <option value="LG">LG</option>
              <option value="Motorola">Motorola</option>
              <option value="Nokia">Nokia</option>
              <option value="Samsung">Samsung</option>
              <option value="Sony">Sony</option>
            </Select>
          </FormControl>
          <FormControl id="stock" isRequired>
            <FormLabel>Stock</FormLabel>
            <Input
              _placeholder={{ color: "gray.500" }}
              type="text"
              placeholder={"stock"}
              onChange={(e) => {
                setStock(e.target.value);
              }}
            />
          </FormControl>
          <FormControl id="price" isRequired>
            <FormLabel>Price</FormLabel>
            <Input
              _placeholder={{ color: "gray.500" }}
              type="text"
              placeholder={"price"}
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            />
          </FormControl>
          <Stack spacing={6} direction={["column", "row"]}>
            <Button
              bg={"blue.400"}
              color={"white"}
              w="full"
              _hover={{
                bg: "blue.500",
              }}
              onClick={async () => {
                // check has empty value or not
                if (
                  title.length === 0 ||
                  brand.length === 0 ||
                  stock.length === 0 ||
                  price.length === 0
                ) {
                  toast({
                    title: "Warning",
                    description: "Please check your input.",
                    status: "warning",
                    duration: 4000,
                    isClosable: true,
                  });
                  return;
                }

                try {
                  const data = await fetcher(
                    "https://oldphonedeals.azurewebsites.net/user/manage/addPhoneListing",
                    "post",
                    {
                      title: title,
                      brand: brand,
                      stock: Number(stock),
                      price: Number(price),
                    }
                  );
                  toast({
                    title: "Success",
                    description:
                      "New Listing Added. Please check your list below",
                    status: "success",
                    duration: 4000,
                    isClosable: true,
                  });
                  handleButtonClick();
                } catch (err) {
                  toast({
                    title: "Error",
                    description: "Wrong input, please try again.",
                    status: "error",
                    duration: 4000,
                    isClosable: true,
                  });
                  return "";
                }
              }}
            >
              Add
            </Button>
          </Stack>
        </Stack>
      </Flex>
      <Divider my="2rem"></Divider>

      <Card mb="2rem">
        <CardHeader>
          <Heading size="lg">List of phone listings:</Heading>
        </CardHeader>

        <CardBody>
          <Stack divider={<StackDivider />} spacing="4">
            {data?.data?.length === 0 ? (
              <Text>👋 There is no list yet.</Text>
            ) : (
              <>
                {data?.data?.map((item) => {
                  return (
                    <EditPhoneItem
                      key={item._id}
                      item={item}
                      handleButtonClick={handleButtonClick}
                    ></EditPhoneItem>
                  );
                })}
              </>
            )}
          </Stack>
        </CardBody>
      </Card>
    </>
  );
};

export default ManageListings;
