import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Link as RichLink } from "react-router-dom";
import fetcher from "../../utils/fetch";
import { useNavigate } from "react-router-dom";
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Flex minH={"90vh"} align={"center"} justify={"center"}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"6xl"}>OldPhoneDeals</Heading>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Sign up
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool service ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl id="firstName" isRequired>
                  <FormLabel>First Name</FormLabel>
                  <Input
                    type="text"
                    onChange={(e) => {
                      setFirstName(e.target.value);
                    }}
                  />
                </FormControl>
              </Box>
              <Box>
                <FormControl id="lastName" isRequired>
                  <FormLabel>Last Name</FormLabel>
                  <Input
                    type="text"
                    onChange={(e) => {
                      setLastName(e.target.value);
                    }}
                  />
                </FormControl>
              </Box>
            </HStack>
            <FormControl id="email" isRequired>
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
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  type={showPassword ? "text" : "password"}
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
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={async () => {
                  try {
                    const data = await fetcher(
                      "https://oldphonedeals.azurewebsites.net/auth/reg",
                      "post",
                      {
                        email: email,
                        firstname: firstName,
                        lastname: lastName,
                        password: password,
                      }
                    );
                    toast({
                      title: "Success",
                      description:
                        "Please check your registered email and complete the activation process. Redirecting to the login page. Please wait.",
                      status: "success",
                      duration: 3000,
                      isClosable: true,
                    });

                    setTimeout(() => {
                      navigate("/account/signin", { replace: true });
                    }, 3000);
                  } catch (error) {
                    if (error?.response?.status === 500) {
                      toast({
                        title: "Error",
                        description:
                          "You have already registered an account. Please log in directly.",
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
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                Already a user?{" "}
                <Link
                  position={"relative"}
                  color={"blue.400"}
                  as={RichLink}
                  to={`/account/signin`}
                  _hover={{
                    textDecoration: "none",
                  }}
                >
                  Login
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default SignUp;
