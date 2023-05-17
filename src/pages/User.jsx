/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Heading,
  Box,
  Button,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import fetcher from "../utils/fetch";
import EditProfile from "../components/User/EditProfile";
import ChangePassword from "../components/User/ChangePassword";
import ManageListings from "../components/User/ManageListings";
import ViewComments from "../components/User/ViewComments";

const User = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  fetcher("https://oldphonedeals.azurewebsites.net/user/getUserInfo", "post", {}).then((data) => {
    setEmail(data?.data?.email);
    setFirstName(data?.data?.firstname);
    setLastName(data?.data?.lastname);
  });

  return (
    <Box m="4rem">
      <Heading mb="2rem">User Profile</Heading>
      <Tabs isFitted variant="enclosed">
        <TabList mb="1em">
          <Tab>
            <Heading fontSize={"2xl"}>Edit Profile</Heading>
          </Tab>
          <Tab>
            <Heading fontSize={"2xl"}>Change password</Heading>
          </Tab>
          <Tab>
            <Heading fontSize={"2xl"}> Manage listings</Heading>
          </Tab>
          <Tab>
            <Heading fontSize={"2xl"}> View comments</Heading>
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <EditProfile data={{ email, firstName, lastName }}></EditProfile>
          </TabPanel>
          <TabPanel>
            <ChangePassword></ChangePassword>
          </TabPanel>
          <TabPanel>
            <ManageListings></ManageListings>
          </TabPanel>
          <TabPanel>
            <ViewComments></ViewComments>
          </TabPanel>
        </TabPanels>
      </Tabs>
      <Button
        w="100%"
        colorScheme="red"
        onClick={() => {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("firstName");
          localStorage.removeItem("lastName");
          localStorage.removeItem("userID");
          localStorage.setItem("cart", JSON.stringify([]));
          navigate("/", { replace: true });
        }}
      >
        Sign Out
      </Button>
    </Box>
  );
};

export default User;
