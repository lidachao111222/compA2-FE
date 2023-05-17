/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import {
  Box,
  Container,
  Stack,
  Divider,
  Text,
  Image,
  Flex,
  Button,
  Heading,
  SimpleGrid,
  Stat,
  StatLabel,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Textarea,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  StackDivider,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import useSWR from "swr";
import fetcher from "../../utils/fetch";
import { MdLocalShipping } from "react-icons/md";
import NotFound from "../../pages/404";
import Loading from "../../components/Loading";
import Review from "../../components/Home/Review";
import { Rating } from "@smastrom/react-rating";
import { useParams } from "react-router-dom";

const Item = () => {
  const toast = useToast();
  const { phoneid } = useParams();
  const [quantity, setQuantity] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleQuantityChange = (newNum) => {
    setQuantity(newNum);
  };

  const { data, error, isLoading, mutate } = useSWR(
    `https://oldphonedeals.azurewebsites.net/home/item?phoneId=${phoneid}`,
    (url) => fetcher(url, "get"),
    { revalidateOnMount: true }
  );

  const handleButtonClick = () => {
    mutate(`https://oldphonedeals.azurewebsites.net/home/item?phoneId=${phoneid}`, true);
  };

  // call after first swr , get full name

  const {
    data: seller,
    // isLoading: nameLoading,
    error: nameError,
  } = useSWR(
    data
      ? `https://oldphonedeals.azurewebsites.net/home/item/username?reviewerId=${data?.data?.seller}`
      : null,
    (url) => fetcher(url, "get"),
    { revalidateOnMount: true }
  );

  if (isLoading) return <Loading />;
  // if (nameLoading) return <Spinner color="red.500" />;
  if (error) return <NotFound />;
  if (nameError) return <Spinner color="red.500" />;

  let reviews = data?.data?.reviews;
  let displayedReviews = reviews?.slice(currentIndex, currentIndex + 3);

  const handleShowMoreReviews = () => {
    if (currentIndex + 3 >= reviews.length) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(currentIndex + 3);
    }
  };

  return (
    <>
      <Container maxW={"7xl"}>
        <SimpleGrid
          columns={{ base: 1, lg: 2 }}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 18, md: 24 }}
        >
          <Flex>
            <Image
              rounded={"md"}
              alt={"product image"}
              src={`/images/${data?.data?.image}`}
              fit={"cover"}
              align={"center"}
              w={"100%"}
              h={{ base: "100%", sm: "400px", lg: "500px" }}
            />
          </Flex>
          <Stack spacing={{ base: 6, md: 10 }}>
            <Box as={"header"}>
              <Heading
                lineHeight={1.1}
                fontWeight={600}
                fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
              >
                {data?.data?.title}
              </Heading>
              <Text fontSize={"3xl"} mt={"2rem"} fontWeight="bold">
                $&nbsp;{data?.data?.price}
              </Text>

              <Text fontWeight={300} fontSize={"2xl"}>
                available stock:&nbsp;
                <Box as="span" fontWeight="semibold">
                  {data?.data?.stock}
                </Box>
              </Text>

              <Text fontWeight={300} fontSize={"2xl"}>
                brand:&nbsp;
                <Box as="span" fontWeight="semibold">
                  {data?.data?.brand}
                </Box>
              </Text>

              <Text fontWeight={300} fontSize={"2xl"}>
                seller&apos;s full name:&nbsp;
                <Box as="span" fontWeight="semibold">
                  {seller?.data?.firstname}&nbsp;{seller?.data?.lastname}
                </Box>
              </Text>
            </Box>
            <Divider></Divider>
            {/* TODO here is the review list */}
            <Card>
              <CardHeader>
                <Heading size="md">Reviews:</Heading>
              </CardHeader>

              <CardBody>
                <Stack divider={<StackDivider />} spacing="4">
                  {data?.data?.reviews?.length === 0 ? (
                    <Text>no review, u can be the first person. 🕺</Text>
                  ) : (
                    displayedReviews?.map((item, index) => {
                      return <Review data={item} key={index}></Review>;
                    })
                  )}
                </Stack>
              </CardBody>
              <CardFooter>
                <Flex w={"100%"} justifyContent={"right"}>
                  {reviews?.length > 3 ? (
                    <Button onClick={handleShowMoreReviews}>
                      show more reviews
                    </Button>
                  ) : reviews?.length === 0 ? (
                    <></>
                  ) : (
                    <Flex w="100%" flexDir={"column"} alignItems={"end"}>
                      <Divider mb="1rem"></Divider>
                      <Text>That is all reviews. 🎉</Text>
                    </Flex>
                  )}
                </Flex>
              </CardFooter>
            </Card>
            <Divider></Divider>
            {/* button  */}
            <AddToCart
              data={data}
              onNameChange={handleQuantityChange}
            ></AddToCart>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent={"center"}
            >
              <Stat>
                <StatLabel fontSize={"lg"} fontWeight="normal">
                  current added quantity:{" "}
                  <Box as="span" fontWeight={"semibold"} fontSize={"lg"}>
                    {quantity}
                  </Box>
                </StatLabel>
              </Stat>
              <MdLocalShipping />
              <Text>
                {" "}
                <Box as="span" fontWeight={"semibold"}>
                  2-3
                </Box>
                &nbsp;business days delivery
              </Text>
            </Stack>
          </Stack>
        </SimpleGrid>
        <Divider mb="2rem"></Divider>
        <Flex flexDir={"column"} mb={"2rem"}>
          <Rating
            style={{ maxWidth: 180 }}
            value={rating}
            onChange={setRating}
            isRequired
          />
          <Textarea
            mt="1rem"
            placeholder="Please Login to leave common."
            onChange={(e) => {
              setComment(e.target.value);
            }}
          />
          <Button
            mt="1rem"
            colorScheme="blue"
            //TODO check login then leave common
            onClick={async () => {
              if (
                rating?.length === 0 ||
                rating === 0 ||
                comment?.length === 0
              ) {
                toast({
                  title: "Warning",
                  description: "Please check your input.",
                  status: "warning",
                  duration: 1000,
                  isClosable: true,
                });
                return;
              }

              try {
                const data = await fetcher(
                  "https://oldphonedeals.azurewebsites.net/home/item/addReview",
                  "post",
                  {
                    phoneId: phoneid,
                    rating: rating,
                    comment: comment,
                  }
                );

                handleButtonClick();
                // handleButtonClick();
                return data;
              } catch (err) {
                if (err.response.status === 409) {
                  toast({
                    title: "Error",
                    description: "You already left comment.",
                    status: "error",
                    duration: 1000,
                    isClosable: true,
                  });
                }

                return err;
              }
            }}
          >
            Submit
          </Button>
        </Flex>
      </Container>
    </>
  );
};
// add to cart button
const AddToCart = ({ data, onNameChange }) => {
  const OverlayOne = () => (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />
  );

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = useState(<OverlayOne />);
  const [inputValue, setInputValue] = useState(0);

  const handleClick = (value) => {
    onNameChange(value);
  };

  return (
    <>
      <Button
        rounded={"none"}
        w={"full"}
        mt={8}
        size={"lg"}
        py={"7"}
        textTransform={"uppercase"}
        colorScheme="green"
        _hover={{
          transform: "translateY(2px)",
          boxShadow: "lg",
        }}
        onClick={async () => {
          setOverlay(<OverlayOne />);

          // call any post req with token /
          try {
            const data = await fetcher(
              "https://oldphonedeals.azurewebsites.net/user/reviews/viewReviews",
              "post"
            );
          } catch (err) {
            return "";
          }

          onOpen();
        }}
      >
        Add TO CART
      </Button>

      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        {overlay}
        <ModalContent>
          <ModalHeader>Quantity</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Please enter the total:</Text>
            <NumberInput
              allowMouseWheel
              defaultValue={0}
              min={1}
              max={data?.data?.stock}
              onChange={(e) => {
                setInputValue(Number(e));
              }}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="green"
              onClick={() => {
                // TODO add to cart need to store into localstorage
                // 标题,价格(这个商品的总价),数量,id,图片
                handleClick(inputValue);

                if (inputValue === 0) {
                  return;
                }

                let phoneInfo = {
                  id: data?.data?._id,
                  title: data?.data?.title,
                  brand: data?.data?.brand,
                  price: data?.data?.price,
                  stock: data?.data?.stock,
                  order: inputValue,
                };

                let currentCart =
                  JSON.parse(localStorage.getItem("cart")) || [];

                const index = currentCart.findIndex(
                  (item) => item.id === phoneInfo.id
                );

                if (index === -1) {
                  currentCart.push(phoneInfo);
                } else {
                  currentCart[index].order = phoneInfo.order;
                }

                localStorage.setItem("cart", JSON.stringify(currentCart));

                onClose();
              }}
              mx="1rem"
            >
              Add
            </Button>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Item;
