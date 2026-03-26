import React from "react";
import {
  Flex,
  Box,
  Image,
  VStack,
  Text,
  Heading,
  Icon,
  Button,
  Spinner,
  Badge,
  HStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { TickCircle, CloseCircle, Refresh, ArrowRight } from "iconsax-react";
import useKycHooks from "./hooks";

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

export default function KYC() {
  const { kycData, isKycLoading, isInitiating, handleStartVerification } = useKycHooks();

  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("blue.100", "blue.900");

  const workflowId = process.env.NEXT_PUBLIC_DIDIT_WORKFLOW_ID || "wf_default";

  if (isKycLoading) {
    return (
      <Flex h="100vh" align="center" justify="center" direction="column">
        <Spinner size="xl" color="primary.500" mb={4} />
        <Text fontWeight="600">Loading verification details...</Text>
      </Flex>
    );
  }

  const kyc = kycData?.kyc;
  const status = kyc?.verificationStatus || "NOT_STARTED";

  const renderStatus = () => {
    switch (status) {
      case "VERIFIED":
        return (
          <VStack spacing={6} textAlign="center" py={10}>
            <Icon as={TickCircle} w={24} h={24} color="green.400" variant="Bold" />
            <Box>
              <Heading fontSize="3xl" mb={2}>Verified!</Heading>
              <Text fontSize="lg" color="gray.500">
                Your identity has been successfully verified.
              </Text>
            </Box>
            <Badge colorScheme="green" p={2} rounded="full" px={6} fontSize="md">
              Verification Active
            </Badge>
          </VStack>
        );
      case "REJECTED":
        return (
          <VStack spacing={6} textAlign="center" py={10}>
            <Icon as={CloseCircle} w={24} h={24} color="red.400" variant="Bold" />
            <Box>
              <Heading fontSize="3xl" mb={2}>Verification Rejected</Heading>
              <Text fontSize="lg" color="gray.500">
                We couldn't verify your identity. Please try again.
              </Text>
            </Box>
            <Button
              size="lg"
              colorScheme="blue"
              onClick={() => handleStartVerification(workflowId)}
              isLoading={isInitiating}
              leftIcon={<Refresh />}
            >
              Restart Verification
            </Button>
          </VStack>
        );
      case "PENDING":
        return (
          <VStack spacing={6} textAlign="center" py={10}>
            <Spinner size="xl" color="blue.400" mb={4} thickness="4px" />
            <Box>
              <Heading fontSize="3xl" mb={2}>In Review</Heading>
              <Text fontSize="lg" color="gray.500">
                We're checking your documents. This usually takes just a few minutes.
              </Text>
            </Box>
            <Badge colorScheme="orange" p={2} rounded="full" px={6} fontSize="md">
              Pending Approval
            </Badge>
          </VStack>
        );
      default:
        return (
          <VStack spacing={8} align="stretch" py={4}>
            <Box>
              <Heading fontSize="3xl" mb={3} color="blue.900">Get Verified</Heading>
              <Text fontSize="lg" color="gray.600">
                To enable all features including higher limits and faster transfers, please verify your identity.
              </Text>
            </Box>

            <VStack align="start" spacing={4} w="full">
              <HStack spacing={4}>
                <Flex bg="blue.50" p={3} rounded="xl" color="blue.600">
                  <Text fontWeight="800">1</Text>
                </Flex>
                <VStack align="start" spacing={0}>
                  <Text fontWeight="700">Prepare Identity Document</Text>
                  <Text color="gray.500" fontSize="sm">Passport, Driver's License or National ID</Text>
                </VStack>
              </HStack>
              <HStack spacing={4}>
                <Flex bg="blue.50" p={3} rounded="xl" color="blue.600">
                  <Text fontWeight="800">2</Text>
                </Flex>
                <VStack align="start" spacing={0}>
                  <Text fontWeight="700">Wait for System Result</Text>
                  <Text color="gray.500" fontSize="sm">Automated processing within seconds</Text>
                </VStack>
              </HStack>
            </VStack>

            <Button
              size="lg"
              h="70px"
              bg="primary.500"
              color="white"
              _hover={{ bg: "primary.600", transform: "translateY(-2px)" }}
              onClick={() => handleStartVerification(workflowId)}
              isLoading={isInitiating}
              rightIcon={<ArrowRight />}
              fontSize="xl"
              boxShadow="0 4px 14px 0 rgba(214, 51, 58, 0.39)"
            >
              Start Verification
            </Button>
            
            <Text fontSize="sm" color="gray.400" textAlign="center">
              Processing provided by <strong>Didit Identity</strong>. Your data is secure and encrypted.
            </Text>
          </VStack>
        );
    }
  };

  return (
    <Flex h="full" w="full" direction="column" bg="gray.50" minH="100vh">
      <Flex w="full" px={{ base: 4, md: 24 }} py={8} align="center">
        <Image src="/images/ozone-pro-logo.png" h="60px" />
      </Flex>

      <Flex flex={1} align="center" justify="center" px={4} pb={20}>
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          w="full"
          maxW="600px"
          bg={cardBg}
          p={{ base: 6, md: 12 }}
          rounded="3xl"
          boxShadow="2xl"
          border="1px"
          borderColor={borderColor}
        >
          {renderStatus()}
        </MotionBox>
      </Flex>
    </Flex>
  );
}
