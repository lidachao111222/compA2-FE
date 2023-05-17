/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import {
  Heading,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  useColorModeValue,
  InputGroup,
  useDisclosure,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import useSWR from "swr";
import fetcher from "../../utils/fetch";

const ChangePassword = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  let [currentPassword, setCurrentPassword] = useState("");
  let [newPassword, setNewPassword] = useState("");

  return (
    <Flex align={"center"} justify={"center"}>
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
        <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
          Password Edit
        </Heading>

        <FormControl id="current_password" isRequired>
          <FormLabel>Current password</FormLabel>
          <InputGroup mt="1rem">
            <Input
              type={showCurrentPassword ? "text" : "password"}
              onChange={(e) => {
                setCurrentPassword(e.target.value);
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
              onChange={(e) => {
                setNewPassword(e.target.value);
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
        <Stack spacing={6} direction={["column", "row"]}>
          <Button
            bg={"blue.400"}
            color={"white"}
            w="full"
            _hover={{
              bg: "blue.500",
            }}
            // TODO
            onClick={async () => {
              if (currentPassword.length === 0 || newPassword.length === 0) {
                toast({
                  title: "Warning",
                  description: "Password shold not be empty",
                  status: "warning",
                  duration: 2000,
                  isClosable: true,
                });
                return;
              }

              try {
                const data = await fetcher(
                  "https://oldphonedeals.azurewebsites.net/auth/changePassword",
                  "post",
                  {
                    password: currentPassword,
                    newPassword: newPassword,
                  }
                );

                toast({
                  title: "Success",
                  description: "retset success.",
                  status: "success",
                  duration: 3000,
                  isClosable: true,
                });
              } catch (err) {
                toast({
                  title: "Error",
                  description: "Please try again.",
                  status: "error",
                  duration: 3000,
                  isClosable: true,
                });
              }
            }}
          >
            Update Password
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
};

export default ChangePassword;
