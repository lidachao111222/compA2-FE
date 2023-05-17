/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import {
  Box,
  Collapse,
  Flex,
  Button,
  useColorModeValue,
  Stack,
  useColorMode,
  useDisclosure,
  useBreakpointValue,
  IconButton,
  Text,
  Link,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Avatar,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon, HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { Link as RichLink, useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import DesktopNav from "./DesktopNav";
import ShowTools from "../../stateManagement/searchTools";

const Topbar = (props) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onToggle } = useDisclosure();
  const [showTools, setShowTools] = useAtom(ShowTools);
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("accessToken")
  );

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("firstName");
    localStorage.removeItem("lastName");
    localStorage.removeItem("userID");
    localStorage.setItem("cart", JSON.stringify([]));
    setIsLoggedIn(false);
  };

  return (
    <Box
      bg={useColorModeValue("white", "gray.800")}
      color={useColorModeValue("gray.600", "white")}
      minH={"60px"}
      py={{ base: 2 }}
      px={{ base: 4 }}
      borderBottom={1}
      borderStyle={"solid"}
      borderColor={useColorModeValue("gray.200", "gray.900")}
    >
      <Flex align={"center"}>
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex
          flex={{ base: 1 }}
          alignItems={"center"}
          justify={{ base: "center", md: "start" }}
        >
          <Text
            textAlign={useBreakpointValue({ base: "center", md: "left" })}
            fontFamily={"heading"}
            color={useColorModeValue("gray.800", "white")}
            py="1rem"
            fontSize={"xl"}
            fontWeight={600}
            cursor={"pointer"}
          >
            <Link
              as={RichLink}
              to={"/"}
              _hover={{
                textDecoration: "none",
              }}
              onClick={() => {
                setShowTools(false);
              }}
            >
              OldPhoneDeals
            </Link>
          </Text>

          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={6}
        >
          <Link position={"relative"} as={RichLink} to={`/checkout`}>
            <Button
              h="100%"
              fontSize={"sm"}
              fontWeight={400}
              _hover={{
                textDecoration: "none",
              }}
            >
              Checkout
            </Button>
          </Link>

          {isLoggedIn ? (
            <SignOutButton handleLogout={handleLogout}></SignOutButton>
          ) : (
            <Link position={"relative"} as={RichLink} to={`/account/signin`}>
              <Button
                display={{ base: "none", md: "inline-flex" }}
                fontSize={"sm"}
                fontWeight={600}
                color={"white"}
                bg={"pink.400"}
                _hover={{
                  bg: "pink.300",
                }}
              >
                Sign In
              </Button>
            </Link>
          )}

          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          </Button>
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        {/* <MobileNav /> */}
      </Collapse>
    </Box>
  );
};

function SignOutButton({ handleLogout }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  return (
    <>
      <Flex alignItems={"center"}>
        <Button
          onClick={onOpen}
          display={{ base: "none", md: "inline-flex" }}
          fontSize={"sm"}
          fontWeight={600}
          color={"white"}
          bg={"pink.400"}
          _hover={{
            bg: "pink.300",
          }}
        >
          Sign Out
        </Button>
        <Link
          as={RichLink}
          to={"/user"}
          _hover={{
            textDecoration: "none",
          }}
        >
          <Avatar
            cursor={"pointer"}
            name={`${localStorage.getItem("firstName")} ${localStorage.getItem(
              "lastName"
            )}`}
            size={"sm"}
            ml="1rem"
            src="https://xsgames.co/randomusers/avatar.php?g=female"
          />
        </Link>
      </Flex>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Logout</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Are you sure you want to log out?</ModalBody>
          <ModalFooter>
            <Button mr="1rem" onClick={onClose}>
              No
            </Button>
            <Button
              display={{ base: "none", md: "inline-flex" }}
              fontSize={"sm"}
              fontWeight={600}
              color={"white"}
              bg={"pink.400"}
              _hover={{
                bg: "pink.300",
              }}
              onClick={() => {
                handleLogout();
                onClose();
                navigate(0);
              }}
            >
              Yes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Topbar;
