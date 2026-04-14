import React from "react";
import Link from "next/link";
import {
  Flex,
  Box,
  Image,
  VStack,
  Text,
  Button,
  Heading,
  HStack,
  PinInput,
  PinInputField,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { ArrowLeft, Verify, TickCircle, Refresh } from "iconsax-react";
import verifyHooks from "./hooks";

const MotionBox = motion(Box);

export default function VerifyEmailPage() {
  const {
    otp,
    setOtp,
    handleVerify,
    handleResendOtp,
    isVerifying,
    isResending,
    email,
    timer,
  } = verifyHooks();

  const bgGradient = useColorModeValue(
    "linear(to-br, blue.50, white)",
    "linear(to-br, gray.900, blue.900)"
  );

  return (
    <Flex h="100vh" w="full" bg={bgGradient} overflow="hidden">
      {/* Left Section (Branding) */}
      <Box
        flex={1}
        display={{ base: "none", lg: "flex" }}
        alignItems="center"
        justifyContent="center"
        p={20}
        position="relative"
      >
        <VStack spacing={8} align="start" zIndex={1} maxW="500px">
          <Image src="/images/ozone-pro-logo.png" h="80px" />
          <Heading fontSize="6xl" fontWeight="900" lineHeight="1.1" color="gray.900">
            Almost <Text as="span" color="primary.500">There.</Text>
          </Heading>
          <Text fontSize="xl" color="gray.600" fontWeight="500">
            Check your inbox for a verification code. We just want to make sure it's really you.
          </Text>
          <Link href="/signup">
            <Button
              variant="outline"
              colorScheme="primary"
              size="lg"
              rounded="full"
              leftIcon={<ArrowLeft size="20" />}
              px={10}
            >
              Back to Sign Up
            </Button>
          </Link>
        </VStack>
        <Box
          position="absolute"
          bottom="-10%"
          left="-10%"
          w="600px"
          h="600px"
          bg="blue.500"
          filter="blur(150px)"
          opacity="0.05"
          zIndex={0}
        />
      </Box>

      {/* Right Section (Verification) */}
      <Flex
        w={{ base: "full", lg: "55%" }}
        bg="white"
        align="center"
        justify="center"
        px={{ base: 6, md: 16 }}
        py={10}
        boxShadow="-20px 0 50px rgba(0,0,0,0.05)"
      >
        <MotionBox
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          w="full"
          maxW="500px"
        >
          <VStack spacing={10} align="center" textAlign="center">
            <Box
              p={6}
              bg="blue.50"
              rounded="3xl"
              color="primary.500"
            >
              <Verify size="64" variant="Bulk" />
            </Box>

            <VStack spacing={4}>
              <Heading fontSize="4xl" fontWeight="800">Verify Email</Heading>
              <Text color="gray.500" fontSize="lg">
                We've sent a 6-digit verification code to
                <Text as="span" fontWeight="800" color="gray.700" ml={1}>
                  {email || "your email"}
                </Text>
              </Text>
            </VStack>

            <VStack spacing={6} w="full">
              <HStack spacing={4} justify="center">
                <PinInput
                  otp
                  size="lg"
                  placeholder=""
                  focusBorderColor="primary.500"
                  onChange={(val) => setOtp(val)}
                  value={otp}
                  isDisabled={isVerifying}
                >
                  <PinInputField h="70px" w="60px" rounded="2xl" border="2px solid" borderColor="gray.100" fontSize="2xl" fontWeight="700" />
                  <PinInputField h="70px" w="60px" rounded="2xl" border="2px solid" borderColor="gray.100" fontSize="2xl" fontWeight="700" />
                  <PinInputField h="70px" w="60px" rounded="2xl" border="2px solid" borderColor="gray.100" fontSize="2xl" fontWeight="700" />
                  <PinInputField h="70px" w="60px" rounded="2xl" border="2px solid" borderColor="gray.100" fontSize="2xl" fontWeight="700" />
                  <PinInputField h="70px" w="60px" rounded="2xl" border="2px solid" borderColor="gray.100" fontSize="2xl" fontWeight="700" />
                  <PinInputField h="70px" w="60px" rounded="2xl" border="2px solid" borderColor="gray.100" fontSize="2xl" fontWeight="700" />
                </PinInput>
              </HStack>

              <Button
                w="full"
                h="70px"
                bg="primary.500"
                color="white"
                fontSize="lg"
                fontWeight="700"
                rounded="2xl"
                onClick={handleVerify}
                isLoading={isVerifying}
                isDisabled={otp.length !== 6}
                _hover={{ bg: "primary.600", transform: "translateY(-2px)" }}
                transition="all 0.2s"
                boxShadow="0 15px 30px -5px rgba(214, 51, 58, 0.4)"
                rightIcon={<TickCircle variant="Bold" />}
              >
                Verify Account
              </Button>
            </VStack>

            <VStack spacing={4}>
              <Text color="gray.500">Didn't receive the code?</Text>
              <Button
                variant="ghost"
                colorScheme="primary"
                leftIcon={<Refresh size="20" />}
                onClick={handleResendOtp}
                isLoading={isResending}
                isDisabled={timer > 0}
                fontWeight="700"
              >
                {timer > 0 ? `Resend in ${timer}s` : "Resend OTP"}
              </Button>
            </VStack>
          </VStack>
        </MotionBox>
      </Flex>
    </Flex>
  );
}
