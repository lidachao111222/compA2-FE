/* eslint-disable react/jsx-no-duplicate-props */
import { Heading, Flex, Box, Spinner } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionSpan = motion.span;

const MotionHeading = motion(Heading);

const Loading = () => {
  return (
    <Flex
      flexDir={"column"}
      justifyContent={"center"}
      mt={"40vh"}
      alignItems={"center"}
    >
      <Box>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Box>
      <MotionHeading
        variants={{
          animate: {
            color: ["#2B6CB0", "#EC4899", "#FDBA74"],
            transition: {
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse",
            },
          },
        }}
        animate="animate"
      >
        {Array.from("loading...").map((letter, index) => (
          <MotionSpan
            key={index}
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            variants={{
              animate: {
                color: ["#2B6CB0", "#EC4899", "#FDBA74"],
                transition: {
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse",
                },
              },
            }}
          >
            {letter}
          </MotionSpan>
        ))}
      </MotionHeading>
    </Flex>
  );
};

export default Loading;
