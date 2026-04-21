import React, { useContext, useEffect } from "react";
import Sidebar from "../Sidebar/";
import { Divider, Hide, HStack, Box, Flex, Spinner, Center } from "@chakra-ui/react";
import DashboardNavbar from "../DashboardNavbar";
import { UserContext } from "../../contexts/UserContext";
import { useRouter } from "next/router";

export default function DashboardLayout({ children }) {
  const { user } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    // Check if user is verified
    if (user && !user.isEmailVerified) {
      router.push(`/verify-email?email=${user.email}`);
    }
  }, [user, router]);

  // If user is unverified, don't render dashboard content while redirecting
  if (user && !user.isEmailVerified) {
    return (
      <Center h="100vh" w="full">
        <Spinner size="xl" color="blue.500" />
      </Center>
    );
  }

  return (
    <>
      <Flex
        w="full"
        h="auto"
        justifyContent="start"
        alignItems="start"
        position="relative"
      >
        <Hide below="md">
          <Sidebar />
        </Hide>

        <Flex bgColor="blue.50" flexDirection="column" w="full" minH="100vh" overflowX="hidden">
          <DashboardNavbar />
          <Box w="full" flex={1}>{children}</Box>
        </Flex>
      </Flex>
    </>
  );
}
