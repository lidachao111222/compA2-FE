// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
// import { useHistory } from "react-router-dom";
import {
  Flex,
  Box,
  Heading,
  Text,
  Button,
  IconButton,
  Spinner,
  useToast,
  Image,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import fetcher from "../utils/fetch";

const Checkout = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const cartItemsFromStorage = JSON.parse(localStorage.getItem("cart") || []);

  useEffect(() => {
    setCartItems(cartItemsFromStorage);
    setLoading(false);
  }, []);

  useEffect(() => {
    calculateTotalPrice(cartItems);
  }, [cartItems]);

  fetcher("https://oldphonedeals.azurewebsites.net/checkout/determineStatus", "post", {})
    .then((data) => {
      // return data;
    })
    .catch((err) => {
      // return err;
    });

  const calculateTotalPrice = (items) => {
    const totalPrice = items.reduce((acc, item) => {
      return acc + item.price * item.order;
    }, 0);
    setTotalPrice(totalPrice);
  };

  const handleQuantityChange = (id, order) => {
    let removeItemOrder = -1;

    let updatedCartItems = cartItems.map((item) => {
      if (item.id === id) {
        if (order === 0) {
          removeItemOrder = cartItems.indexOf(item);
        }
        return { ...item, order: order };
      }
      return item;
    });

    if (removeItemOrder !== -1) {
      updatedCartItems.splice(removeItemOrder, 1);
    }

    setCartItems(updatedCartItems);
    localStorage.setItem("cart", JSON.stringify(updatedCartItems));
  };

  const handleItemRemove = (id) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCartItems);
    calculateTotalPrice(updatedCartItems);
    localStorage.setItem("cart", JSON.stringify(updatedCartItems));
  };

  const handleConfirmTransaction = async () => {
    let cart = [];

    cartItems.map((item) => {
      cart.push({ phoneId: item?.id, number: item?.order });
    });

    try {
      const data = await fetcher("https://oldphonedeals.azurewebsites.net/checkout", "post", {
        cart: cart,
      });

      toast({
        title: "Transaction Successful",
        description: "Thank you for your purchase!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      localStorage.setItem("cart", JSON.stringify([]));
      setCartItems([]);
      calculateTotalPrice([]);
      navigate("/");

      return data;
    } catch (err) {
      return err;
    }
  };

  return (
    <Box m="2rem">
      {loading ? (
        <Spinner size="lg" />
      ) : (
        <>
          {cartItems.length === 0 ? (
            <Text fontSize={"2xl"}>
              Explore our inventory of used phones and find your perfect
              choices. 📱
            </Text>
          ) : (
            <Box>
              {cartItems.map((item) => (
                <Flex
                  key={item.id}
                  alignItems="center"
                  marginBottom={4}
                  borderBottom="1px solid"
                  paddingBottom={2}
                  borderColor="gray.300"
                >
                  <Image
                    rounded={"md"}
                    alt={"product image"}
                    src={`/images/${item?.brand}.jpeg`}
                    fit={"cover"}
                    align={"center"}
                    h={{ base: "100%", sm: "150px", lg: "150px" }}
                  />
                  <Box flex="1" px="2rem">
                    <Heading size="sm" marginBottom={1}>
                      {item.title}
                    </Heading>
                    <Text marginBottom={1} mt="2rem">
                      Price: ${item.price.toFixed(2)}
                    </Text>
                    <Flex alignItems="center">
                      <NumberInput
                        marginRight={2}
                        width="80px"
                        defaultValue={item.order}
                        min={0}
                        max={item.stock}
                        onChange={(valueString) => {
                          handleQuantityChange(item.id, parseInt(valueString));
                          calculateTotalPrice(cartItems);
                        }}
                      >
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    </Flex>
                  </Box>

                  <IconButton
                    aria-label="Remove"
                    icon={<CloseIcon />}
                    onClick={() => {
                      handleItemRemove(item.id);
                    }}
                  />
                </Flex>
              ))}
              <Box marginTop={4}>
                <Text fontWeight="bold">
                  Total Price: ${totalPrice.toFixed(2)}
                </Text>
              </Box>

              <Button
                marginTop={4}
                colorScheme="green"
                onClick={() => {
                  handleConfirmTransaction();
                }}
              >
                Confirm Transaction
              </Button>
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default Checkout;
