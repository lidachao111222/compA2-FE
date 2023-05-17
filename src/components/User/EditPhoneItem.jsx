/* eslint-disable react/prop-types */
import {
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useColorModeValue,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import fetcher from "../../utils/fetch";

const EditPhoneItem = ({ item, handleButtonClick }) => {
  let currentState = Object.prototype.hasOwnProperty.call(item, "disabled");
  const toast = useToast();
  return (
    <Center py={6}>
      <Tooltip
        label={item?.title}
        placement="auto"
        closeDelay={500}
        hasArrow
        arrowSize={15}
      >
        <Stack
          cursor={"pointer"}
          borderWidth="1px"
          borderRadius="lg"
          w={{ sm: "100%", md: "540px" }}
          height={{ sm: "476px", md: "20rem" }}
          direction={{ base: "column", md: "row" }}
          bg={useColorModeValue("white", "gray.900")}
          boxShadow={"2xl"}
          padding={4}
        >
          <Flex flex={1} bg="blue.200">
            <Image
              objectFit="cover"
              boxSize="100%"
              alt="product image"
              src={`/images/${item.image}`}
              fit="cover"
              align="center"
            />
          </Flex>
          <Stack
            flex={1}
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            p={1}
            pt={2}
          >
            <Heading
              fontSize={"2xl"}
              fontFamily={"body"}
              wordBreak={"break-word"}
              noOfLines={2}
              title={item.title}
              textDecoration={currentState === true ? "line-through" : "none"}
            >
              {item.title}
            </Heading>
            <Text
              fontWeight={600}
              color={"gray.500"}
              size="sm"
              mb={4}
              textDecoration={currentState === true ? "line-through" : "none"}
            >
              $&nbsp;{item.price}
            </Text>
            <Text
              textAlign={"center"}
              color={useColorModeValue("gray.700", "gray.400")}
              px={3}
              textDecoration={currentState === true ? "line-through" : "none"}
            >
              Brand:{item.brand}
            </Text>
            <Text
              textAlign={"center"}
              color={useColorModeValue("gray.700", "gray.400")}
              px={3}
              textDecoration={currentState === true ? "line-through" : "none"}
            >
              Stock:{item.stock}
            </Text>

            <Stack
              width={"100%"}
              mt={"2rem"}
              direction={"row"}
              padding={2}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              {currentState === true ? (
                <Button
                  flex={1}
                  fontSize={"sm"}
                  rounded={"full"}
                  bgColor={{
                    bg: "blue.200",
                  }}
                  _focus={{
                    bg: "blue.200",
                  }}
                  _hover={{
                    bg: "blue.500",
                  }}
                  onClick={async () => {
                    try {
                      const toEnable = await fetcher(
                        "https://oldphonedeals.azurewebsites.net/user/manage/enablePhoneListing",
                        "post",
                        {
                          phoneId: item?._id,
                        }
                      );

                      handleButtonClick();
                      return toEnable;
                    } catch (err) {
                      return err;
                    }
                  }}
                >
                  Enable
                </Button>
              ) : (
                <Button
                  flex={1}
                  fontSize={"sm"}
                  rounded={"full"}
                  _focus={{
                    bg: "gray.200",
                  }}
                  _hover={{
                    bg: "gray.500",
                  }}
                  onClick={async () => {
                    // disable
                    try {
                      const toEnable = await fetcher(
                        "https://oldphonedeals.azurewebsites.net/user/manage/disablePhoneListing",
                        "post",
                        {
                          phoneId: item?._id,
                        }
                      );

                      handleButtonClick();
                      return toEnable?.message;
                    } catch (err) {
                      return err;
                    }
                  }}
                >
                  Disable
                </Button>
              )}
              <Button
                flex={1}
                fontSize={"sm"}
                rounded={"full"}
                color={"white"}
                boxShadow={
                  "0px 1px 25px -5px rgb(255 0 0 / 48%), 0 10px 10px -5px rgb(255 0 0 / 43%)"
                }
                bg={"red.400"}
                _hover={{
                  bg: "red.500",
                }}
                _focus={{
                  bg: "red.500",
                }}
                onClick={async () => {
                  // disable
                  try {
                    const toEnable = await fetcher(
                      "https://oldphonedeals.azurewebsites.net/user/manage/deletePhoneListing",
                      "post",
                      {
                        phoneId: item?._id,
                      }
                    );
                    handleButtonClick();
                    toast({
                      title: "Success",
                      description: "List removed",
                      status: "success",
                      duration: 4000,
                      isClosable: true,
                    });

                    return toEnable?.message;
                  } catch (err) {
                    toast({
                      title: "Error",
                      description: "Please try again.",
                      status: "error",
                      duration: 4000,
                      isClosable: true,
                    });
                    return err;
                  }
                }}
              >
                Remove
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Tooltip>
    </Center>
  );
};

export default EditPhoneItem;
