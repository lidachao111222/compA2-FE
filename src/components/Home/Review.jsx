/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Box, Text, Button, useToast } from "@chakra-ui/react";
import useSWR from "swr";
import fetcher from "../../utils/fetch";
import { Rating } from "@smastrom/react-rating";
import { useParams } from "react-router-dom";

const MAX_COMMENT_LENGTH = 200;

const Review = ({ data, canEdit = false, handleButtonClick }) => {
  const toast = useToast();
  const { phoneid } = useParams();
  const [showAll, setShowAll] = useState(false);

  const truncatedComment = showAll
    ? data.comment
    : data.comment.slice(0, MAX_COMMENT_LENGTH);

  const shouldShowButton = data.comment.length > MAX_COMMENT_LENGTH;

  //   call after first swr , get full name
  const { data: buyer } = useSWR(
    data
      ? `https://oldphonedeals.azurewebsites.net/home/item/username?reviewerId=${data.reviewer}`
      : null,
    (url) => fetcher(url, "get"),
    { revalidateOnMount: true }
  );

  let firstName = buyer?.data?.firstname;
  let lastName = buyer?.data?.lastname;

  return (
    <Box
      textDecor={
        Object.prototype.hasOwnProperty.call(data, "hidden") === true
          ? "line-through"
          : "none"
      }
    >
      <Text pt="2" fontSize="sm" fontWeight={"semibold"}>
        {firstName}&nbsp;{lastName}{" "}
        {canEdit ? (
          <Button
            size={"xs"}
            colorScheme={
              Object.prototype.hasOwnProperty.call(data, "hidden") === true
                ? "blue"
                : "red"
            }
            onClick={async () => {
              if (
                Object.prototype.hasOwnProperty.call(data, "hidden") === true
              ) {
                try {
                  const visibleCommentsState = await fetcher(
                    "https://oldphonedeals.azurewebsites.net/home/item/visibleCommentsState",
                    "post",
                    {
                      phoneId: phoneid,
                      reviewer: data?.reviewer,
                    }
                  );
                  toast({
                    title: "success",
                    description: "The comment is show.",
                    status: "success",
                    duration: 1000,
                    isClosable: true,
                  });
                } catch (err) {
                  console.log(err);
                }
              } else {
                try {
                  const hiddenCommentsState = await fetcher(
                    "https://oldphonedeals.azurewebsites.net/home/item/hiddenCommentsState",
                    "post",
                    {
                      phoneId: phoneid,
                      reviewer: data?.reviewer,
                    }
                  );
                  toast({
                    title: "success",
                    description: "The comment is hidden.",
                    status: "success",
                    duration: 1000,
                    isClosable: true,
                  });
                } catch (err) {
                  console.log(err);
                }
              }

              handleButtonClick();
            }}
          >
            {Object.prototype.hasOwnProperty.call(data, "hidden") === true
              ? "Show"
              : "Hidden"}
          </Button>
        ) : (
          <></>
        )}
        {canEdit === false &&
        data?.reviewer === localStorage.getItem("userID") ? (
          <Button
            size={"xs"}
            colorScheme={
              Object.prototype.hasOwnProperty.call(data, "hidden") === true
                ? "blue"
                : "red"
            }
            onClick={async () => {
              if (
                Object.prototype.hasOwnProperty.call(data, "hidden") === true
              ) {
                try {
                  const visibleCommentsState = await fetcher(
                    "https://oldphonedeals.azurewebsites.net/home/item/visibleCommentsState",
                    "post",
                    {
                      phoneId: phoneid,
                      reviewer: data?.reviewer,
                    }
                  );
                  toast({
                    title: "success",
                    description: "The comment is show.",
                    status: "success",
                    duration: 1000,
                    isClosable: true,
                  });
                } catch (err) {
                  console.log(err);
                }
              } else {
                try {
                  const hiddenCommentsState = await fetcher(
                    "https://oldphonedeals.azurewebsites.net/home/item/hiddenCommentsState",
                    "post",
                    {
                      phoneId: phoneid,
                      reviewer: data?.reviewer,
                    }
                  );
                  toast({
                    title: "success",
                    description: "The comment is hidden.",
                    status: "success",
                    duration: 1000,
                    isClosable: true,
                  });
                } catch (err) {
                  console.log(err);
                }
              }

              handleButtonClick();
            }}
          >
            {Object.prototype.hasOwnProperty.call(data, "hidden") === true
              ? "Show"
              : "Hidden"}
          </Button>
        ) : (
          <></>
        )}
      </Text>
      <Box pt="2">
        <Rating
          style={{ maxWidth: 100 }}
          readOnly
          value={data.rating}
          key={data.rating}
        />
      </Box>
      <Text pt="2" fontSize="sm" wordBreak={"break-word"}>
        {truncatedComment}
        {shouldShowButton && (
          <Button size="xs" onClick={() => setShowAll(!showAll)}>
            {showAll ? "show less" : "show more"}
          </Button>
        )}
      </Text>
    </Box>
  );
};

export default Review;
