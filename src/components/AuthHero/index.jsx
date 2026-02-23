import React from "react";
import { Box, Image, Text } from "@chakra-ui/react";

export default function AuthHero() {
  return (
    <Box
      overflow="hidden"
      position="relative"
      bgColor="#1C496A"
      // rounded={24}
      h="full"
      w="full"
    >
      {/* <Image
        position="absolute"
        left={5}
        right={10}
        bottom={{ lg: "20%", xl: "10%", "2xl": "15%" }}
        src="/images/manwithhandsup.png"
      /> */}

      <Box
        position="absolute"
        bottom="5"
        h="150px"
        left={{ lg: "10", xl: "20" }}
        right={{ lg: "10", xl: "20" }}
        rounded="xl"
        bgColor="white"
        display="flex"
        justifyContent="center"
        alignItems="center"
        px="20px"
        zIndex={3}
      >
        <Text textAlign="center" fontSize={{ lg: 18, xl: 20 }}>
          Join thousands of satisfied users who trust us with their financial
          needs. Sign up now to start managing your money with ease
        </Text>
      </Box>

      <Image
        h={{ xl: "600px", "4xl": "700px" }}
        // w="300px"
        position="absolute"
        top={{ lg: "15px" }}
        // left={{ lg: 10, xl: 10, "4xl": "20px" }}
        left={{
          lg: "10",
          xl: "20",
          "2xl": "30",
          "3xl": "100px",
          "4xl": "120px",
        }}
        right={{
          lg: "10",
          xl: "20",
          "2xl": "30",
          "3xl": "100px",
          "4xl": "120px",
        }}
        src="/images/auth-hero.png"
        zIndex={2}
      />
    </Box>
  );
}
