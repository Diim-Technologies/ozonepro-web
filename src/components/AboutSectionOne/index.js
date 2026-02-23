import { Box, Image, Text, Flex } from "@chakra-ui/react";
const AboutSectionOne = () => {
  return (
    <Box as="section">
      <Flex
        py={{ base: "45px" }}
        flexDirection={{ base: "column", md: "row" }}
        px={{ base: "15px", md: "30px", lg: "70px", xl: "100px" }}
        w="full"
        textColor="#0D2F48"
        // gap={{ base: 4, lg: 8 }}
        gap={{ base: "40px", md: "85px" }}
        sx={{
          backgroundImage: " url('/images/about_section-2_bg.png')",
          // w={{base:30}}
          bgRepeat: "no-repeat",
          // width: "100%",
          // height: "100vh",
        }}
      >
        <Box
          pt={{ md: "140px", base: "50px" }}
          pb={{ md: "177px" }}
          w={{ md: "50%" }}
          display="flex"
          alignItems="center"
        >
          <Image w="full" src="/images/about_ellipses.png" />
        </Box>

        <Box
          pt={{ base: "", md: "238px" }}
          pb={{ base: "50px", md: "240px" }}
          w={{ md: "50%" }}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          textAlign={{ base: "center", md: "left" }}
        >
          <Text
            fontSize={{ base: "30px", lg: "32px", xl: "36px" }}
            fontWeight={600}
          >
            Our core value
          </Text>
          <Text
            pt={3}
            fontSize={{ base: "28px", md: "24px", lg: "32px", xl: "24px" }}
            fontWeight={400}
          >
            We prioritize the needs and satisfaction of our clients above all
            else. We strive to understand their pain points, challenges, and
            goals, and develop our platform to address those needs effectively.
            We aim to provide exceptional customer service, actively listen to
            feedback, and continuously improve our platform based on user
            insights.
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default AboutSectionOne;
