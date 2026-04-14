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
import resetPasswordHooks from "./hooks";

export default function ResetPasswordPage() {
  const { handleChange, handleContinue, isLoading } = resetPasswordHooks();
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
          Please enter the verification code sent to your email and your new password.
        </Text>

        <CustomInput
          name="token"
          onChange={handleChange}
          label="Verification Code"
          placeholder="6-digit code"
        />

        <CustomPassword
          name="password"
          onChange={handleChange}
          label="New Password"
          placeholder="New Password"
        />

        <CustomPassword
          name="confirmPassword"
          onChange={handleChange}
          label="Confirm New Password"
          placeholder="Confirm New Password"
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
