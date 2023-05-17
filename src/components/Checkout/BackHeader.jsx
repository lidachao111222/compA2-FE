import {
  Box,
  Flex,
  useColorModeValue,
  Stack,
  Icon,
  Button,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

export default function BackHeader() {
  const navigate = useNavigate();
  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Button
            colorScheme="blue"
            onClick={() => {
              if (window.history.state && window.history.state.idx > 0) {
                navigate(-1);
              } else {
                navigate("/", { replace: true }); 
              }
            }}
          >
            <Icon as={ArrowBackIcon} /> &nbsp; Back
          </Button>
          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}></Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
