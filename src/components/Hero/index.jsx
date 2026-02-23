import React from "react";
import { Box, Heading, Text, Flex } from "@chakra-ui/react";
import { CustomButton } from "../../components/Button";
import Link from "next/link";

export default function Hero() {
  return (
    <Box
      width="100%"
      bgImg="/images/herobg.png"
      bgSize="cover"
      h={{ base: "550", md: "600", xl: "700" }}
      px={{
        base: "5",
        // md: "200"
      }}
      textAlign="center"
    >
      <Heading
        pt={{
          base: "100px",
          md: "145px",
          xl: "175px",
        }}
        fontWeight={700}
        fontSize={{ base: "35px", md: "50px", lg: "60px", xl: "72px" }}
        textColor="offwhite"
      >
        Ozone Pro-Financial Services
      </Heading>

      <Text
        textColor="offwhite"
        fontSize={{ md: "20px", lg: "24px", xl: "32px" }}
        w={{ md: "75%", lg: "68%", xl: "64%", "2xl": "60%" }}
        mx="auto"
        pt={{
          base: "5",
          md: "30px",
        }}
      >
       Simplify Your Financial and Accounting 
Needs.
General Accounting, Bookkeeping, Tax 
filing, &
Limited Currency Exchange Service
      </Text>

      <Flex
        pt={{
          base: "5",
          md: "45px",
        }}
        w={{ base: "full", md: "70%", lg: "60%", xl: "40%" }}
        mx="auto"
        gap={{ base: 4, lg: 8 }}
        flexDirection={{ base: "column", md: "row" }}
        justifyContent="center"
      >
        <CustomButton w="220px" route="/accounting" bg="primary.500">
          Accounting
        </CustomButton>

        <CustomButton w="220px" route="/money-exchange" variant="outline">
          Money Exchange
        </CustomButton>
      </Flex>
    </Box>
  );
}
