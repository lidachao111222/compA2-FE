import React, { useState } from "react";
import {
  Button,
  FormControl,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
  FormLabel,
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

export default function ForgotPassword() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  let [password, setPassword] = useState("");
  let [doubleCheckPassword, setDoubleCheckPassword] = useState("");
  const toast = useToast();
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack
        spacing={4}
        w={"full"}
        maxW={"md"}
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={12}
      >
        <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
          Reset your password
        </Heading>
        <Text
          fontSize={{ base: "sm", sm: "md" }}
          color={useColorModeValue("gray.800", "gray.400")}
        >
          Please enter your new password below:
        </Text>
        <FormControl id="current_password" isRequired>
          <FormLabel>Current password</FormLabel>
          <InputGroup mt="1rem">
            <Input
              type={showCurrentPassword ? "text" : "password"}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <InputRightElement h={"full"}>
              <Button
                variant={"ghost"}
                onClick={() =>
                  setShowCurrentPassword((showPassword) => !showPassword)
                }
              >
                {showCurrentPassword ? <ViewIcon /> : <ViewOffIcon />}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <FormControl id="new_password" isRequired>
          <FormLabel>New password</FormLabel>
          <InputGroup mt="1rem">
            <Input
              type={showNewPassword ? "text" : "password"}
              // TODO
              onChange={(e) => {
                setDoubleCheckPassword(e.target.value);
              }}
            />
            <InputRightElement h={"full"}>
              <Button
                variant={"ghost"}
                onClick={() =>
                  setShowNewPassword((showPassword) => !showPassword)
                }
              >
                {showNewPassword ? <ViewIcon /> : <ViewOffIcon />}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <Stack spacing={6}>
          <Button
            bg={"blue.400"}
            color={"white"}
            _hover={{
              bg: "blue.500",
            }}
            onClick={() => {
              if (password != doubleCheckPassword) {
                toast({
                  title: "Warning",
                  description: "Please check your input.",
                  status: "warning",
                  duration: 4000,
                  isClosable: true,
                });
                return;
              }

              if (password.length === 0 || doubleCheckPassword.lenght === 0) {
                toast({
                  title: "Warning",
                  description: "your input is empty, please check your input.",
                  status: "warning",
                  duration: 4000,
                  isClosable: true,
                });
                return;
              }
            }}
          >
            Submit
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
}
