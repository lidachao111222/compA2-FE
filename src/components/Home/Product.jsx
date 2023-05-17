/* eslint-disable react/prop-types */
import {
  Box,
  useColorModeValue,
  Stack,
  Image,
  Stat,
  StatNumber,
  Tooltip,
  Heading,
  Link,
} from "@chakra-ui/react";
import { Rating } from "@smastrom/react-rating";
import { Link as RichLink } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const Product = ({ item, tag }) => {
  return (
    <Link
      as={RichLink}
      to={`/phones/${item?._id}`}
      _hover={{
        textDecoration: "none",
      }}
    >
      <Tooltip
        label={item?.title}
        placement="auto"
        closeDelay={500}
        hasArrow
        arrowSize={15}
      >
        <Box
          cursor={"pointer"}
          display={"inline-block"}
          role={"group"}
          p={6}
          maxW={"330px"}
          w={"full"}
          h={"full"}
          bg={useColorModeValue("white", "gray.800")}
          boxShadow={"2xl"}
          rounded={"lg"}
          pos={"relative"}
          zIndex={1}
          transition={["color 0.2s ease"]}
          _hover={{
            color: "#ff8800",
          }}
        >
          <Box
            rounded={"lg"}
            pos={"relative"}
            height={"200px"}
            _after={{
              transition: "all .3s ease",
              content: '""',
              w: "full",
              h: "full",
              pos: "absolute",
              top: 5,
              left: 0,
              backgroundImage: `/images/${item?.image}`,
              filter: "blur(15px)",
              zIndex: -1,
            }}
            _groupHover={{
              _after: {
                filter: "blur(20px)",
              },
            }}
          >
            <Image
              rounded={"lg"}
              height={230}
              width={282}
              objectFit={"cover"}
              src={`/images/${item?.image}`}
            />
          </Box>
          {/* soldOut */}
          {tag === "soldOut" ? (
            <Box pt={10}>
              <Heading
                textAlign={"center"}
                fontSize={"xl"}
                fontFamily={"body"}
                fontWeight={500}
                noOfLines={2}
                wordBreak={"break-word"}
                title={item?.title}
              >
                {item?.title}
              </Heading>
              <Stack align={"center"}>
                <Stat>
                  <StatNumber
                    fontSize={"2xl"}
                    fontFamily={"body"}
                    fontWeight={500}
                    noOfLines={3}
                    wordBreak={"break-word"}
                    title={item?.price}
                    mt={".5rem"}
                  >
                    $&nbsp;{item?.price}
                  </StatNumber>
                </Stat>
              </Stack>
            </Box>
          ) : // search
          tag === "search" ? (
            <>
              <Stack pt={10} align={"center"}>
                <Stat>
                  <Heading
                    textAlign={"center"}
                    fontSize={"xl"}
                    fontFamily={"body"}
                    fontWeight={500}
                    noOfLines={2}
                    wordBreak={"break-word"}
                    title={item?.title}
                  >
                    {item?.title}
                  </Heading>
                  <StatNumber
                    textAlign={"center"}
                    fontSize={"3xl"}
                    fontFamily={"body"}
                    fontWeight={500}
                    noOfLines={2}
                    wordBreak={"break-word"}
                    title={item?.price}
                    mt={".5rem"}
                  >
                    $&nbsp;{item?.price}
                  </StatNumber>
                </Stat>
              </Stack>
            </>
          ) : (
            // display
            <Box pt={10}>
              <Heading
                textAlign={"center"}
                fontSize={"xl"}
                fontFamily={"body"}
                fontWeight={500}
                noOfLines={2}
                wordBreak={"break-word"}
                title={item?.title}
              >
                {item?.title}
              </Heading>
              <Stack align={"center"} mt="1rem">
                <Rating
                  style={{ maxWidth: 120 }}
                  readOnly
                  value={item?.averageRating}
                  key={item?.averageRating}
                />
              </Stack>
            </Box>
          )}
        </Box>
      </Tooltip>
    </Link>
  );
};

export default Product;
