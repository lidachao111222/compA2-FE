/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { Heading, Box, Button, Flex, Text, useToast } from "@chakra-ui/react";
import fetcher from "../../utils/fetch";

const Comment = ({ data, handleButtonClick }) => {
  const toast = useToast();
  let currentState = Object.prototype.hasOwnProperty.call(
    data?.reviews[0],
    "hidden"
  );
  return (
    <Box>
      <Heading size="md" textTransform="uppercase">
        {data?.title}
      </Heading>
      <Text
        mt="1rem"
        textDecoration={currentState === true ? "line-through" : "none"}
      >
        {data?.reviews[0]?.comment}
      </Text>
      <Flex
        mt="1rem"
        w={"100%"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        {currentState === false ? (
          <Button
            colorScheme="yellow"
            w={"50%"}
            onClick={async () => {
              try {
                const toHidden = await fetcher(
                  "https://oldphonedeals.azurewebsites.net/user/reviews/hiddenCommentsState",
                  "post",
                  {
                    phoneId: data?._id,
                  }
                );
                handleButtonClick();
                toast({
                  title: "Success",
                  description: "The comment has been hidden.",
                  status: "success",
                  duration: 4000,
                  isClosable: true,
                });

                return toHidden;
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
            Hidden
          </Button>
        ) : (
          <Button
            colorScheme="green"
            w={"50%"}
            onClick={async () => {
              try {
                const toHidden = await fetcher(
                  "https://oldphonedeals.azurewebsites.net/user/reviews/visibleCommentsState",
                  "post",
                  {
                    phoneId: data?._id,
                  }
                );
                handleButtonClick();
                toast({
                  title: "Success",
                  description: "The comment has been show.",
                  status: "success",
                  duration: 4000,
                  isClosable: true,
                });

                return toHidden;
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
            Show
          </Button>
        )}
      </Flex>
    </Box>
  );
};

export default Comment;
