import React from "react";
import {
  Box,
  Flex,
  Icon,
  Heading,
  Text,
  Spinner,
  Image,
} from "@chakra-ui/react";
import CustomPassword from "../../components/Password";
import { CustomButton } from "../../components/Button";
import { GrStatusGood } from "react-icons/gr";
import CustomInput from "../../components/Input";
import changePasswordHooks from "./hooks";

export default function ForgotPasswordPage() {
  const { handleChange, handleContinue, isLoading } = changePasswordHooks();
  return (
    <Flex
      h={"100vh"}
      w={"full"}
      bg="#FFFFFF"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        w={"600px"}
        h={{ base: "650px", md: "600px" }}
        p="30px"
        rounded="24px"
      >
        <Image src="/images/ozone-pro-logo.png" h="70px" w="95px" />
        <Text
          textAlign="left"
          w="full"
          fontSize={24}
          fontWeight={600}
          textColor="blue.900"
          mt="30px"
        >
          Forgot Password?
        </Text>

        <Text w="90%">
          Please enter your email, a reset password link will be sent to you
        </Text>

        <CustomInput
          name="email"
          onChange={handleChange}
          label="Email"
          type="email"
          placeholder="example@abc.com"
        />

        <CustomButton
          isLoading={isLoading}
          loadingText="Loading..."
          spinner={<Spinner size="sm" />}
          onClick={handleContinue}
          mt="30px"
          bg="primary.500"
          // route="/"
        >
          Continue
        </CustomButton>
      </Box>
    </Flex>
  );
}
