import React, { useContext, useEffect, useState } from "react";
import {
  Heading,
  Box,
  Flex,
  Text,
  Image,
  useBreakpointValue,
} from "@chakra-ui/react";
import { CustomButton } from "../../components/Button";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ExchangeCalculator from "../../components/ExchangeCalculator";
import Testimonial from "../../components/Testimonial";
import { UserContext } from "../../contexts/UserContext";
import MoneyIllustration from "../../../public/images/money_exchange_illustration.svg";

export default function MoneyExchange() {
  const { clientPhoneNumber } = useContext(UserContext);

  useEffect(() => {
    const element = document.getElementById("exchange-calculator");
    if (element) {
      // 👇 Will scroll smoothly to the top of the next section
      element.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const handleClick = (event) => {
    event.preventDefault();

    const message = `Hi there! I'm interested in having a conversation about your accounting services. Can I go on to ask my questions?`;

    const url = `https://wa.me/${clientPhoneNumber}?text=${message}`;

    router.push(url);
  };

  const testimonialContent = [
    {
      id: 0,
      img: "/images/avatar-1.jpg",
      name: " Sarah K.",
      // title: "Business Consultant",
      content:
        "I recently used this money exchange site for the first time, and I was pleasantly surprised. I will definitely be using it again in the future.",
    },
    {
      id: 1,
      img: "/images/avatar-2.jpg",
      name: "Michael S.",
      // title: "Backend Developer",
      content:
        "I travel frequently for business, and I always rely on this money exchange site to handle my currency needs. It's a reliable service that I trust.",
    },
    {
      id: 2,
      img: "/images/avatar-3.jpg",
      name: "Emma L.",
      // title: "UX Designer",
      content:
        "As an international student, exchanging money is a regular requirement for me. The rates are fair, and the transactions are processed quickly. I'm grateful for their reliable service.",
    },
    {
      id: 3,
      img: "/images/avatar-4.jpg",
      name: "Jennifer T.",
      // title: "Frontend Developer",
      content:
        "The rates were fantastic, and the transaction was completed without any issues. Their professionalism and reliability are commendable",
    },
    {
      id: 4,
      img: "/images/avatar-5.jpg",
      name: "John D.",
      // title: "Business Consultant",
      content:
        "I have been using this money exchange service for years, and I couldn't be happier. The rates are competitive, the process is seamless, and the customer support is outstanding. Highly recommended",
    },
  ];

  const [isHovered1, setIsHovered1] = useState(false);
  const [isHovered2, setIsHovered2] = useState(false);
  const [isHovered3, setIsHovered3] = useState(false);

  const handleMouseEnter1 = () => {
    setIsHovered1(true);
  };
  const handleMouseEnter2 = () => {
    setIsHovered2(true);
  };
  const handleMouseEnter3 = () => {
    setIsHovered3(true);
  };

  const handleMouseLeave1 = () => {
    setIsHovered1(false);
  };
  const handleMouseLeave2 = () => {
    setIsHovered2(false);
  };
  const handleMouseLeave3 = () => {
    setIsHovered3(false);
  };

  const isImageVisible = useBreakpointValue({
    base: false,
    md: false,
    lg: true,
  });

  return (
    <>
      <Navbar />
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
          Money Exchange Services
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
          Services Securely swap our currently enabled currency pairs. Our
          streamlined process is simply and secure.
        </Text>

        <Flex
          pt={{
            base: "5",
            md: "45px",
          }}
          w={{ base: "full", md: "40%", lg: "25%", xl: "20%" }}
          mx="auto"
          gap={{ base: 4, lg: 8 }}
          flexDirection={{ base: "column", md: "row" }}
          justifyContent="center"
        >
          {/* <CustomButton onClick={handleClick} w="220px" bg="primary.500">
            Contact Us
          </CustomButton> */}
        </Flex>
      </Box>

      {isImageVisible && (
        <Image
          src="/images/money-exchange-curve.png"
          position={{ lg: "relative" }}
          left={{ lg: "220px" }}
          mx="auto"
        />
      )}

      <Flex
        // bg="#F8FDFB"
        position="relative"
        pt={{ base: "80px", xl: "120px" }}
        gap={{ base: "80px" }}
        pb={{ base: "45px" }}
        flexDirection={{ base: "column", md: "row" }}
        px={{
          base: "10px",
          md: "30px",
          lg: "70px",
        }}
        id="exchange-calculator"
      >
        <Box position={{ lg: "absolute" }} zIndex={100} bottom={{ lg: "60px" }}>
          <ExchangeCalculator />
        </Box>
      
        <Text
          fontSize={{
            base: "32px",
            md: "28px",
            lg: "28px",
            xl: "28px",
            "2xl": "36px",
            "3xl": "42px",
          }}
          fontFamily="body"
          fontWeight={600}
          position={{ lg: "absolute" }}
          left={{ lg: "800px" }}
          bottom={{ md: "130px" }}
          w={{
            base: "full",
            md: "45%",
            lg: "35%",
            xl: "35%",
            "2xl": "35%",
            "3xl": "40%",
            "4xl": "35%",
          }}
          textColor="#0D2F48"
          justifySelf={{ base: "center", lg: "none" }}
          alignSelf={{ md: "flex-end" }}
        >
          Our easy-to-use form makes managing your finances and accounting needs
          a breeze.
        </Text>
      </Flex>
      <Box
        bg="#F8FDFB"
        h={{ base: "auto" }}
        position="relative"
        overflow="hidden"
      >
        <Heading
          fontSize={{ base: "24px", lg: "32px", xl: "48px" }}
          pb="20px"
          pt="80px"
          textAlign="center"
        >
          Features
        </Heading>

        <Text
          w={{ md: "90%", lg: "70%" }}
          textAlign="center"
          pb="25px"
          mx="auto"
          fontSize={{ md: 20, lg: 24 }}
        >
          We help our clients save time and money while minimizing the risks
          associated with currency exchange. Explore our features below and
          start managing your money exchange needs with ease
        </Text>

        <Flex
          position="relative"
          gap={14}
          justifyContent="center"
          mt="50px"
          zIndex={10}
          px={{ base: "10px", md: "30px", lg: "70px" }}
          direction={{ base: "column", md: "row" }}
          flexWrap={{ md: "wrap", lg: "nowrap" }}
          mb={{ base: "50px", md: "150px" }}
        >
          <Box
            h={{ base: "full", md: "300px", lg: "320px" }}
            w={{ base: "full", md: "300px", lg: "320px" }}
            p={4}
            _hover={{
              bg: "primary.500",
              transition: "background-color 0.3s ease-in-out", // Smooth transition
            }}
            border="2px"
            borderColor={isHovered1 ? "white" : "blue.400"}
            bg={isHovered1 ? "primary.500" : "#F8FDFB"}
            onMouseEnter={handleMouseEnter1}
            onMouseLeave={handleMouseLeave1}
            rounded={9}
            zIndex={10}
          >
            {isHovered1 ? (
              <Image src="/images/clock.png" mx="auto" />
            ) : (
              <Image src="/images/red-clock.png" mx="auto" />
            )}

            <Text
              fontWeight={600}
              fontSize={24}
              pt={7}
              pb={{ lg: 2, xl: 6 }}
              textAlign="center"
              color={isHovered1 ? "white" : "blue.900"}
            >
              Real-time Exchange Rates
            </Text>

            <Text color={isHovered1 ? "white" : "blue.900"} textAlign="center">
              Our platform offers up-to-date exchange rates, ensuring that you
              get the most accurate information to make informed decisions about
              currency exchange.
            </Text>
          </Box>

          <Box
            h={{ base: "full", md: "300px", lg: "320px" }}
            w={{ base: "full", md: "300px", lg: "320px" }}
            p={4}
            _hover={{
              bg: "primary.500",
              transition: "background-color 0.3s ease-in-out", // Smooth transition
            }}
            border="2px"
            borderColor={isHovered2 ? "white" : "blue.400"}
            bg={isHovered2 ? "primary.500" : "#F8FDFB"}
            onMouseEnter={handleMouseEnter2}
            onMouseLeave={handleMouseLeave2}
            rounded={9}
            zIndex={10}
          >
            {/* <Image src="/images/money.png" mx="auto" /> */}
            {isHovered2 ? (
              <Image src="/images/blue-money.png" mx="auto" />
            ) : (
              <Image src="/images/money.png" mx="auto" />
            )}

            <Text
              fontWeight={600}
              fontSize={24}
              pt={7}
              pb={6}
              textAlign="center"
              color={isHovered2 ? "white" : "blue.900"}
            >
              Simple and Secure Transactions
            </Text>

            <Text textAlign="center" color={isHovered2 ? "white" : "blue.900"}>
              We pride ourselves on offering low transaction fees, so you can
              keep more of your money when exchanging currencies.
            </Text>
          </Box>

          <Box
            h={{ base: "full", md: "300px", lg: "320px" }}
            w={{ base: "full", md: "300px", lg: "320px" }}
            p={4}
            _hover={{
              bg: "primary.500",
              transition: "background-color 0.3s ease-in-out", // Smooth transition
            }}
            border="2px"
            borderColor={isHovered3 ? "white" : "blue.400"}
            bg={isHovered3 ? "primary.500" : "#F8FDFB"}
            onMouseEnter={handleMouseEnter3}
            onMouseLeave={handleMouseLeave3}
            rounded={9}
            zIndex={10}
          >
            {/* <Image src="/images/security.png" mx="auto" /> */}
            {isHovered3 ? (
              <Image src="/images/blue-security.png" mx="auto" />
            ) : (
              <Image src="/images/security.png" mx="auto" />
            )}

            <Text
              fontWeight={600}
              fontSize={24}
              pt={7}
              pb={6}
              textAlign="center"
              color={isHovered3 ? "white" : "blue.900"}
            >
              Low Fees
            </Text>

            <Text textAlign="center" color={isHovered3 ? "white" : "blue.900"}>
              Our platform offers a secure way to conduct transactions, with
              built-in fraud detection and prevention measures to keep your
              information safe.
            </Text>
          </Box>

          <Image
            position="absolute"
            display={{ base: "none", md: "block" }}
            bottom={{ md: "-220px", xl: "-320px" }}
            left={0}
            right={0}
            zIndex={5}
            w="full"
            src="/images/accounting.png"
          />
        </Flex>
      </Box>

      <Box
        width="100%"
        bgImg="/images/exchangeisdoneanywhere.png"
        bgSize="cover"
        h={{ base: "700", md: "830" }}
        px={{
          base: "5",
        }}
        textAlign="center"
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
      >
        <Heading
          fontWeight={700}
          fontSize={{ base: "35px", md: "50px" }}
          textColor="offwhite"
          mt="100px"
        >
          Exchange is done anywhere
        </Heading>

        <Flex
          pt={{
            base: "5",
            md: "45px",
          }}
          w={{ base: "full", md: "40%", lg: "25%", xl: "20%" }}
          mx="auto"
          gap={{ base: 4, lg: 8 }}
          flexDirection={{ base: "column", md: "row" }}
        >
          <CustomButton
            route="#exchange-calculator"
            mx="auto"
            w="270px"
            bg="primary.500"
          >
            Transfer Money
          </CustomButton>
        </Flex>
      </Box>

      <Testimonial testimonialContent={testimonialContent} />

      <Footer />
    </>
  );
}
