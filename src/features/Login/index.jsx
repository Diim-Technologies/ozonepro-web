import React from "react";
import { Flex, Box, Image, HStack, Text, Spinner } from "@chakra-ui/react";
import CustomInput from "../../components/Input";
import CustomPassword from "../../components/Password";
import { CustomButton } from "../../components/Button";
import loginHooks from "./hooks";
import AuthHero from "../../components/AuthHero";
import Link from "next/link";

export default function LoginPage() {
  const { handleSubmit, handleChange, isLoading } = loginHooks();
  return (
    <Flex h="100vh">
      <Box
        // py="56px"
        // px="38px"
        h="100vh"
        w={{ base: "full", md: "50%" }}
        display={{ base: "none", lg: "flex" }}
        alignItems="center"
      >
        <AuthHero />
      </Box>

      <Box
        overflowY="scroll"
        w={{ base: "full", lg: "50%" }}
        mx="auto"
        p={{ base: "10px", md: "30px" }}
      >
        <Box w={{ base: "full", md: "80%" }} mx="auto">
          <Image src="/images/ozone-pro-logo.png" h="100px" w="135px" />

          <Flex
            pt="50px"
            w={{ base: "200px", md: "full", lg: "200px", xl: "full" }}
            // justifyContent={{
            //   base: "flex-start",
            //   md: "space-between",
            //   lg: "flex-start",
            //   xl: "space-between",
            // }}
            alignItems="center"
            // gap={5}
            flexDirection={{
              base: "column",
              md: "row",
              lg: "column",
              xl: "row",
            }}
          >
            <Text
              textAlign="left"
              w="full"
              fontSize={24}
              fontWeight={600}
              textColor="blue.900"
            >
              Welcome Back!
            </Text>

            <CustomButton
              // textAlign={{
              //   base: "left",
              //   md: "right",
              //   lg: "left",
              //   xl: "right",
              // }}
              w="full"
              textColor="primary.500"
              route="/signup"
              fontWeight={400}
              px="0px"
            >
              Need an Account? Register
            </CustomButton>
          </Flex>

          {/* <Text py="15px" fontWeight={500} textColor="blue.900">
            Sign in
          </Text> */}

          <CustomInput
            name="identifier"
            onChange={handleChange}
            label="Email"
            type="email"
            placeholder="example@abc.com"
          />

          <CustomPassword
            name="password"
            onChange={handleChange}
            label="Password"
            placeholder="Password"
          />

          <Box pt="70px">
            <CustomButton
              isLoading={isLoading}
              loadingText="Loading..."
              spinner={<Spinner size="sm" />}
              onClick={handleSubmit}
              bg="primary.500"
            >
              Continue
            </CustomButton>
          </Box>

          <Link href="/forgot-password">
            <Text py="30px" fontWeight={500} textColor="primary.500">
              Forgot Password?
            </Text>
          </Link>
        </Box>
      </Box>
    </Flex>
  );
}
