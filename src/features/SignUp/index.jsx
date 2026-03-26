import React from "react";
import Link from "next/link";
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
  Heading,
  HStack,
  Checkbox,
  Link as ChakraLink,
  useColorModeValue,
  SimpleGrid,

  InputGroup,
  InputRightElement,
  IconButton,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Eye, EyeSlash, ArrowRight, Login } from "iconsax-react";
import signUpHooks from "./hooks";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const MotionBox = motion(Box);

export default function SignUpPage() {
  const {
    handleChange,
    handleSubmit,
    signUpDetails,
    handlePhoneChange,
    isLoading,
    disabled,
    confirmPassword,
    setConfirmPassword,
  } = signUpHooks();

  const [showPassword, setShowPassword] = React.useState(false);
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
            Start Your <Text as="span" color="primary.500">Journey</Text> with Ozone.
          </Heading>
          <Text fontSize="xl" color="gray.600" fontWeight="500">
            Experience borderless financial freedom. Fast, secure, and built for the modern world.
          </Text>
          <Link href="/login">
            <Button
              variant="outline"
              colorScheme="primary"
              size="lg"
              rounded="full"
              leftIcon={<Login size="20" />}
              px={10}
            >
              Sign In Instead
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

      {/* Right Section (Form) */}
      <Flex
        w={{ base: "full", lg: "55%" }}
        bg="white"
        align="center"
        justify="center"
        px={{ base: 6, md: 16 }}
        py={10}
        boxShadow="-20px 0 50px rgba(0,0,0,0.05)"
        overflowY="auto"
      >
        <MotionBox
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          w="full"
          maxW="600px"
        >
          <VStack spacing={8} align="stretch" py={8}>
            <VStack align="start" spacing={2}>
              <Heading fontSize="4xl" fontWeight="800">Create Account</Heading>
              <Text color="gray.500" fontSize="lg">Enter your details to get started</Text>
            </VStack>

            <VStack spacing={5} as="form" onSubmit={handleSubmit}>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5} w="full">
                <FormControl isRequired>
                  <FormLabel fontWeight="700">First Name</FormLabel>
                  <Input
                    name="firstName"
                    placeholder="John"
                    h="55px"
                    bg="gray.50"
                    border="none"
                    rounded="xl"
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel fontWeight="700">Last Name</FormLabel>
                  <Input
                    name="lastName"
                    placeholder="Doe"
                    h="55px"
                    bg="gray.50"
                    border="none"
                    rounded="xl"
                    onChange={handleChange}
                  />
                </FormControl>
              </SimpleGrid>

              <FormControl isRequired>
                <FormLabel fontWeight="700">Email Address</FormLabel>
                <Input
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  h="55px"
                  bg="gray.50"
                  border="none"
                  rounded="xl"
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel fontWeight="700">Phone Number</FormLabel>
                <Box className="premium-phone-input">
                  <PhoneInput
                    country={"ca"}
                    value={signUpDetails.phone}
                    onChange={handlePhoneChange}
                    inputStyle={{
                      width: "100%",
                      height: "55px",
                      background: "#F7FAFC",
                      border: "none",
                      borderRadius: "12px",
                      fontSize: "16px",
                    }}
                    buttonStyle={{
                      background: "transparent",
                      border: "none",
                      paddingLeft: "8px",
                    }}
                  />
                </Box>
              </FormControl>

              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5} w="full">
                <FormControl isRequired>
                  <FormLabel fontWeight="700">Password</FormLabel>
                  <InputGroup>
                    <Input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      h="55px"
                      bg="gray.50"
                      border="none"
                      rounded="xl"
                      onChange={handleChange}
                    />
                    <InputRightElement h="55px">
                      <IconButton
                        variant="ghost"
                        icon={showPassword ? <EyeSlash size="20" /> : <Eye size="20" />}
                        onClick={() => setShowPassword(!showPassword)}
                      />
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <FormControl isRequired>
                  <FormLabel fontWeight="700">Confirm Password</FormLabel>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    h="55px"
                    bg="gray.50"
                    border="none"
                    rounded="xl"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </FormControl>
              </SimpleGrid>

              <Box w="full" pt={2}>
                <Checkbox colorScheme="primary" defaultChecked>
                  <Text fontSize="sm" color="gray.600">
                    I agree to the{" "}
                    <ChakraLink color="primary.500" fontWeight="700">Terms of Service</ChakraLink> and{" "}
                    <ChakraLink color="primary.500" fontWeight="700">Privacy Policy</ChakraLink>
                  </Text>
                </Checkbox>
              </Box>

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
                isDisabled={disabled}
                _hover={{ bg: "primary.600", transform: "translateY(-2px)" }}
                transition="all 0.2s"
                boxShadow="0 10px 20px -5px rgba(214, 51, 58, 0.4)"
                rightIcon={<ArrowRight variant="Bold" />}
              >
                Create Account
              </Button>
            </VStack>

            <HStack justify="center">
              <Text color="gray.500">Already have an account?</Text>
              <Link href="/login">
                <Text color="primary.500" fontWeight="700" cursor="pointer">Sign In</Text>
              </Link>
            </HStack>
          </VStack>
        </MotionBox>
      </Flex>
    </Flex>
  );
}
