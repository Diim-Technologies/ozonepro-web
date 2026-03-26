import React, { useContext, useEffect, useState } from "react";
import {
  Heading,
  Box,
  Flex,
  Text,
  Image,
  VStack,
  HStack,
  SimpleGrid,
  Container,
  Button,
  Icon,
  useColorModeValue,
  Badge,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { 
  Flash, 
  ShieldTick, 
  Global, 
  ArrowRight,
  DirectNormal,
  Award
} from "iconsax-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ExchangeCalculator from "../../components/ExchangeCalculator";
import Testimonial from "../../components/Testimonial";
import { UserContext } from "../../contexts/UserContext";

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

export default function MoneyExchange() {
  const { clientPhoneNumber } = useContext(UserContext);

  const cardBg = useColorModeValue("white", "gray.800");

  const features = [
    {
      title: "Real-time Rates",
      desc: "Up-to-the-minute exchange rates for accurate conversions.",
      icon: Flash,
      color: "orange.400"
    },
    {
      title: "Extreme Security",
      desc: "Bank-grade encryption keeping your funds and data safe.",
      icon: ShieldTick,
      color: "green.400"
    },
    {
      title: "Global Reach",
      desc: "Transfer to over 50 countries with instant processing.",
      icon: Global,
      color: "blue.400"
    }
  ];

  const testimonialContent = [
    { id: 0, img: "/images/avatar-1.jpg", name: "Sarah K.", content: "The fastest exchange I've ever used. Rates are consistently better than my bank." },
    { id: 1, img: "/images/avatar-2.jpg", name: "Michael S.", content: "I trust Ozone with my business transfers. Reliable and professional every time." },
    { id: 2, img: "/images/avatar-3.jpg", name: "Emma L.", content: "Incredible UX. This redesigned calculator makes cross-border payments simple." }
  ];

  return (
    <Box bg="white" overflowX="hidden">
      <Navbar />
      
      {/* Hero Section */}
      <Box 
        position="relative" 
        pt={{ base: "140px", md: "200px" }} 
        pb={{ base: "100px", md: "150px" }}
        bgGradient="linear(to-b, blue.900, blue.800)"
        color="white"
      >
        <Container maxW="container.xl">
          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={12} align="center">
            <VStack align="start" spacing={8}>
              <Badge bg="whiteAlpha.200" color="blue.200" px={4} py={1} rounded="full" textTransform="none" fontSize="sm">
                <HStack><Icon as={Award} boxSize={3} /> <Text>Voted No.1 for Secure Transfers</Text></HStack>
              </Badge>
              <Heading fontSize={{ base: "4xl", md: "6xl", xl: "7xl" }} fontWeight="900" lineHeight="1" textAlign="left">
                Empowering Your <Text as="span" color="primary.500">Global</Text> Ambitions.
              </Heading>
              <Text fontSize="xl" opacity={0.8} textAlign="left" maxW="600px">
                Ozone Pro-Financial provides seamless money exchange services with 
                best-in-market rates and uncompromising security.
              </Text>
              <HStack spacing={4}>
                <Button 
                  size="lg" 
                  h="70px" 
                  px={10} 
                  bg="primary.500" 
                  _hover={{ bg: "primary.600", transform: "translateY(-2px)" }}
                  rounded="2xl"
                  rightIcon={<ArrowRight />}
                >
                  Get Started
                </Button>
                <Button 
                  size="lg" 
                  h="70px" 
                  px={10} 
                  variant="outline" 
                  rounded="2xl"
                  _hover={{ bg: "whiteAlpha.100" }}
                >
                  View Rates
                </Button>
              </HStack>
            </VStack>

            <MotionBox
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <ExchangeCalculator />
            </MotionBox>
          </SimpleGrid>
        </Container>

        {/* Decorative elements */}
        <Box position="absolute" top={0} right={0} w="40%" h="100%" bgGradient="linear(to-l, primary.500, transparent)" opacity={0.05} pointerEvents="none" />
      </Box>

      {/* Features Section */}
      <Container maxW="container.xl" py={24}>
        <VStack spacing={16}>
          <VStack spacing={4} textAlign="center">
            <Heading fontSize={{ base: "3xl", md: "5xl" }} color="blue.900">Why Choose Ozone?</Heading>
            <Text color="gray.500" fontSize="lg" maxW="700px">
              We focus on speed, security, and savings so you can focus on what matters most to you.
            </Text>
          </VStack>

          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} w="full">
            {features.map((feature, i) => (
              <VStack 
                key={i} 
                p={10} 
                bg="white" 
                rounded="3xl" 
                boxShadow="xl" 
                align="start" 
                spacing={6}
                border="1px"
                borderColor="gray.50"
                _hover={{ transform: "translateY(-10px)", boxShadow: "2xl" }}
                transition="all 0.3s"
              >
                <Flex bg={`${feature.color.split(".")[0]}.50`} p={4} rounded="2xl" color={feature.color}>
                  <feature.icon size="32" variant="Bold" />
                </Flex>
                <VStack align="start" spacing={3}>
                  <Heading size="md" color="blue.900">{feature.title}</Heading>
                  <Text color="gray.500">{feature.desc}</Text>
                </VStack>
              </VStack>
            ))}
          </SimpleGrid>
        </VStack>
      </Container>

      {/* CTA Section */}
      <Box py={24} bg="blue.900" color="white" position="relative" overflow="hidden">
        <Container maxW="container.lg">
          <VStack spacing={8} textAlign="center">
            <Heading fontSize={{ base: "3xl", md: "5xl" }}>Ready to move money with confidence?</Heading>
            <Text fontSize="xl" opacity={0.8} maxW="600px">
              Join over 50,000+ individuals and businesses who choose Ozone globally.
            </Text>
            <Button 
               size="lg" 
               h="75px" 
               px={12} 
               bg="white" 
               color="blue.900" 
               fontSize="xl"
               fontWeight="800"
               rounded="2xl"
               _hover={{ bg: "gray.100", transform: "scale(1.05)" }}
               rightIcon={<ArrowRight />}
            >
              Sign Up For Free
            </Button>
          </VStack>
        </Container>
        <Box position="absolute" top="-20%" left="-10%" w="400px" h="400px" bg="primary.500" filter="blur(150px)" opacity={0.1} />
      </Box>

      <Testimonial testimonialContent={testimonialContent} />
      <Footer />
    </Box>
  );
}


