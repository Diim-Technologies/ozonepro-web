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
  Badge,
  useColorModeValue,
  Spinner,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
} from "@chakra-ui/react";
import { People, MoneySend, EmptyWalletTime, ChartSquare, ProfileTick } from "iconsax-react";
import { useQuery } from "react-query";
import { fetchAdminStats, fetchAllTransfers } from "../../services/adminService";
import Link from "next/link";

const StatCard = ({ title, value, icon, color, helpText }) => {
  const cardBg = useColorModeValue("white", "gray.800");
  return (
    <Box p={6} bg={cardBg} rounded="3xl" boxShadow="xl" border="1px" borderColor="gray.100">
      <Flex justify="space-between" align="center">
        <Stat>
          <StatLabel color="gray.500" fontWeight="600">{title}</StatLabel>
          <StatNumber fontSize="3xl" fontWeight="800" mt={2}>{value}</StatNumber>
          {helpText && <StatHelpText mt={2}>{helpText}</StatHelpText>}
        </Stat>
        <Flex bg={`${color}.50`} p={4} rounded="2xl">
          <Icon as={icon} size="32" color={`${color}.500`} variant="Bold" />
        </Flex>
      </Flex>
    </Box>
  );
};

export default function AdminOverview() {
  const { data: stats, isLoading: isStatsLoading } = useQuery("adminStats", fetchAdminStats);
  const { data: transfers, isLoading: isTransfersLoading } = useQuery("allTransfers", fetchAllTransfers);

  const textColor = useColorModeValue("gray.800", "white");

  if (isStatsLoading) {
    return (
      <Flex h="80vh" align="center" justify="center">
        <Spinner size="xl" color="primary.500" thickness="4px" />
      </Flex>
    );
  }

  return (
    <Box p={{ base: 4, md: 8 }} bg="gray.50" minH="100vh">
      <VStack spacing={8} align="stretch">
        <VStack align="start" spacing={1}>
          <Heading size="lg" color={textColor}>Admin Dashboard</Heading>
          <Text color="gray.500">Welcome back! Here's what's happening across Ozone today.</Text>
        </VStack>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
          <StatCard 
            title="Total Users" 
            value={stats?.totalUsers || 0} 
            icon={People} 
            color="blue" 
          />
          <StatCard 
            title="Total Transfers" 
            value={stats?.totalTransfers || 0} 
            icon={MoneySend} 
            color="green" 
          />
          <StatCard 
            title="Total Volume" 
            value={`$${stats?.totalVolume?.toLocaleString() || 0}`} 
            icon={ChartSquare} 
            color="purple" 
          />
          <StatCard 
            title="Pending Transfers" 
            value={stats?.pendingTransfers || 0} 
            icon={EmptyWalletTime} 
            color="orange" 
            helpText={stats?.pendingTransfers > 0 ? "Requires action" : "All clear"}
          />
        </SimpleGrid>

        <Box bg="white" p={8} rounded="3xl" boxShadow="xl" border="1px" borderColor="gray.100">
            <Flex justify="space-between" align="center" mb={6}>
              <Heading size="md">Recent Transfers</Heading>
              <Link href="/admin/transfers">
                <Button size="sm" variant="ghost" colorScheme="blue">Manage All</Button>
              </Link>
            </Flex>

            {isTransfersLoading ? (
              <Flex h="200px" align="center" justify="center">
                <Spinner color="primary.500" />
              </Flex>
            ) : transfers?.length > 0 ? (
              <TableContainer>
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>Reference</Th>
                      <Th>User</Th>
                      <Th>Amount</Th>
                      <Th>Status</Th>
                      <Th>Date</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {transfers.slice(0, 5).map((tx) => (
                      <Tr key={tx.id}>
                        <Td fontWeight="600">{tx.reference}</Td>
                        <Td>{tx.user.firstName} {tx.user.lastName}</Td>
                        <Td fontWeight="700">${tx.totalAmount}</Td>
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
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            ) : (
              <Text color="gray.400" textAlign="center" py={10}>No transfers found.</Text>
            )}
        </Box>
      </VStack>
    </Box>
  );
}
