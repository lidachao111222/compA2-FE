/* eslint-disable no-unused-vars */
import React from "react";
import {
  Heading,
  Stack,
  Card,
  CardHeader,
  CardBody,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import useSWR from "swr";
import Comment from "./Comment";
import fetcher from "../../utils/fetch";

const ViewComments = () => {
  const { data, error, isLoading, mutate } = useSWR(
    "https://oldphonedeals.azurewebsites.net/user/reviews/viewReviews",
    (url) => fetcher(url, "post"),
    { revalidateOnMount: true }
  );

  const handleButtonClick = () => {
    mutate("https://oldphonedeals.azurewebsites.net/user/manage/getPhoneListings", true);
  };

  return (
    <>
      {" "}
      <Card mb="2rem">
        <CardHeader>
          <Heading size="lg">List of comments:</Heading>
        </CardHeader>

        <CardBody>
          <Stack divider={<StackDivider />} spacing="4">
            {data?.data?.length === 0 ? (
              <Text>👋 There is no comment yet.</Text>
            ) : (
              data?.data?.map((item) => {
                return (
                  <Comment
                    key={item?._id}
                    data={item}
                    handleButtonClick={handleButtonClick}
                  ></Comment>
                );
              })
            )}
          </Stack>
        </CardBody>
      </Card>
    </>
  );
};

export default ViewComments;
