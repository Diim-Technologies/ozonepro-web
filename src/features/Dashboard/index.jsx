import React from "react";
import {
  Box,
  Flex,
  SimpleGrid,
  Text,
  Heading,
  VStack,
  HStack,
  Icon,
  Button,
  Badge,
  useColorModeValue,
  Avatar,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  IconButton,
  Spinner,
  Skeleton,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import {
  CardSend,
  ConvertCard,
  Verify,
  NotificationCircle,
  EmptyWalletTime,
} from "iconsax-react";
import { useQuery } from "react-query";
import useKycHooks from "../KYC/hooks";
import Link from "next/link";
import ExchangeCalculator from "../../components/ExchangeCalculator";
import { getExchnagesByUserId, fetchProfile } from "../../services/authService";

const MotionBox = motion(Box);

export default function DashboardPage() {
  const { kycData } = useKycHooks();
  const kycStatus = kycData?.kyc?.verificationStatus || "NOT_STARTED";

  const { data: userProfile, isLoading: isProfileLoading } = useQuery("userProfile", fetchProfile);
  const { data: transactions, isLoading: isTransactionsLoading } = useQuery("userTransactions", getExchnagesByUserId);

  const cardBg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.800", "white");
  const secondaryColor = useColorModeValue("gray.500", "gray.400");

  return (
    <Box p={{ base: 4, md: 8 }} bg="gray.50" minH="100vh">
      <VStack spacing={8} align="stretch">
        {/* Top Navbar Simulation inside dashboard */}
        <Flex justify="space-between" align="center">
          <VStack align="start" spacing={1}>
            <Skeleton isLoaded={!isProfileLoading}>
              <Heading size="lg" color={textColor}>
                Hello, {userProfile?.firstName || "there"}! 👋
              </Heading>
            </Skeleton>
            <Text color={secondaryColor}>Manage your transfers and track your activities.</Text>
          </VStack>
          <HStack spacing={4}>
            <IconButton
              aria-label="Notifications"
              icon={<NotificationCircle />}
              variant="ghost"
              rounded="full"
              fontSize="24px"
            />
            <Avatar size="md" name={`${userProfile?.firstName} ${userProfile?.lastName}`} bg="primary.500" color="white" />
          </HStack>
        </Flex>

        {/* KYC Banner if not verified */}
        {kycStatus !== "VERIFIED" && (
          <MotionBox
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            bg="blue.600"
            color="white"
            p={6}
            rounded="3xl"
            position="relative"
            overflow="hidden"
            boxShadow="0 10px 30px -10px rgba(49, 101, 140, 0.4)"
          >
            <Flex direction={{ base: "column", md: "row" }} align="center" justify="space-between" position="relative" zIndex={1}>
              <HStack spacing={4} mb={{ base: 4, md: 0 }}>
                <Flex bg="whiteAlpha.300" p={3} rounded="2xl" flexShrink={0}>
                  <Verify size="32" variant="Bold" />
                </Flex>
                <VStack align="start" spacing={0}>
                  <Text fontWeight="800" fontSize="xl">Verify Your Identity</Text>
                  <Text opacity={0.9} fontSize="md">Unlock international transfers by completing your KYC.</Text>
                </VStack>
              </HStack>
              <Link href="/kyc">
                <Button
                  bg="white"
                  color="blue.600"
                  size="lg"
                  rounded="full"
                  px={10}
                  _hover={{ transform: "translateY(-2px)", boxShadow: "xl" }}
                  transition="all 0.2s"
                >
                  Start Verification
                </Button>
              </Link>
            </Flex>
            <Box position="absolute" top="-50px" right="-50px" w="150px" h="150px" bg="whiteAlpha.100" rounded="full" />
          </MotionBox>
        )}

        <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={8}>
          {/* Recent Activity Table */}
          <Box gridColumn={{ lg: "span 2" }} bg={cardBg} p={8} rounded="3xl" boxShadow="xl" border="1px" borderColor="gray.100" minH="400px">
            <Flex justify="space-between" align="center" mb={6}>
              <Heading size="md" color={textColor}>Recent Transactions</Heading>
              <Link href="/dashboard/transactions">
                <Button size="sm" variant="ghost" colorScheme="blue">View All</Button>
              </Link>
            </Flex>

            {isTransactionsLoading ? (
              <Flex h="300px" align="center" justify="center" direction="column">
                <Spinner size="lg" color="primary.500" mb={4} />
                <Text color="gray.500">Loading your transactions...</Text>
              </Flex>
            ) : transactions?.length > 0 ? (
              <TableContainer>
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>Reference</Th>
                      <Th>Status</Th>
                      <Th>Date</Th>
                      <Th isNumeric>Amount</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {(transactions?.data || (Array.isArray(transactions) ? transactions : [])).slice(0, 5).map((tx, i) => (
                      <Tr key={i}>
                        <Td>
                          <HStack spacing={3}>
                            <Flex bg="blue.50" p={2} rounded="lg">
                              <CardSend size="20" color="#3182ce" />
                            </Flex>
                            <VStack align="start" spacing={0}>
                              <Text fontWeight="700" fontSize="sm">{tx.reference || "Transfer"}</Text>
                              <Text fontSize="xs" color="gray.500">{tx.type || "Money Out"}</Text>
                            </VStack>
                          </HStack>
                        </Td>
                        <Td>
                          <Badge 
                            colorScheme={tx.status === "COMPLETED" ? "green" : tx.status === "PENDING" ? "orange" : "red"} 
                            variant="subtle" 
                            rounded="full" 
                            px={2}
                          >
                            {tx.status}
                          </Badge>
                        </Td>
                        <Td fontSize="sm" color="gray.500">{new Date(tx.createdAt).toLocaleDateString()}</Td>
                        <Td isNumeric fontWeight="700" color={tx.type === "IN" ? "green.500" : "red.500"}>
                          {tx.type === "IN" ? "+" : "-"}${tx.amount}
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            ) : (
              <Flex h="300px" align="center" justify="center" direction="column">
                <Icon as={EmptyWalletTime} size="64" color="gray.200" mb={4} variant="Bold" />
                <Text color="gray.400" fontWeight="600">No transactions yet</Text>
                <Text color="gray.400" fontSize="sm">Your transfer history will appear here.</Text>
              </Flex>
            )}
          </Box>

          {/* Quick Transfer / Exchange Shortcut */}
          <VStack spacing={6} align="stretch" h="full">
             <ExchangeCalculator fullWidth isShortcut />
             
             <Link href="/dashboard/transfers">
              <MotionBox
                whileHover={{ scale: 1.02 }}
                bg="primary.500"
                p={6}
                rounded="3xl"
                color="white"
                cursor="pointer"
                boxShadow="0 15px 30px -10px rgba(214, 51, 58, 0.4)"
              >
                  <Flex align="center" justify="space-between">
                    <VStack align="start" spacing={1}>
                      <Text fontWeight="800" fontSize="lg">New Money Transfer</Text>
                      <Text opacity={0.8} fontSize="sm">Send funds instantly</Text>
                    </VStack>
                    <Flex bg="whiteAlpha.300" p={3} rounded="2xl" flexShrink={0}>
                      <ConvertCard size="24" variant="Bold" />
                    </Flex>
                  </Flex>
              </MotionBox>
             </Link>
          </VStack>
        </SimpleGrid>
      </VStack>
    </Box>
  );
}
