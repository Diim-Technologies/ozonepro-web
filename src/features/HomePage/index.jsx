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
} from "@chakra-ui/react";
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

      <Box bg="blue.50" textAlign="center" py="30px" px={{ base: "10px" }}>
        <Text
          pt="58px"
          pb="58px"
          fontSize={{ base: "24px", lg: "32px" }}
          textColor="primary.500"
        >
          Products Features
        </Text>

        <Box>
          <Image mx="auto" src="/images/blue_dollar.png" />

          <Heading
            fontSize={{ base: "24px", lg: "32px", xl: "48px" }}
            py="20px"
          >
            Money Exchange
          </Heading>

          <Text w={{ md: "90%", lg: "70%", xl: "54%" }} pb="20px" mx="auto">
            Easily convert currencies for international transactions and keep
            track of their finances in multiple currencies. This will make it
            easier for businesses and individuals to conduct transactions across
            borders.
          </Text>

          <CustomButton
            route="/money-exchange"
            mx="auto"
            w="220px"
            bg="primary.500"
          >
            Money Exchange
          </CustomButton>

          <ExchangeCalculator mx="auto" />
          <Flex justifyContent='center' position='relative'>
            <Box>
              <Flex 
                justifyContent='center'
              >
                <Flex 
                justifyContent='center'
                alignItems='center'
                w={{base:'200px',md:'',lg:'405.836px'}}
                h={{base:'80px',md:'',lg:'113px'}} 
                bg='white'
                position='absolute'
                top={{base:'55px',md:'',lg:'50px'}}
                borderTopRadius={{base:'24px',md:'24px',lg:'24px'}}
                >
                  <Text
                  color='#D6333A'
                  fontFamily='body'
                  fontWeight='bold'
                  fontSize={{base:'24px',lg:'32px'}}

                  >Coming soon</Text>
                </Flex>
              </Flex>
              <Box 
              w={{base: "350px", md: "450px",lg:'573px'}} 
              boxShadow="0px 10px 100px 0px rgba(13, 47, 72, 0.12)"
              h={{base:'auto',md:'auto',lg:'auto'}}
              mt={{base:'100px',md:'',lg:'112px'}}
              borderRadius='24px'
              bg='white'>
                <Flex 
                flexDirection='row'
                pt={{base:'70px',md:'',lg:'100px'}} 
                pb={{base:'30px',md:'',lg:'50px'}} 
                pl={{base:'30px',md:'30px',lg:'70px'}}
                pr={{base:'55px',md:'55px',lg:'95px'}}
                justifyContent='center'>
                  <UnorderedList 
                  listStyleType='none' 
                  spacing={{base:'12px',md:'',lg:'27px'}}
                  fontFamily='body'
                  fontSize={{base:'16px',md:'20px'}}
                  fontWeight='normal'
                  color='#0D2F48'
                  >
                    {firstPairsArray.map(pair => (<ListItem>{pair}</ListItem>))}
                  </UnorderedList>
                  <Image mx="auto" src="/images/comingsoon-pairs.svg" />
                  <UnorderedList 
                  listStyleType='none' 
                  spacing={{base:'12px',md:'',lg:'27px'}}
                  fontFamily='body'
                  fontSize={{base:'16px',md:'20px'}}
                  color='#0D2F48'
                  fontWeight='normal'
                  >
                    {secondPairsArray.map(pair => (<ListItem>{pair}</ListItem>))}
                  </UnorderedList>
                </Flex>
              </Box>
            </Box>
          </Flex>
        </Box>
      </Box>

      <Box pt="58px" textAlign="center" bg="white" px={{ base: "10px" }}>
        <Image mx="auto" src="/images/green_dollar.png" />

        <Heading fontSize={{ base: "24px", lg: "32px", xl: "48px" }} py="20px">
          Accounting
        </Heading>

        <Text w={{ md: "90%", lg: "70%", xl: "54%" }} pb="20px" mx="auto">
        Simplify Your Financial and Accounting Needs.General Accounting, Bookkeeping, Tax filing & Limited Currency Exchange Service
        </Text>

        <CustomButton route="/accounting" mx="auto" w="220px" bg="primary.500">
          Accounting
        </CustomButton>

        <Box
          w={{ base: "full", md: "50%" }}
          display="flex"
          alignItems="center"
          mx="auto"
          pt="30px"
          pb="70px"
        >
          <Image w="full" src="/images/bookkeeping.svg"  />
        </Box>
      </Box>

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
