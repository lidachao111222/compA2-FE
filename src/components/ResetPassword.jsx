import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Box,
  useToast,
  Heading,
  Input,
  Button,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import fetcher from "../utils/fetch";
import { useNavigate } from "react-router-dom";

const ResetPasswordPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const code = queryParams.get("code");
  const email = queryParams.get("email");
  const toast = useToast();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");

  // TODO弹出框出现一次
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  return (
    <Box p="4rem">
      <Heading>
        Please enter your desired new password and click Submit to proceed.
      </Heading>
      <InputGroup size="md" mt="4rem">
        <Input
          pr="4.5rem"
          type={show ? "text" : "password"}
          placeholder="Enter password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={handleClick}>
            {show ? "Hide" : "Show"}
          </Button>
        </InputRightElement>
      </InputGroup>
      <Button
        colorScheme="blue"
        mt="1rem"
        w="100%"
        onClick={async () => {
          try {
            const data = await fetcher(
              "https://oldphonedeals.azurewebsites.net/auth/resetPassword",
              "post",
              {
                code: code,
                email: email,
                password: password,
              }
            );

            toast({
              title: "Success",
              description:
                "Reset password success. Redirecting to the login page. Please wait.",
              status: "success",
              duration: 3000,
              isClosable: true,
            });
            setTimeout(() => {
              navigate("/account/signin", { replace: true });
            }, 3000);
          } catch (err) {
            toast({
              title: "Error",
              description: "Please try again or login.",
              status: "error",
              duration: 3000,
              isClosable: true,
            });
          }
        }}
      >
        Submit
      </Button>
    </Box>
  );
};

export default ResetPasswordPage;
