import { Box, Flex, Heading, Text } from "@chakra-ui/react";

const AboutHero = () => {
  return (
    <Box
      display="flex"
      bgSize="cover"
      sx={{
        backgroundImage:
          "linear-gradient(255.92deg, #0D2F48 7.92%, rgba(13, 47, 72, 0.2) 98.53%), url('/images/about-hero.png')",
        // width: "100%",
        // height: "100vh",
      }}
      h={{ base: "550", md: "600", xl: "700" }}
      px={{
        base: "5",
        md: "200",
      }}
    >
      <Box
        pt="107px"
        color="#FFFFFF"
        ml={{ base: 0, md: 0, lg: 300 }}
        // ml={{ md: "300px" }}
        textAlign={{ base: "center", md: "left" }}
      >
        <Heading pb="43px">About us</Heading>
        <Text
          pb="221px"
          fontSize={{ base: "28px", md: "20px", lg: "24px", xl: "32px" }}
          // w="500px"
          textAlign={{}}
          w={{ md: "100%", lg: "68%", xl: "100%", "2xl": "60%" }}
        >
          We aim to be and be recognised as a safe and reliable Money Service
          Business (MSB) in Canada, providing best in class services with zero
          hidden fees.
        </Text>
      </Box>
    </Box>
  );
};

export default AboutHero;
