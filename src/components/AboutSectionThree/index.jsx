import { Box, Flex, Image, Text } from "@chakra-ui/react";

const AboutSectionThree = () => {
  return (
    <Box
      width="100%"
      bgImg="/images/about_section-3.jpg"
      bgSize="cover"
      h={{ base: "550" }}
      px={{ base: "15px", md: "30px", lg: "70px", xl: "100px" }}
      // px={{
      //   base: "20px",
      //   md: "100px",
      // }}
      py={{
        base: "20px",
        md: "75px",
      }}
    >
      <Box
        p={{ base: "20px" }}
        bg="linear-gradient(0deg, rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25)), url(/images/wallpaper.jpg);"
        h={{ base: "full", md: "410px" }}
        borderRadius="24px"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Box display={{ md: "flex" }} justifyContent={{ md: "space-between" }}>
          <Box>
            <Image w="full" src="/images/about_man.png" />
          </Box>
          <Box
            pt={{ base: "20px", md: "120px" }}
            pb={{ base: "40px" }}
            textColor="#FFFFFF"
          >
            <Flex alignContent="center">
              <Box>
                {" "}
                <Image w="full" src="/images/location_icon.png" />
              </Box>
              <Text paddingLeft="21px">
                2004 Birch Crescent, SE Calgary, Alberta.
              </Text>
            </Flex>
            <Flex alignContent="center" paddingTop="30px">
              <Box>
                {" "}
                <Image w="full" src="/images/phone_icon.png" />
              </Box>
              <Text paddingLeft="21px">825 994 6504</Text>
            </Flex>
            <Flex alignContent="center" paddingTop="30px">
              <Box>
                {" "}
                <Image w="full" src="/images/whatsapp_icon.png" />
              </Box>
              <Text paddingLeft="21px">825 994 6504</Text>
            </Flex>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AboutSectionThree;
