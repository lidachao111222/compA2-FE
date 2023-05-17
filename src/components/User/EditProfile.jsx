/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import {
  Heading,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Text,
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import fetcher from "../../utils/fetch";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// eslint-disable-next-line react/prop-types
const EditProfile = ({ data }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);
  let [password, setPassword] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    setFirstName(data?.firstName || "");
    setLastName(data?.lastName || "");
    setEmail(data?.email || "");
  }, [data]);

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
          User Profile Edit
        </Heading>

        <FormControl id="firstName" isRequired>
          <FormLabel>First name</FormLabel>
          <Input
            _placeholder={{ color: "gray.500" }}
            type="text"
            defaultValue={data?.firstName}
            onBlur={(e) => {
              if (e.target.value === "") {
                e.target.value = data?.firstName;
              }
            }}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
        </FormControl>
        <FormControl id="lastName" isRequired>
          <FormLabel>Last name</FormLabel>
          <Input
            _placeholder={{ color: "gray.500" }}
            type="text"
            defaultValue={data?.lastName}
            onBlur={(e) => {
              if (e.target.value === "") {
                e.target.value = data?.lastName;
              }
            }}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
        </FormControl>
        <FormControl id="email" isRequired>
          <FormLabel>Email address</FormLabel>
          <Input
            defaultValue={data?.email}
            _placeholder={{ color: "gray.500" }}
            type="text"
            onBlur={(e) => {
              if (e.target.value === "") {
                e.target.value = data?.email;
              }

              if (!emailRegex.test(email) && email != "") {
                toast({
                  title: "warning",
                  description: "Wrong email address.",
                  status: "warning",
                  duration: 3000,
                  isClosable: true,
                });
              }
            }}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </FormControl>
        <Stack spacing={6} direction={["column", "row"]}>
          <Button
            bg={"blue.400"}
            color={"white"}
            w="full"
            _hover={{
              bg: "blue.500",
            }}
            onClick={onOpen}
          >
            Update profile
          </Button>
          <Modal onClose={onClose} isOpen={isOpen} isCentered>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Password Check</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Text>Please enter your password to update profile</Text>
                <InputGroup mt="1rem">
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
              </ModalBody>
              <ModalFooter>
                <Button onClick={onClose} mr="1rem">
                  Close
                </Button>
                <Button
                  onClick={async () => {
                    onClose();

                    // check empty problem
                    if (firstName == "") {
                      setFirstName(data?.firstName);
                    }

                    if (lastName == "") {
                      setLastName(data?.lastName);
                    }
                    if (email == "") {
                      setEmail(data?.email);
                    }

                    try {
                      const data = await fetcher(
                        "https://oldphonedeals.azurewebsites.net/user/verifyPassword",
                        "post",
                        { password: password }
                      );
                    } catch (err) {
                      toast({
                        title: "Error",
                        description: "Wrong password, please try again.",
                        status: "error",
                        duration: 4000,
                        isClosable: true,
                      });
                      return "";
                    }
                    try {
                      const changeFeedback = await fetcher(
                        "https://oldphonedeals.azurewebsites.net/user/editProfile",
                        "post",
                        {
                          firstname: firstName,
                          lastname: lastName,
                          email: email,
                        }
                      );

                      localStorage.setItem("firstName", firstName);
                      localStorage.setItem("lastName", lastName);
                      toast({
                        title: "Success",
                        description: "Info saved",
                        status: "success",
                        duration: 4000,
                        isClosable: true,
                      });
                    } catch (err) {
                      toast({
                        title: "Error",
                        description: "Wrong password, please try again.",
                        status: "error",
                        duration: 4000,
                        isClosable: true,
                      });
                    }
                  }}
                  colorScheme="blue"
                >
                  Update
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Stack>
      </Stack>
    </Flex>
  );
};

export default EditProfile;
