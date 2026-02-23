import React from "react";
import { Box, Flex, Text, Image, Heading } from "@chakra-ui/react";

export default function DashboardPage() {
  return (
    <Box p="30px">
      <Text fontSize={{ base: "16px", lg: "20px" }} pb="30px" fontWeight={600}>
        Welcome to Ozone Pro-Financial Services
      </Text>
      <Flex gap="30px" flexDirection={{ base: "column", md: "row" }}>
        <Flex
          bgColor="white"
          
          w={{ base: "full", md: "339px" }}
          h="157px"
          rounded={24}
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          gap={2}
        >
          <Image mx="auto" src="/images/totaltransactions.png" />

          <Text textAlign="center">Total Transaction</Text>

          <Heading textAlign="center">$ 23000</Heading>
        </Flex>
      </Flex>
    </Box>
  );
}
