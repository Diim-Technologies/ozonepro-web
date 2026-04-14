import React, { useContext, useEffect, useState } from "react";
import {
  Heading,
  Box,
  Flex,
  Text,
  Image,
  Input,
  UnorderedList,
  ListItem,
  Grid,
  GridItem,
  VStack,
  HStack,
  Container,
  SimpleGrid,
  Badge,
} from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

import { CustomButton } from "../../components/Button";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Hero from "../../components/Hero";
import ExchangeCalculator from "../../components/ExchangeCalculator";
import { useRouter } from "next/router";
import { UserContext } from "../../contexts/UserContext";
import exchangeCalculatorHooks from "../../components/ExchangeCalculator/hooks";

export default function HomePage() {
  const { comingSoonPairs } = exchangeCalculatorHooks()
  const [firstPairsArray,setFirstPairsArray] = useState([])
  const [secondPairsArray,setSecondPairsArray] = useState([])


  useEffect(() => {
    if (comingSoonPairs) {
    const firstData = comingSoonPairs['data'].map(pair => 
      pair.substring(0,3)
    )
    setFirstPairsArray(firstData)
    const secondData = comingSoonPairs['data'].map(pair => 
      pair.substring(pair.length - 3)
    )
    setSecondPairsArray(secondData)
    }

  },[comingSoonPairs])
  const router = useRouter();
  const { clientPhoneNumber } = useContext(UserContext);
  const handleChat = (event) => {
    event.preventDefault();

    const url = `https://wa.me/${clientPhoneNumber}`;

    router.push(url);
  };
  return (
    <>
      <Navbar />
      <Hero />
      <Flex
        py={{ base: "45px" }}
        flexDirection={{ base: "column", md: "row" }}
        px={{ base: "10px", md: "30px", lg: "70px", xl: "100px" }}
        w="full"
        gap={{ base: 4, lg: 8 }}
        bg="blue.50"
      >
        <Box w={{ md: "50%" }} display="flex" alignItems="center">
          <Image w="full" src="/images/womenwithipad.png" />
        </Box>

        <Box
          w={{ md: "50%" }}
          display="flex"
          flexDirection="column"
          justifyContent="center"
        >
          <Text
            fontSize={{ base: "24px", lg: "32px", xl: "36px" }}
            textColor="primary.500"
          >
            About us
          </Text>
          <Text
            pt={3}
            fontSize={{ base: "28px", md: "24px", lg: "32px", xl: "36px" }}
            fontWeight={600}
          >
            Our company is dedicated to providing a comprehensive and
            user-friendly platform for managing your financial and accounting
            needs.
          </Text>

          <Text
            pt={{ base: "20px", lg: "45px" }}
            pb={2}
            fontSize={{ base: "16px", lg: "20px" }}
            textColor="blue.800"
          >
            At our core, we believe in:
          </Text>

          <UnorderedList fontSize={{ base: "16px", lg: "20px" }} pl={3}>
            <ListItem textColor="blue.800" pt={4}>
              Providing transparent and reliable financial services to our
              clients.
            </ListItem>
            <ListItem textColor="blue.800" pt={4}>
              Ensuring the security and privacy of all financial data and
              transactions.
            </ListItem>
            <ListItem textColor="blue.800" pt={4}>
              Continuously improving and innovating our platform to better serve
              our clients' needs
            </ListItem>
          </UnorderedList>
        </Box>
      </Flex>

      {/* Products Features Section */}
      <Box py={{ base: "80px", lg: "120px" }} bg="white">
        <Container maxW="container.xl">
          <VStack spacing={16} align="stretch">
            <VStack spacing={4} textAlign="center">
              <Text
                fontSize="sm"
                fontWeight="700"
                color="primary.500"
                letterSpacing="widest"
                textTransform="uppercase"
              >
                Our Solutions
              </Text>
              <Heading fontSize={{ base: "3xl", md: "5xl" }} color="blue.900">
                Product Features
              </Heading>
              <Text color="gray.500" fontSize="lg" maxW="700px">
                Comprehensive financial tools designed to empower your personal and business growth.
              </Text>
            </VStack>

            <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={12}>
              {/* Money Exchange Feature */}
              <MotionBox
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
                p={{ base: 8, md: 12 }}
                bg="blue.50"
                rounded="3xl"
                position="relative"
                overflow="hidden"
              >
                <VStack align="start" spacing={6} position="relative" zIndex={1}>
                  <Image src="/images/blue_dollar.png" h="60px" />
                  <VStack align="start" spacing={3}>
                    <Heading size="xl" color="blue.900">Money Exchange</Heading>
                    <Text color="blue.800" fontSize="lg">
                      Easily convert currencies for international transactions and keep
                      track of your finances in multiple currencies.
                    </Text>
                  </VStack>
                  
                  <CustomButton
                    route="/money-exchange"
                    w="220px"
                    bg="primary.500"
                    boxShadow="0 10px 20px -5px rgba(214, 51, 58, 0.4)"
                  >
                    Start Exchanging
                  </CustomButton>

                  {/* Coming Soon Section */}
                  <Box w="full" pt={6}>
                    <Flex 
                      bg="white" 
                      p={6} 
                      rounded="2xl" 
                      boxShadow="sm"
                      direction="column"
                      gap={4}
                    >
                      <HStack justify="space-between">
                        <Text fontWeight="800" color="primary.500" fontSize="sm">COMING SOON PAIRS</Text>
                        <Badge colorScheme="red" variant="subtle" rounded="full" px={3}>Beta</Badge>
                      </HStack>
                      <Flex gap={4} justify="center" align="center">
                        <VStack spacing={2} align="end">
                          {firstPairsArray.slice(0, 3).map((pair, i) => (
                            <Text key={i} fontWeight="600" color="blue.900" fontSize="md">{pair}</Text>
                          ))}
                        </VStack>
                        <Image src="/images/comingsoon-pairs.svg" h="40px" />
                        <VStack spacing={2} align="start">
                          {secondPairsArray.slice(0, 3).map((pair, i) => (
                            <Text key={i} fontWeight="600" color="blue.900" fontSize="md">{pair}</Text>
                          ))}
                        </VStack>
                      </Flex>
                    </Flex>
                  </Box>
                </VStack>
                {/* Decoration */}
                <Box position="absolute" bottom="-20px" right="-20px" opacity={0.1}>
                  <Image src="/images/blue_dollar.png" h="200px" transform="rotate(-15deg)" />
                </Box>
              </MotionBox>

              {/* Accounting Feature */}
              <MotionBox
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
                p={{ base: 8, md: 12 }}
                bg="primary.50"
                rounded="3xl"
                position="relative"
                overflow="hidden"
              >
                <VStack align="start" spacing={6} position="relative" zIndex={1} h="full">
                  <Image src="/images/green_dollar.png" h="60px" />
                  <VStack align="start" spacing={3}>
                    <Heading size="xl" color="blue.900">Accounting</Heading>
                    <Text color="blue.800" fontSize="lg">
                      Simplify your financial and accounting needs. General Accounting,
                      Bookkeeping, Tax filing & Limited Currency Exchange Service.
                    </Text>
                  </VStack>
                  
                  <CustomButton 
                    route="/accounting" 
                    w="220px" 
                    bg="primary.500"
                    boxShadow="0 10px 20px -5px rgba(214, 51, 58, 0.4)"
                  >
                    Accounting
                  </CustomButton>

                  <Box w="full" mt="auto" pt={8}>
                    <Image w="full" src="/images/bookkeeping.svg" rounded="2xl" />
                  </Box>
                </VStack>
                {/* Decoration */}
                <Box position="absolute" bottom="-20px" right="-20px" opacity={0.1}>
                  <Image src="/images/green_dollar.png" h="200px" transform="rotate(-15deg)" />
                </Box>
              </MotionBox>
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>
      {/* End Products Features Section */}

      <Box
        h={{
          base: "1250px",
          md: "1300px",
          lg: "830px",
          xl: "1000px",
          "2xl": "900px",
        }}
        bg="primary.50"
        px={{ base: "10px", md: "30px", lg: "70px", xl: "100px" }}
        overflow="hidden"
        position="relative"
      >
        <Heading
          fontSize={{ base: "24px", lg: "32px", xl: "48px" }}
          py="20px"
          w={{ md: "65%", lg: "65%", xl: "65%" }}
        >
          Using Ozone Pro-Financial Services you can enjoy a range of benefits
        </Heading>
        <Box overflow="hidden">
          <Image
            position="absolute"
            bottom={{ lg: "-50px" }}
            left={{ base: "-15px", md: "-100", lg: "-280px" }}
            src="/images/usingozone.png"
          />
        </Box>

        <Box
          ml={{ lg: "400px", xl: "500px" }}
          mt={{ base: " 21.875em", md: "650px", lg: "50px" }}
        >
          <Grid
            h="500px"
            templateRows={{ base: "repeat(5, 1fr)", md: "repeat(3, 1fr)" }}
            templateColumns={{ base: "full", md: "repeat(4, 1fr)" }}
            gap={{ base: "20px", md: "30px", xl: "30px", "2xl": "60px" }}
          >
            <GridItem colSpan={2}>
              <Text
                fontSize={{ lg: "20px", xl: "22px", "2xl": "24px" }}
                pb="20px"
              >
                Time $ Money
              </Text>
              <Box display="flex" gap="10px">
                <Flex
                  h="64px"
                  w="64px"
                  border="2px"
                  borderColor="primary.200"
                  rounded="full"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Image h="25px" w="20px" src="/images/time&money.png" />
                </Flex>
                <Text
                  w="70%"
                  textColor="primary.300"
                  fontSize={{ lg: "16px", xl: "18px", "2xl": "20px" }}
                >
                  Saving time and money by using a single platform for all your
                  financial management needs.
                </Text>
              </Box>
            </GridItem>
            <GridItem colSpan={2}>
              <Text
                fontSize={{ lg: "20px", xl: "22px", "2xl": "24px" }}
                pb="20px"
              >
                Financial Records
              </Text>
              <Box display="flex" gap="10px">
                <Flex
                  h="64px"
                  w="64px"
                  border="2px"
                  borderColor="primary.200"
                  rounded="full"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Image h="20px" w="20px" src="/images/financials.png" />
                </Flex>
                <Text
                  w="70%"
                  textColor="primary.300"
                  fontSize={{ lg: "16px", xl: "18px", "2xl": "20px" }}
                >
                  Streamlining your financial records and ensuring compliance
                  with tax and accounting laws and regulations
                </Text>
              </Box>
            </GridItem>
            <GridItem colSpan={2}>
              <Text
                fontSize={{ lg: "20px", xl: "22px", "2xl": "24px" }}
                pb="20px"
              >
                Analytics Reports
              </Text>
              <Box display="flex" gap="10px">
                <Flex
                  h="64px"
                  w="64px"
                  border="2px"
                  borderColor="primary.200"
                  rounded="full"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Image h="20px" w="20px" src="/images/analytics.png" />
                </Flex>
                <Text
                  w="70%"
                  textColor="primary.300"
                  fontSize={{ lg: "16px", xl: "18px", "2xl": "20px" }}
                >
                  Making data-driven decisions using our analytics and reporting
                  tools.
                </Text>
              </Box>
            </GridItem>
            <GridItem colSpan={2}>
              <Text
                fontSize={{ lg: "20px", xl: "22px", "2xl": "24px" }}
                pb="20px"
              >
                Customer Support
              </Text>
              <Box display="flex" gap="10px">
                <Flex
                  h="64px"
                  w="64px"
                  border="2px"
                  borderColor="primary.200"
                  rounded="full"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Image h="25px" w="20px" src="/images/customer.png" />
                </Flex>
                <Text
                  w="70%"
                  textColor="primary.300"
                  fontSize={{ lg: "16px", xl: "18px", "2xl": "20px" }}
                >
                  Accessing world-class customer support and assistance,
                  whenever you need it
                </Text>
              </Box>
            </GridItem>
            <GridItem colStart={{ md: 2, lg: 3 }} colSpan={2}>
              <Text
                fontSize={{ lg: "20px", xl: "22px", "2xl": "24px" }}
                pb="20px"
              >
                Real time exchange rates
              </Text>
              <Box display="flex" gap="10px">
                <Flex
                  h="64px"
                  w="64px"
                  border="2px"
                  borderColor="primary.200"
                  rounded="full"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Image h="20px" w="20px" src="/images/exchange.png" />
                </Flex>
                <Text
                  w="70%"
                  textColor="primary.300"
                  fontSize={{ lg: "16px", xl: "18px", "2xl": "20px" }}
                >
                  Staying up-to-date with real-time exchange rates and market
                  trends
                </Text>
              </Box>
            </GridItem>
          </Grid>
        </Box>
      </Box>

      <Box
        width="100%"
        bgImg="/images/signup_bg.png"
        bgSize="cover"
        h={{ base: "550" }}
        px={{
          base: "20px",
          md: "100px",
        }}
        py={{
          base: "20px",
          md: "75px",
        }}
      >
        <Box
          p={{ base: "20px" }}
          bg="blue.300"
          h={{ base: "full", md: "410px" }}
          borderRadius="24px"
          textAlign="center"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Text
            w={{ lg: "80%" }}
            fontWeight={600}
            fontSize={{ base: "24px", lg: "32px" }}
          >
            Ready to take control of your finances and accounting? Start now to
            enjoy the benefits of a comprehensive and intuitive financial
            management solution.
          </Text>

          <CustomButton
            mt={{ base: "20px", lg: "20px" }}
            w="220px"
            bg="primary.500"
            onClick={handleChat}
          >
            Contact Us
          </CustomButton>
        </Box>
      </Box>
      <Footer />
    </>
  );
}
