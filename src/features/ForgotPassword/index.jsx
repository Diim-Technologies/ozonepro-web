import React from "react";
import {
  Box,
  Flex,
  VStack,
  Heading,
  Text,
  Button,
  Image,
  FormControl,
  FormLabel,
  Input,
  useColorModeValue,
  IconButton,
  Icon,
} from "@chakra-ui/react";
import { ArrowLeft, Sms, TickCircle } from "iconsax-react";
import changePasswordHooks from "./hooks";
import Link from "next/link";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

export default function ForgotPasswordPage() {
  const { handleChange, handleContinue, isLoading, isSuccess } = changePasswordHooks();
  const bgGradient = useColorModeValue(
    "linear(to-br, blue.50, white)",
    "linear(to-br, gray.900, blue.900)"
  );

  return (
    <Flex h="100vh" w="full" bg={bgGradient} align="center" justify="center" p={4}>
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        w="full"
        maxW="500px"
        bg="white"
        p={{ base: 8, md: 12 }}
        rounded="3xl"
        boxShadow="2xl"
        position="relative"
      >
        <VStack spacing={8} align="stretch">
          <Flex justify="space-between" align="center">
            <Link href="/login">
              <IconButton
                aria-label="Back"
                icon={<ArrowLeft size="24" />}
                variant="ghost"
                rounded="full"
              />
            </Link>
            <Image src="/images/ozone-pro-logo.png" h="50px" />
          </Flex>

          {isSuccess ? (
            <VStack spacing={6} py={10} textAlign="center">
              <Icon as={TickCircle} w={20} h={20} color="green.400" variant="Bold" />
              <VStack spacing={2}>
                <Heading size="lg">Check your email</Heading>
                <Text color="gray.500">
                  We've sent a password reset link to your email address.
                </Text>
              </VStack>
              <Link href="/login" style={{ width: "100%" }}>
                <Button
                  w="full"
                  h="60px"
                  variant="outline"
                  colorScheme="blue"
                  rounded="2xl"
                >
                  Back to Login
                </Button>
              </Link>
            </VStack>
          ) : (
            <VStack spacing={8} align="stretch">
              <VStack align="start" spacing={2}>
                <Heading fontSize="3xl" fontWeight="800">Password Reset</Heading>
                <Text color="gray.500">
                  Enter your email address and we'll send you a link to reset your password.
                </Text>
              </VStack>

              <VStack spacing={6} as="form">
                <FormControl isRequired>
                  <FormLabel fontWeight="700">Email Address</FormLabel>
                  <Input
                    name="email"
                    type="email"
                    placeholder="name@company.com"
                    h="60px"
                    bg="gray.50"
                    border="none"
                    rounded="2xl"
                    _focus={{ border: "1px", borderColor: "primary.500", bg: "white" }}
                    onChange={handleChange}
                  />
                </FormControl>

                <Button
                  w="full"
                  h="65px"
                  bg="primary.500"
                  color="white"
                  fontSize="lg"
                  fontWeight="700"
                  rounded="2xl"
                  isLoading={isLoading}
                  onClick={handleContinue}
                  _hover={{ bg: "primary.600", transform: "translateY(-2px)" }}
                  boxShadow="0 10px 20px -5px rgba(214, 51, 58, 0.4)"
                  leftIcon={<Sms size="24" variant="Bold" />}
                >
                  Send Reset Link
                </Button>
              </VStack>

              <HStack justify="center">
                <Text color="gray.500">Remember your password?</Text>
                <Link href="/login">
                  <Text color="primary.500" fontWeight="700" cursor="pointer">Sign In</Text>
                </Link>
              </HStack>
            </VStack>
          )}
        </VStack>
      </MotionBox>
    </Flex>
  );
}


