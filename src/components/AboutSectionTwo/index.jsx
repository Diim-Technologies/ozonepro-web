import { Box, Image, Text, Flex } from "@chakra-ui/react";
export default function AboutSectionTwo() {
  return (
    <Flex
      py={{ base: "45px" }}
      flexDirection={{ base: "column", md: "row" }}
      px={{ base: "15px", md: "30px", lg: "70px", xl: "100px" }}
      // px={{ base: "10px", md: "30px", lg: "70px", xl: "100px" }}
      w="full"
      gap={{ base: 4, lg: 10 }}
      bg="#DEF1FF;"
    >
      <Box
        w={{ md: "50%" }}
        // w={{ md: "50%" }}
        display="flex"
        alignItems="center"
      >
        <Image w="full" src="/images/businesspeople.png" />
      </Box>

      <Box
        w={{ md: "50%" }}
        // w="800px"
        bgColor="#0D2F48"
        borderRadius="32px"
        textColor="white"
        display="flex"
        flexDirection="column"
        alignItems="center"
        marginTop={{ base: "70px", md: "209px" }}
        marginBottom={{ base: "50px", md: "125px" }}
      >
        <Text
          fontSize={{ base: "24px", lg: "32px", xl: "36px" }}
          mt={-10}
          bg="#D6333A;"
          // w={200}
          borderRadius="24px"
          // display="flex"
          // alignItems="center"
          mx="auto"
          paddingBlock="10px"
          paddingInline={10}
        >
          Who we are
        </Text>
        <Box textAlign="center" textColor="white">
          <Text
            pt={3}
            fontSize={{ base: "18px", md: "24px" }}
            // fontSize={{ base: "22px", md: "24px", lg: "24px", xl: "32px" }}
            // fontSize={{ base: "22px", md: "20px", lg: "20px", xl: "32px" }}
            paddingTop="50px"
            paddingBottom="40px"
            paddingInline="48px"
          >
            We are a start-up MSB seeking to grow at the pace of Compliance,
            Safety and with demonstrable Integrity.We believe that true success
            is only achieved when customers return for more transactions and
            they actively encourage their friends and family in using our
            services, whenever needed
          </Text>
        </Box>
      </Box>
    </Flex>
  );
}
