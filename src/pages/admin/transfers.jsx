import React from "react";
import {
  Box,
  Flex,
  Heading,
  VStack,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Badge,
  Spinner,
  Button,
  useToast,
  Select,
} from "@chakra-ui/react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { fetchAllTransfers, updateTransferStatus } from "../../services/adminService";
import DashboardLayout from "../../components/DashboardLayout";
import AdminGuard from "../../components/AdminGuard";

function AdminTransfersContent() {
  const queryClient = useQueryClient();
  const toast = useToast();
  const { data: transfers, isLoading } = useQuery("allTransfers", fetchAllTransfers);

  const mutation = useMutation(
    ({ id, status }) => updateTransferStatus(id, status),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("allTransfers");
        toast({ title: "Transfer status updated", status: "success" });
      },
    }
  );

  const handleStatusChange = (id, newStatus) => {
    mutation.mutate({ id, status: newStatus });
  };

  const statusColors = {
    PENDING: "orange",
    PROCESSING: "blue",
    COMPLETED: "green",
    FAILED: "red",
  };

  if (isLoading) {
    return (
      <Flex h="80vh" align="center" justify="center">
        <Spinner size="xl" color="primary.500" thickness="4px" />
      </Flex>
    );
  }

  return (
    <Box p={{ base: 4, md: 8 }} bg="gray.50" minH="100vh" overflowX="auto">
      <VStack spacing={8} align="stretch" minW="1000px">
        <VStack align="start" spacing={1}>
          <Heading size="lg">Manage All Transfers</Heading>
          <Text color="gray.500">Track and update the status of all international transfers.</Text>
        </VStack>

        <Box bg="white" p={8} rounded="3xl" boxShadow="xl" border="1px" borderColor="gray.100">
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Reference</Th>
                  <Th>Sender</Th>
                  <Th>Recipient</Th>
                  <Th>Amount</Th>
                  <Th>Status</Th>
                  <Th>Date</Th>
                  <Th>Update Status</Th>
                </Tr>
              </Thead>
              <Tbody>
                {transfers?.map((tx) => (
                  <Tr key={tx.id}>
                    <Td fontWeight="700">{tx.reference}</Td>
                    <Td>
                      <VStack align="start" spacing={0}>
                        <Text fontWeight="600">{tx.user.firstName} {tx.user.lastName}</Text>
                        <Text fontSize="xs" color="gray.500">{tx.user.email}</Text>
                      </VStack>
                    </Td>
                    <Td>
                      <VStack align="start" spacing={0}>
                        <Text fontWeight="600">{tx.recipientAccountName}</Text>
                        <Text fontSize="xs" color="gray.500">{tx.recipientBankName} - {tx.recipientAccountNumber}</Text>
                      </VStack>
                    </Td>
                    <Td fontWeight="700">${tx.totalAmount}</Td>
                    <Td>
                      <Badge 
                        colorScheme={statusColors[tx.status] || "gray"} 
                        variant="subtle" 
                        rounded="full" 
                        px={2}
                      >
                        {tx.status}
                      </Badge>
                    </Td>
                    <Td fontSize="sm" color="gray.500">{new Date(tx.createdAt).toLocaleDateString()}</Td>
                    <Td>
                      <Select 
                        size="sm" 
                        value={tx.status} 
                        onChange={(e) => handleStatusChange(tx.id, e.target.value)}
                        disabled={mutation.isLoading}
                      >
                        <option value="PENDING">Pending</option>
                        <option value="PROCESSING">Processing</option>
                        <option value="COMPLETED">Completed</option>
                        <option value="FAILED">Failed</option>
                      </Select>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </VStack>
    </Box>
  );
}

export default function AdminTransfers() {
  return (
    <AdminGuard>
      <DashboardLayout>
        <AdminTransfersContent />
      </DashboardLayout>
    </AdminGuard>
  );
}
