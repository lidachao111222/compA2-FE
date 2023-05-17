// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useToast,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Link as RichLink, useNavigate } from "react-router-dom";
import fetcher from "../../utils/fetch";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const SignIn = () => {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  return (
    <Flex minH={"90vh"} align={"center"} justify={"center"}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"6xl"} mb={"2rem"}>
            OldPhoneDeals
          </Heading>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool{" "}
            <Link
              color={"blue.400"}
              _hover={{
                textDecoration: "none",
                cursor: "default",
              }}
            >
              service
            </Link>{" "}
            ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                onBlur={() => {
                  if (!emailRegex.test(email)) {
                    toast({
                      title: "warning",
                      description: "Wrong email address.",
                      status: "warning",
                      duration: 3000,
                      isClosable: true,
                    });
                  }
                }}
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>

              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={5}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Text></Text>
                <Link
                  color={"blue.400"}
                  _hover={{
                    textDecoration: "none",
                  }}
                  as={RichLink}
                  to={`/forgot-password`}
                >
                  Forgot password?
                </Link>
              </Stack>
              <Button
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={async () => {
                  try {
                    const data = await fetcher(
                      "https://oldphonedeals.azurewebsites.net/auth/login",
                      "post",
                      {
                        email,
                        password,
                      }
                    );

                    const userDetails = await fetcher(
                      `https://oldphonedeals.azurewebsites.net/home/item/username?reviewerId=${data?.userId}`,
                      "get"
                    );

                    let firstName = userDetails?.data.firstname;
                    let lastName = userDetails?.data.lastname;
                    localStorage.setItem("firstName", firstName);
                    localStorage.setItem("lastName", lastName);
                    localStorage.setItem("userID", userDetails?.data?._id);

                    let accessToken = data?.token;
                    localStorage.setItem("accessToken", accessToken);
                    toast({
                      title: "success",
                      description: "Login successful, redirecting...",
                      status: "success",
                      duration: 3000,
                      isClosable: true,
                    });

                    setTimeout(() => {
                      if (
                        window.history.state &&
                        window.history.state.idx > 0
                      ) {
                        navigate(-1);
                      } else {
                        navigate("/", { replace: true });
                      }
                    }, 3000);
                  } catch (error) {
                    if (error?.response?.status === 500) {
                      toast({
                        title: "Error",
                        description:
                          "You need to activate your account before you can log in.",
                        status: "error",
                        duration: 3000,
                        isClosable: true,
                      });
                    } else {
                      toast({
                        title: "Error",
                        description:
                          "Login fail. Please check your info again.",
                        status: "error",
                        duration: 3000,
                        isClosable: true,
                      });
                    }
                  }
                }}
              >
                Sign In
              </Button>
              <Link position={"relative"} as={RichLink} to={`/account/signup`}>
                <Button
                  w="100%"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Sign Up
                </Button>
              </Link>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default SignIn;
