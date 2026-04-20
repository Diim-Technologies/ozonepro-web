import React, { useState } from "react";
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
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Divider,
  SimpleGrid,
  HStack,
  IconButton,
  Tooltip,
} from "@chakra-ui/react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { fetchAllTransfers, updateTransferStatus } from "../../services/adminService";
import DashboardLayout from "../../components/DashboardLayout";
import AdminGuard from "../../components/AdminGuard";
import { ExportCurve, Eye } from "iconsax-react";

function TransferDetailModal({ transfer, isOpen, onClose }) {
  if (!transfer) return null;

  const InfoItem = ({ label, value, isNumeric = false }) => (
    <VStack align={isNumeric ? "end" : "start"} spacing={0}>
      <Text fontSize="xs" color="gray.500" fontWeight="700" textTransform="uppercase">
        {label}
      </Text>
      <Text fontWeight="600">{value || "N/A"}</Text>
    </VStack>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalOverlay backdropFilter="blur(4px)" />
      <ModalContent rounded="2xl" mx={4}>
        <ModalHeader borderBottomWidth="1px">
          <VStack align="start" spacing={0}>
            <Text fontSize="xl" fontWeight="800">Transfer Details</Text>
            <Text fontSize="sm" color="gray.500">Ref: {transfer.reference}</Text>
          </VStack>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody py={6}>
          <VStack spacing={6} align="stretch">
            {/* Amount Breakdown */}
            <Box bg="gray.50" p={4} rounded="xl">
              <SimpleGrid columns={3} spacing={4}>
                <InfoItem label="Amount Sent" value={`${transfer.amount} ${transfer.senderCurrency}`} />
                <InfoItem label="Exchange Rate" value={transfer.exchangeRate} />
                <InfoItem label="Recipient Gets" value={`${transfer.convertedAmount} ${transfer.destinationCurrency}`} />
                <InfoItem label="Fees" value={`${transfer.feeAmount} ${transfer.senderCurrency}`} />
                <InfoItem label="Total Paid" value={`${transfer.totalAmount} ${transfer.senderCurrency}`} />
                <VStack align="start" spacing={0}>
                   <Text fontSize="xs" color="gray.500" fontWeight="700" textTransform="uppercase">Status</Text>
                   <Badge 
                     colorScheme={transfer.status === "COMPLETED" ? "green" : transfer.status === "PENDING" ? "orange" : "red"} 
                     rounded="full" px={3} py={1}
                     variant="subtle"
                   >
                     {transfer.status}
                   </Badge>
                </VStack>
              </SimpleGrid>
            </Box>

            <Divider />

            {/* Sender & Recipient */}
            <SimpleGrid columns={2} spacing={8}>
              <Box>
                <Heading size="xs" mb={4} color="blue.600" textTransform="uppercase">Sender Information</Heading>
                <VStack align="start" spacing={3}>
                  <InfoItem label="Name" value={`${transfer.user?.firstName} ${transfer.user?.lastName}`} />
                  <InfoItem label="Email" value={transfer.user?.email} />
                  <InfoItem label="Phone" value={transfer.user?.phone} />
                </VStack>
              </Box>
              <Box>
                <Heading size="xs" mb={4} color="blue.600" textTransform="uppercase">Recipient Information</Heading>
                <VStack align="start" spacing={3}>
                  <InfoItem label="Name" value={transfer.recipientAccountName} />
                  <InfoItem label="Bank" value={transfer.recipientBankName} />
                  <InfoItem label="Account Number" value={transfer.recipientAccountNumber} />
                  <InfoItem label="Bank Code" value={transfer.recipientBankCode} />
                  <InfoItem label="Country" value={transfer.recipientCountry} />
                </VStack>
              </Box>
            </SimpleGrid>

            <Divider />

            {/* Timestamps */}
            <SimpleGrid columns={2} spacing={4}>
              <InfoItem label="Created At" value={new Date(transfer.createdAt).toLocaleString()} />
              <InfoItem label="Last Updated" value={new Date(transfer.updatedAt).toLocaleString()} />
            </SimpleGrid>
          </VStack>
        </ModalBody>
        <ModalFooter borderTopWidth="1px">
          <Button variant="ghost" mr={3} onClick={onClose}>Close</Button>
          <Button colorScheme="blue" onClick={onClose}>Done</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

function AdminTransfersContent() {
  const queryClient = useQueryClient();
  const toast = useToast();
  const { data: transfers, isLoading } = useQuery("allTransfers", fetchAllTransfers);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedTransfer, setSelectedTransfer] = useState(null);

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

  const handleViewDetails = (tx) => {
    setSelectedTransfer(tx);
    onOpen();
  };

  const exportToCSV = () => {
    if (!transfers || transfers.length === 0) return;
    
    const headers = [
      "Reference", "Sender Name", "Sender Email", "Recipient Name", "Recipient Bank", 
      "Recipient Account", "Amount Sent", "Currency", "Destination Amount", "Dest Currency", 
      "Status", "Date"
    ];
    
    const csvContent = [
      headers.join(","),
      ...transfers.map(tx => [
        tx.reference,
        `"${tx.user?.firstName} ${tx.user?.lastName}"`,
        tx.user?.email,
        `"${tx.recipientAccountName}"`,
        `"${tx.recipientBankName}"`,
        tx.recipientAccountNumber,
        tx.amount,
        tx.senderCurrency,
        tx.convertedAmount,
        tx.destinationCurrency,
        tx.status,
        new Date(tx.createdAt).toISOString()
      ].join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `ozone_transfers_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
    <Box p={{ base: 4, md: 8 }} bg="gray.50" minH="100vh">
      <VStack spacing={8} align="stretch">
        <Flex justify="space-between" align="center">
          <VStack align="start" spacing={1}>
            <Heading size="lg">Manage All Transfers</Heading>
            <Text color="gray.500">Track and update the status of all international transfers.</Text>
          </VStack>
          <Button 
            leftIcon={<ExportCurve />} 
            colorScheme="blue" 
            variant="outline" 
            rounded="xl"
            onClick={exportToCSV}
          >
            Export CSV
          </Button>
        </Flex>

        <Box bg="white" p={8} rounded="3xl" boxShadow="xl" border="1px" borderColor="gray.100" overflowX="auto">
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
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {transfers?.map((tx) => (
                  <Tr key={tx.id}>
                    <Td fontWeight="700" fontSize="sm">{tx.reference}</Td>
                    <Td>
                      <VStack align="start" spacing={0}>
                        <Text fontWeight="600" fontSize="sm">{tx.user?.firstName} {tx.user?.lastName}</Text>
                        <Text fontSize="xs" color="gray.500">{tx.user?.email}</Text>
                      </VStack>
                    </Td>
                    <Td>
                      <VStack align="start" spacing={0}>
                        <Text fontWeight="600" fontSize="sm">{tx.recipientAccountName}</Text>
                        <Text fontSize="xs" color="gray.500">{tx.recipientBankName}</Text>
                      </VStack>
                    </Td>
                    <Td fontWeight="700">${tx.totalAmount}</Td>
                    <Td>
                      <Badge 
                        colorScheme={statusColors[tx.status] || "gray"} 
                        variant="subtle" 
                        rounded="full" 
                        px={2}
                        fontSize="xs"
                      >
                        {tx.status}
                      </Badge>
                    </Td>
                    <Td fontSize="sm" color="gray.500">{new Date(tx.createdAt).toLocaleDateString()}</Td>
                    <Td>
                      <HStack spacing={2}>
                        <Tooltip label="View Details">
                           <IconButton
                             size="sm"
                             icon={<Eye size="18" variant="Bold" />}
                             colorScheme="blue"
                             variant="ghost"
                             aria-label="View Details"
                             onClick={() => handleViewDetails(tx)}
                           />
                        </Tooltip>
                        <Select 
                          size="sm" 
                          maxW="130px"
                          value={tx.status} 
                          onChange={(e) => handleStatusChange(tx.id, e.target.value)}
                          disabled={mutation.isLoading}
                          rounded="lg"
                        >
                          <option value="PENDING">Pending</option>
                          <option value="PROCESSING">Processing</option>
                          <option value="COMPLETED">Completed</option>
                          <option value="FAILED">Failed</option>
                        </Select>
                      </HStack>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </VStack>

      <TransferDetailModal 
        transfer={selectedTransfer} 
        isOpen={isOpen} 
        onClose={onClose} 
      />
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
