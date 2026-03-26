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
  Avatar,
  HStack,
  Button,
} from "@chakra-ui/react";
import { useQuery } from "react-query";
import { fetchAllKyc } from "../../services/adminService";
import DashboardLayout from "../../components/DashboardLayout";
import AdminGuard from "../../components/AdminGuard";

function AdminKycContent() {
  const { data: kycRecords, isLoading } = useQuery("allKyc", fetchAllKyc);

  const statusColors = {
    PENDING: "orange",
    VERIFIED: "green",
    REJECTED: "red",
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
        <VStack align="start" spacing={1}>
          <Heading size="lg">KYC Verifications</Heading>
          <Text color="gray.500">Monitor and manage user identity verifications.</Text>
        </VStack>

        <Box bg="white" p={8} rounded="3xl" boxShadow="xl" border="1px" borderColor="gray.100">
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>User</Th>
                  <Th>Document Type</Th>
                  <Th>Document Number</Th>
                  <Th>Status</Th>
                  <Th>Submitted At</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {kycRecords?.map((record) => (
                  <Tr key={record.id}>
                    <Td>
                      <HStack spacing={3}>
                        <Avatar size="sm" name={`${record.user.firstName} ${record.user.lastName}`} />
                        <VStack align="start" spacing={0}>
                          <Text fontWeight="600">{record.user.firstName} {record.user.lastName}</Text>
                          <Text fontSize="xs" color="gray.500">{record.user.email}</Text>
                        </VStack>
                      </HStack>
                    </Td>
                    <Td>{record.documentType}</Td>
                    <Td>{record.documentNumber}</Td>
                    <Td>
                      <Badge 
                        colorScheme={statusColors[record.verificationStatus] || "gray"} 
                        variant="subtle" 
                        rounded="full" 
                        px={2}
                      >
                        {record.verificationStatus}
                      </Badge>
                    </Td>
                    <Td fontSize="sm" color="gray.500">{new Date(record.createdAt).toLocaleDateString()}</Td>
                    <Td>
                         <Button size="xs" variant="outline" colorScheme="blue">Detail</Button>
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

export default function AdminKyc() {
  return (
    <AdminGuard>
      <DashboardLayout>
        <AdminKycContent />
      </DashboardLayout>
    </AdminGuard>
  );
}
