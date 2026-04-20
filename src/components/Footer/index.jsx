import React, { useContext } from "react";
import {
  HStack,
  Box,
  Heading,
  Flex,
  Text,
  ListItem,
  UnorderedList,
  Image,
} from "@chakra-ui/react";
import Link from "next/link";
import { UserContext } from "../../contexts/UserContext";
import { useRouter } from "next/router";

export default function Footer() {
  const { clientPhoneNumber } = useContext(UserContext);

  const router = useRouter();

  const handleChat = () => {
    const url = `https://wa.me/${clientPhoneNumber}`;

    router.push(url);
  };
  return (
    <Box>
      <Box px={{ base: "10px", md: "30px", lg: "70px", xl: "100px" }} pt="70px">
        <Flex flexDirection={{ base: "column", md: "column" }}>
          <Image src="/images/ozone-pro-logo.png" h="46px" w="65px" mb={39} />
          <Flex flexDirection={{ base: "column", md: "row" }}>
            <Flex flexDirection={{ base: "column", md: "row" }}
              // border='1px'
              // borderColor='#FFEDDC'
              justifyContent='space-between'>
              <Flex
                flexDirection="column"
                // border='1px'
                // borderColor='#FFEDDC'
                w={{ base: "full", md: "70%" }}
                pt={{ base: "0px", md: "3px" }}
              >
                {/* <Heading pb="20px">Logo</Heading> */}
                <Text fontWeight="bold">What we do</Text>
                <Text
                  w={{ base: "full", md: "80%", lg: "80%", xl: "80%" }}
                  pt={2}
                >
                  Ozone Pro-Financial, Canada, is a Money Services Business (MSB) and it is registered and regulated with the Financial Transactions and Report Analysis Centre (FINTRAC) of Canada with registration number: M23193858.
                </Text>
              </Flex>
  <Flex
                w={{ base: "full", md: "full" }}
                flexDirection={{ base: "column", md: "row" }}
                gap='100px'
              // justifyContent="space-between"
              // mr='150px'
              >
                <Box pt={{ base: "30px", md: "0px" }}>
                  <Text fontWeight={600}>Quick Links</Text>

                  <UnorderedList>
                    <ListItem pt={4}>
                      <Link href="/money-exchange">Money Exchange</Link>
                    </ListItem>
                    <ListItem pt={4}>
                      <Link href="/accounting">Accounting</Link>
                    </ListItem>
                    <ListItem onClick={handleChat} cursor="pointer" pt={4}>
                      Chat with Us
                    </ListItem>
                  </UnorderedList>
                </Box>

                <Flex
                  flexDirection={{ base: "column", md: "row" }}
                  pt={{ base: "30px", md: "0px" }}
                  gap={{ base: "0px", md: "123px" }}
                >
                  <Box>
                    <Text fontWeight={600}>Reach out to Us</Text>

                    <HStack spacing="20px" pt={4}>
                      <Link href="#">
                        <Image
                          cursor="pointer"
                          src="/images/instagram-icon.png"
                        />
                      </Link>
                      <Link href="#">
                        <Image
                          cursor="pointer"
                          src="/images/twitter-icon.png"
                        />
                      </Link>
                      <Link href="#">
                        <Image
                          cursor="pointer"
                          src="/images/whatsapp-icon.png"
                        />
                      </Link>
                    </HStack>
                  </Box>
                  <Box>
                    <Text fontWeight={600} pt={{ base: "40px", md: "0px" }}>
                      Quick call on
                    </Text>
                    <Text pt={4}>+1825-9946-504</Text>
                  </Box>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Box>
      <Flex
        px={{ base: "10px", md: "30px", lg: "70px", xl: "100px" }}
        // pt={{ base: "20px", md: "0px" }}
        mt={{ base: "0px", md: "67px" }}
        // pb={{ base: "35px" }}
        h={{ base: "opx", md: "50px" }}
        flexDirection={{ base: "column", md: "row" }}
        justifyContent="space-between"
        alignItems={{ base: "start", md: "center" }}
        bg={{ base: "", md: "#0D2F48" }}
      >
        <Text color={{ base: "#0D2F48", md: "white" }}>
          Ozone Pro-Financial Services Сopyright © 2023
        </Text>

        <Flex gap={5} flexDirection={{ base: "column", md: "row" }}>
          <Link href="/terms">
            <Text
              pt={{ base: "10px", md: "0px" }}
              color={{ base: "#0D2F48", md: "white" }}
            >
              {" "}
              Terms & Conditions{" "}
            </Text>
          </Link>
          <Link href="/privacy">
            <Text color={{ base: "#0D2F48", md: "white" }}>
              {" "}
              Privacy Policy{" "}
            </Text>
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
}
