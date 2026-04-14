import React from "react";
import {
  Box,
  Heading,
  Text,
  Flex,
  Stack,
  VStack,
  useColorModeValue,
  Container,
  SimpleGrid,
  Image,
} from "@chakra-ui/react";
import { CustomButton } from "../../components/Button";
import Link from "next/link";
import ExchangeCalculator from "../ExchangeCalculator";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

export default function Hero() {
  return (
    <Box
      width="100%"
      position="relative"
      bgImg="/images/herobg.png"
      bgSize="cover"
      bgPosition="center"
      minH={{ base: "auto", lg: "800px" }}
      py={{ base: "80px", lg: "0" }}
      display="flex"
      alignItems="center"
      overflow="hidden"
      _before={{
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        bg: "blackAlpha.500", // Dark overlay
        zIndex: 1,
      }}
    >
      <Container maxW="container.xl" position="relative" zIndex={2}>
        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={{ base: 12, lg: 8 }} alignItems="center">
          {/* Left Content */}
          <VStack align={{ base: "center", lg: "start" }} spacing={8} textAlign={{ base: "center", lg: "left" }}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <VStack align={{ base: "center", lg: "start" }} spacing={4}>
                <Box
                  bg="whiteAlpha.200"
                  px={4}
                  py={2}
                  rounded="full"
                  border="1px solid"
                  borderColor="whiteAlpha.300"
                  backdropFilter="blur(10px)"
                >
                  <Text color="primary.200" fontWeight="700" fontSize="sm" letterSpacing="wider">
                    NEW FEATURE: GLOBAL TRANSFERS
                  </Text>
                </Box>
                <Heading
                  fontWeight={800}
                  fontSize={{ base: "4xl", md: "5xl", xl: "72px" }}
                  textColor="white"
                  lineHeight="1.1"
                >
                  <Text as="span" color="primary.500">OzonePro</Text> Financial Services
                </Heading>
                <Text
                  textColor="whiteAlpha.800"
                  fontSize={{ base: "lg", md: "xl", lg: "22px" }}
                  maxW="600px"
                  fontWeight="500"
                >
                  Experience borderless financial freedom. Fast, secure, and built for the modern world.
                  Manage your accounting, tax, and currency needs in one place.
                </Text>
              </VStack>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Stack direction={{ base: "column", sm: "row" }} spacing={4}>
                <CustomButton 
                  w="220px" 
                  h="65px"
                  route="/accounting" 
                  bg="primary.500"
                  fontSize="lg"
                  fontWeight="700"
                  rounded="2xl"
                  _hover={{ bg: "primary.600", transform: "translateY(-2px)" }}
                  boxShadow="0 10px 20px -5px rgba(214, 51, 58, 0.4)"
                >
                  Accounting
                </CustomButton>

                <CustomButton 
                  w="220px" 
                  h="65px"
                  route="/money-exchange" 
                  variant="outline"
                  color="white"
                  borderColor="whiteAlpha.400"
                  fontSize="lg"
                  fontWeight="700"
                  rounded="2xl"
                  _hover={{ bg: "whiteAlpha.100", transform: "translateY(-2px)" }}
                >
                  Money Exchange
                </CustomButton>
              </Stack>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <Flex align="center" gap={4}>
                <Flex>
                  {[1, 2, 3, 4].map((i) => (
                    <Box
                      key={i}
                      w="40px"
                      h="40px"
                      rounded="full"
                      border="2px solid"
                      borderColor="blue.900"
                      ml={i === 1 ? 0 : -3}
                      overflow="hidden"
                      bg="gray.200"
                    >
                      <Image src={`https://i.pravatar.cc/100?u=${i}`} />
                    </Box>
                  ))}
                </Flex>
                <Text color="whiteAlpha.700" fontSize="sm" fontWeight="600">
                  Joined by 10,000+ businesses globally
                </Text>
              </Flex>
            </motion.div>
          </VStack>

          {/* Right Content - Exchange Calculator */}
          <Flex justify={{ base: "center", lg: "end" }} position="relative">
            <MotionBox
              initial={{ opacity: 0, scale: 0.9, x: 50 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              w="full"
              maxW="480px"
            >
              <ExchangeCalculator isShortcut={true} fullWidth={true} />
            </MotionBox>
            
            {/* Background blur element */}
            <Box
              position="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
              w="120%"
              h="120%"
              bg="primary.500"
              filter="blur(120px)"
              opacity="0.1"
              zIndex={-1}
            />
          </Flex>
        </SimpleGrid>
      </Container>

      {/* Shapes and decorations */}
      <Box
        position="absolute"
        top="-10%"
        right="-5%"
        w="400px"
        h="400px"
        bg="blue.500"
        filter="blur(150px)"
        opacity="0.1"
        zIndex={0}
      />
    </Box>
  );
}
