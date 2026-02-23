import React, { useState } from "react";
import { Box, Image, Flex, Button, Icon, Text } from "@chakra-ui/react";
import { ChevronLeft, ChevronRight } from "react-iconly";
import { motion } from "framer-motion";

export default function Testimonial({ testimonialContent }) {
  const [counter, setCounter] = useState(0);

  return (
    <Box
      width="100%"
      bgImg="/images/testimonies.png"
      bgSize="cover"
      h={{ base: "1000", md: "900", lg: "600", xl: "500" }}
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection={{ base: "column", lg: "row" }}
    >
      <Box
        position="relative"
        justifyContent="center"
        display="flex"
        width="40%"
        height="100px"
        mt="50px"
      >
        <Image
          src={testimonialContent[0].img}
          objectFit="cover"
          opacity={counter === 0 && 0.5}
          position="absolute"
          width="80px"
          height="80px"
          borderRadius="50%"
          transform="rotate(90deg) translate(120px) rotate(-90deg)"
          onClick={() => setCounter(0)}
        />
        <Image
          src={testimonialContent[1].img}
          objectFit="cover"
          opacity={counter === 1 && 0.5}
          position="absolute"
          width="80px"
          height="80px"
          borderRadius="50%"
          transform="rotate(162deg) translate(120px) rotate(-162deg)"
          onClick={() => setCounter(1)}
        />
        <Image
          src={testimonialContent[2].img}
          objectFit="cover"
          opacity={counter === 2 && 0.5}
          position="absolute"
          width="80px"
          height="80px"
          borderRadius="50%"
          transform="rotate(-126deg) translate(120px) rotate(126deg)"
          onClick={() => setCounter(2)}
        />
        <Image
          src={testimonialContent[3].img}
          objectFit="cover"
          opacity={counter === 3 && 0.5}
          position="absolute"
          width="80px"
          height="80px"
          borderRadius="50%"
          transform="rotate(-54deg) translate(120px) rotate(54deg)"
          onClick={() => setCounter(3)}
        />
        <Image
          src={testimonialContent[4].img}
          objectFit="cover"
          opacity={counter === 4 && 0.5}
          position="absolute"
          width="80px"
          height="80px"
          borderRadius="50%"
          transform="rotate(18deg) translate(120px) rotate(-18deg)"
          onClick={() => setCounter(4)}
        />
      </Box>

      <Flex
        alignItems="center"
        justifyContent="center"
        width={{ base: "full", lg: "50%" }}
        gap={5}
        mt={{ base: "150px", lg: "0px" }}
      >
        <Button
          variant="ghost"
          w="0px"
          h="0px"
          colorScheme=""
          onClick={() => setCounter((currPage) => currPage - 1)}
          isDisabled={counter === 0}
          _disabled={{
            cursor: "pointer",
          }}
          opacity={counter === 0 && 0.5}
        >
          <Icon
            as={ChevronRight}
            w={20}
            h={20}
            transform="rotate(180deg)"
            color="blue.700"
          />
        </Button>

        <Flex
          bg="#FFFFFF"
          h={{ base: "420px", md: "350px" }}
          w="370px"
          rounded={24}
          textAlign="center"
          flexDirection="column"
          color="blue.700"
          p={{ base: "20px", md: "40px" }}
          gap={2}
        >
          <Image
            src={testimonialContent[counter].img}
            objectFit="cover"
            borderRadius="50%"
            h="90px"
            w="90px"
            mx="auto"
            transition="0.3s ease-in-out all"
          />
          <Text transition="0.3s ease-in-out all" fontWeight={600}>
            {testimonialContent[counter].name}
          </Text>

          <Text transition="0.3s ease-in-out all" fontWeight={600}>
            {testimonialContent[counter]?.title}
          </Text>

          <Text transition="0.3s ease-in-out all" fontWeight={500}>
            {testimonialContent[counter].content}
          </Text>
        </Flex>

        <Button
          variant="ghost"
          w="0px"
          h="0px"
          onClick={() => setCounter((currPage) => currPage + 1)}
          isDisabled={counter === 4}
          opacity={counter === 4 && 0.5}
          _disabled={{
            cursor: "pointer",
          }}
        >
          <Icon
            as={ChevronLeft}
            w={20}
            h={20}
            transform="rotate(180deg)"
            color="blue.700"
          />
        </Button>
      </Flex>
    </Box>
  );
}
