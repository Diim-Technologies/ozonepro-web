import React from "react";
import Sidebar from "../Sidebar/";
import { Divider, Hide, HStack, Box, Flex } from "@chakra-ui/react";
import DashboardNavbar from "../DashboardNavbar";

export default function DashboardLayout({ children }) {
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
