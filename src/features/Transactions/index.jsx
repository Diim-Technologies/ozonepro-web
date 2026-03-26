import React, { useState } from "react";
import {
  Box,
  Flex,
  VStack,
  HStack,
  Text,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  useColorModeValue,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Spinner,
} from "@chakra-ui/react";
import { 
  SearchNormal1, 
  Filter, 
  CardSend, 
  ConvertCard, 
  ExportCurve, 
  ArrowDown, 
  ArrowUp,
  Receipt21
} from "iconsax-react";
import { useQuery } from "react-query";
import { fetchTransfers, getExchnagesByUserId } from "../../services/authService";

export default function TransactionsHistory() {
  const [filter, setFilter] = useState("ALL");
  const [search, setSearch] = useState("");

  const { data: transfers, isLoading: isTransfersLoading } = useQuery("userTransfers", fetchTransfers);
  const { data: exchanges, isLoading: isExchangesLoading } = useQuery("userExchanges", getExchnagesByUserId);

  const cardBg = useColorModeValue("white", "gray.800");

  // Combine and sort all activities
  const transferList = transfers?.data || (Array.isArray(transfers) ? transfers : []);
  const exchangeList = exchanges?.data || (Array.isArray(exchanges) ? exchanges : []);

  const allActivities = [
    ...transferList.map(t => ({ ...t, activityType: "TRANSFER" })),
    ...exchangeList.map(e => ({ ...e, activityType: "EXCHANGE" }))
  ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const filteredData = allActivities.filter(item => {
    const matchesSearch = item.reference?.toLowerCase().includes(search.toLowerCase()) || 
                          item.recipientAccountName?.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "ALL" || item.activityType === filter;
    return matchesSearch && matchesFilter;
  });

  const isLoading = isTransfersLoading || isExchangesLoading;

  return (
    <Box p={{ base: 4, md: 10 }} maxW="1200px" mx="auto">
      <VStack spacing={8} align="stretch">
        <Flex justify="space-between" align="center" direction={{ base: "column", md: "row" }} gap={4}>
          <VStack align="start" spacing={1}>
            <Heading size="lg" color="blue.900">Transaction History</Heading>
            <Text color="gray.500">View and manage all your past activities.</Text>
          </VStack>
          <Button leftIcon={<ExportCurve />} variant="outline" rounded="xl" colorScheme="blue">Export CSV</Button>
        </Flex>

        <Box bg={cardBg} p={6} rounded="3xl" boxShadow="xl" border="1px" borderColor="gray.100">
          <Flex mb={8} gap={4} direction={{ base: "column", md: "row" }}>
            <InputGroup maxW={{ md: "400px" }}>
              <InputLeftElement pointerEvents="none">
                <SearchNormal1 color="gray" size="20" />
              </InputLeftElement>
              <Input 
                placeholder="Search by reference or recipient..." 
                h="50px" 
                rounded="xl" 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </InputGroup>
            
            <HStack spacing={2}>
              <Menu>
                <MenuButton as={Button} leftIcon={<Filter />} variant="ghost" h="50px" rounded="xl">
                  {filter === "ALL" ? "All Activity" : filter}
                </MenuButton>
                <MenuList rounded="xl">
                  <MenuItem onClick={() => setFilter("ALL")}>All Activity</MenuItem>
                  <MenuItem onClick={() => setFilter("TRANSFER")}>Transfers</MenuItem>
                  <MenuItem onClick={() => setFilter("EXCHANGE")}>Exchanges</MenuItem>
                </MenuList>
              </Menu>
            </HStack>
          </Flex>

          {isLoading ? (
            <Flex h="400px" align="center" justify="center" direction="column">
              <Spinner size="xl" color="primary.500" thickness="4px" />
              <Text mt={4} color="gray.500" fontWeight="600">Loading history...</Text>
            </Flex>
          ) : filteredData.length > 0 ? (
            <Box overflowX="auto">
                <Table variant="simple">
                    <Thead>
                        <Tr>
                            <Th>Activity</Th>
                            <Th>Status</Th>
                            <Th>Date</Th>
                            <Th isNumeric>Value</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {filteredData.map((item, i) => (
                            <Tr key={i}>
                                <Td>
                                    <HStack spacing={4}>
                                        <Flex 
                                            bg={item.activityType === "TRANSFER" ? "blue.50" : "orange.50"} 
                                            p={3} 
                                            rounded="xl"
                                        >
                                            <Icon 
                                                as={item.activityType === "TRANSFER" ? CardSend : ConvertCard} 
                                                color={item.activityType === "TRANSFER" ? "blue.500" : "orange.500"} 
                                                size="24" 
                                            />
                                        </Flex>
                                        <VStack align="start" spacing={0}>
                                            <Text fontWeight="800" fontSize="md">
                                                {item.activityType === "TRANSFER" ? `Sent to ${item.recipientAccountName}` : "Currency Exchange"}
                                            </Text>
                                            <Text fontSize="xs" color="gray.500">{item.reference || "TX-RANDOM"}</Text>
                                        </VStack>
                                    </HStack>
                                </Td>
                                <Td>
                                    <Badge 
                                        colorScheme={item.status === "COMPLETED" ? "green" : item.status === "PENDING" ? "orange" : "red"} 
                                        rounded="full" 
                                        px={3} 
                                        py={1}
                                        variant="subtle"
                                    >
                                        {item.status}
                                    </Badge>
                                </Td>
                                <Td color="gray.500" fontSize="sm">
                                    {new Date(item.createdAt).toLocaleDateString(undefined, {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </Td>
                                <Td isNumeric>
                                    <VStack align="end" spacing={0}>
                                        <Text fontWeight="900" color={item.activityType === "TRANSFER" ? "red.500" : "green.500"}>
                                            {item.activityType === "TRANSFER" ? "-" : ""}{item.amount} {item.senderCurrency || item.fromCurrency}
                                        </Text>
                                        {item.activityType === "TRANSFER" && (
                                            <Text fontSize="xs" color="gray.400">Recipient gets {item.destinationAmount} {item.destinationCurrency}</Text>
                                        )}
                                    </VStack>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </Box>
          ) : (
            <Flex h="400px" align="center" justify="center" direction="column">
                <Icon as={Receipt21} size="80" color="gray.100" mb={4} variant="Bold" />
                <Heading size="md" color="gray.300">No Transactions Found</Heading>
                <Text color="gray.400">When you start sending or exchanging money, it will appear here.</Text>
            </Flex>
          )}
        </Box>
      </VStack>
    </Box>
  );
}
