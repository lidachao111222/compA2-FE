import React from "react";
import { useLocation } from "react-router-dom";
import { Box, useToast, Heading, Spinner, Center } from "@chakra-ui/react";
import fetcher from "../utils/fetch";
import { useNavigate } from "react-router-dom";

const Active = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const code = queryParams.get("code");
  const email = queryParams.get("email");
  const toast = useToast();
  const navigate = useNavigate();

  fetcher("https://oldphonedeals.azurewebsites.net/auth/active", "post", {
    code: code,
    email: email,
  })
    .then((data) => {
      toast.closeAll();
      toast({
        title: "Success",
        description:
          "Activation successful. Redirecting to the login page. Please wait.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      setTimeout(() => {
        navigate("/account/signin", { replace: true });
      }, 3000);
    })
    .catch((err) => {
      toast.closeAll();
      toast({
        title: "Error",
        description: "Please try again or login",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    });

  return (
    <Box p="4rem">
      <Heading>Please wait while your account is being activated... </Heading>
      <Center mt="2rem">
        {" "}
        <Spinner color="red.500" size={"xl"} />
      </Center>
    </Box>
  );
};

export default Active;
