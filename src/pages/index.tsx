import Head from "next/head";
import { Box, Center, Heading, Text, VStack } from "@chakra-ui/react";

export default function OutOfService() {
  return (
    <>
      <Head>
        <title>OzonePro Financial - Temporarily Out of Service</title>
      </Head>

      <Center minH="100vh" bg="gray.50">
        <VStack spacing={4} textAlign="center" px={6}>
          <Heading
            as="h1"
            fontSize={{ base: "2xl", md: "4xl" }}
            color="gray.700"
          >
            OzonePro Financial
          </Heading>
          <Text fontSize={{ base: "md", md: "lg" }} color="gray.500">
            is temporarily out of service.
          </Text>
          <Text fontSize="sm" color="gray.400" mt={2}>
            We apologize for the inconvenience. Please check back later.
          </Text>
          <Text fontSize="sm" color="gray.500" mt={4}>
            For all enquiries regarding previous transactions, do reach us
            on: <Text as="span" fontWeight="bold">587 288 7411</Text>
          </Text>
        </VStack>
      </Center>
    </>
  );
}
