import React from "react";
import { Box, Heading, Text, Flex, Skeleton } from "@chakra-ui/react";
import profileHooks from "./hooks";

export default function ProfilePage() {
  const { userProfile, isLoading } = profileHooks();
  console.log(userProfile);

  // const { profile } = userProfile;
  return (
    <Box p="30px">
      <Heading fontSize={{ md: 20, lg: 24 }}>Profile</Heading>

      <Flex gap={5} pt="20px" flexDirection={{ base: "column", md: "row" }}>
        <Box w={{ base: "full", md: "40%" }}>
          {isLoading ? (
            <>
              <Box pb="10px">
                <Skeleton w="100px" h="20px" />
              </Box>
              <Skeleton height="20px" />
            </>
          ) : (
            <>
              <Text fontWeight={500} fontSize={{ base: 18, md: 20 }}>
                First Name
              </Text>
              <Text>{userProfile?.profile?.firstname}</Text>
            </>
          )}
        </Box>

        <Box w={{ base: "full", md: "40%" }}>
          {isLoading ? (
            <>
              <Box pb="10px">
                <Skeleton w="100px" h="20px" />
              </Box>
              <Skeleton height="20px" />
            </>
          ) : (
            <>
              <Text fontWeight={500} fontSize={{ base: 18, md: 20 }}>
                Last Name
              </Text>
              <Text>{userProfile?.profile?.lastname}</Text>
            </>
          )}
        </Box>
      </Flex>

      <Flex gap={5} pt="20px" flexDirection={{ base: "column", md: "row" }}>
        <Box w={{ base: "full", md: "40%" }}>
          {isLoading ? (
            <>
              <Box pb="10px">
                <Skeleton w="100px" h="20px" />
              </Box>
              <Skeleton height="20px" />
            </>
          ) : (
            <>
              <Text fontWeight={500} fontSize={{ base: 18, md: 20 }}>
                Email
              </Text>
              <Text>{userProfile?.profile?.email}</Text>
            </>
          )}
        </Box>

        <Box w={{ base: "full", md: "40%" }}>
          {isLoading ? (
            <>
              <Box pb="10px">
                <Skeleton w="100px" h="20px" />
              </Box>
              <Skeleton height="20px" />
            </>
          ) : (
            <>
              <Text fontWeight={500} fontSize={{ base: 18, md: 20 }}>
                Phone
              </Text>
              <Text>{userProfile?.profile?.phone}</Text>
            </>
          )}
        </Box>
      </Flex>
    </Box>
  );
}
