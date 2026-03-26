import React from "react";
import {
  Flex,
  Box,
  Image,
  VStack,
  Text,
  Input,
  Button,
  FormControl,
  FormLabel,
  InputGroup,
  InputRightElement,
  IconButton,
  Heading,
  HStack,
  Link as ChakraLink,
  useColorModeValue,
  Spinner,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeSlash, ArrowRight, UserAdd } from "iconsax-react";
import loginHooks from "./hooks";
import Link from "next/link";

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

export default function LoginPage() {
  const { handleSubmit, handleChange, isLoading } = loginHooks();
  const [showPassword, setShowPassword] = React.useState(false);

  const bgGradient = useColorModeValue(
    "linear(to-br, blue.50, white)",
    "linear(to-br, gray.900, blue.900)"
  );

  return (
    <Flex h="100vh" w="full" bg={bgGradient} overflow="hidden">
      {/* Left Section: Branding & Visuals */}
      <Box
        flex={1}
        display={{ base: "none", lg: "flex" }}
        alignItems="center"
        justifyContent="center"
        position="relative"
        p={20}
      >
        <VStack spacing={8} align="start" zIndex={1} maxW="500px">
          <Image
            src="/images/logo-dark-mode.png"
            fallbackSrc="/images/ozone-pro-logo.png"
            h="80px"
          />
          <Heading fontSize="6xl" fontWeight="900" lineHeight="1.1" color="gray.900">
            Secure, Fast & <Text as="span" color="primary.500">Global</Text> Transfers.
          </Heading>
          <Text fontSize="xl" color="gray.600" fontWeight="500">
            Join thousands of users moving money across borders effortlessly. Experience the new standard in fintech.
          </Text>
          <HStack spacing={4}>
            <Link href="/signup">
              <Button
                variant="outline"
                colorScheme="primary"
                size="lg"
                rounded="full"
                leftIcon={<UserAdd size="20" />}
                px={10}
                _hover={{ bg: "primary.500", color: "white" }}
              >
                Create Account
              </Button>
            </Link>
          </HStack>
        </VStack>

        {/* Abstract Background Element */}
        <Box
          position="absolute"
          top="-10%"
          right="-10%"
          w="600px"
          h="600px"
          bg="primary.500"
          filter="blur(150px)"
          opacity="0.1"
          zIndex={0}
        />
      </Box>

      {/* Right Section: Login Form */}
      <Flex
        w={{ base: "full", lg: "50%" }}
        bg="white"
        align="center"
        justify="center"
        px={8}
        boxShadow="-20px 0 50px rgba(0,0,0,0.05)"
        zIndex={1}
      >
        <MotionBox
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          w="full"
          maxW="450px"
        >
          <VStack spacing={8} align="stretch">
            <VStack align="start" spacing={2}>
              <Heading fontSize="4xl" fontWeight="800">Welcome Back</Heading>
              <Text color="gray.500" fontSize="lg">Enter your details to access your account</Text>
            </VStack>

            <VStack spacing={5} as="form" onSubmit={handleSubmit}>
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
                  _focus={{ bg: "white", boxShadow: "outline" }}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel fontWeight="700" display="flex" justifyContent="space-between">
                  Password
                  <Link href="/forgot-password">
                    <Text as="span" color="primary.500" fontSize="sm" fontWeight="600" cursor="pointer">
                      Forgot?
                    </Text>
                  </Link>
                </FormLabel>
                <InputGroup>
                  <Input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    h="60px"
                    bg="gray.50"
                    border="none"
                    rounded="2xl"
                    _focus={{ bg: "white", boxShadow: "outline" }}
                    onChange={handleChange}
                  />
                  <InputRightElement h="60px" pr={2}>
                    <IconButton
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      variant="ghost"
                      onClick={() => setShowPassword(!showPassword)}
                      icon={showPassword ? <EyeSlash size="24" /> : <Eye size="24" />}
                    />
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              <Button
                type="submit"
                w="full"
                h="65px"
                bg="primary.500"
                color="white"
                fontSize="lg"
                fontWeight="700"
                rounded="2xl"
                isLoading={isLoading}
                _hover={{ bg: "primary.600", transform: "translateY(-2px)" }}
                _active={{ transform: "translateY(0)" }}
                transition="all 0.2s"
                boxShadow="0 10px 20px -5px rgba(214, 51, 58, 0.4)"
                rightIcon={<ArrowRight variant="Bold" />}
              >
                Sign In
              </Button>
            </VStack>

            <HStack justify="center" pt={4}>
              <Text color="gray.500">Don't have an account?</Text>
              <Link href="/signup">
                <Text color="primary.500" fontWeight="700" cursor="pointer">Create free account</Text>
              </Link>
            </HStack>
          </VStack>
        </MotionBox>
      </Flex>
    </Flex>
  );
}
