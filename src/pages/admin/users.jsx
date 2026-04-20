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
  Avatar,
  HStack,
  IconButton,
  Tooltip,
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
} from "@chakra-ui/react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { fetchAllUsers, updateUserStatus, softDeleteUser } from "../../services/adminService";
import DashboardLayout from "../../components/DashboardLayout";
import AdminGuard from "../../components/AdminGuard";
import { Trash, ExportCurve, Eye } from "iconsax-react";

function UserDetailModal({ user, isOpen, onClose }) {
  if (!user) return null;

  const InfoItem = ({ label, value }) => (
    <VStack align="start" spacing={0}>
      <Text fontSize="xs" color="gray.500" fontWeight="700" textTransform="uppercase">
        {label}
      </Text>
      <Text fontWeight="600">{value || "N/A"}</Text>
    </VStack>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay backdropFilter="blur(4px)" />
      <ModalContent rounded="2xl">
        <ModalHeader borderBottomWidth="1px">
          <HStack spacing={4}>
            <Avatar size="md" name={`${user.firstName} ${user.lastName}`} />
            <VStack align="start" spacing={0}>
              <Text fontSize="xl" fontWeight="800">{user.firstName} {user.lastName}</Text>
              <Text fontSize="sm" color="gray.500">User ID: {user.id}</Text>
            </VStack>
          </HStack>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody py={6}>
          <VStack spacing={6} align="stretch">
            <Box>
              <Heading size="xs" mb={4} color="blue.600" textTransform="uppercase">Personal Information</Heading>
              <SimpleGrid columns={2} spacing={4}>
                <InfoItem label="First Name" value={user.firstName} />
                <InfoItem label="Last Name" value={user.lastName} />
                <InfoItem label="Email Address" value={user.email} />
                <InfoItem label="Phone Number" value={user.phone} />
                <InfoItem label="Joined On" value={new Date(user.createdAt).toLocaleString()} />
                <InfoItem label="Last Updated" value={new Date(user.updatedAt).toLocaleString()} />
              </SimpleGrid>
            </Box>

            <Divider />

            <Box>
              <Heading size="xs" mb={4} color="blue.600" textTransform="uppercase">Account Status</Heading>
              <SimpleGrid columns={2} spacing={4}>
                <VStack align="start" spacing={0}>
                  <Text fontSize="xs" color="gray.500" fontWeight="700" textTransform="uppercase">Current Status</Text>
                  <Badge colorScheme={user.status === "ACTIVE" ? "green" : "red"} px={3} py={1} rounded="full">
                    {user.status}
                  </Badge>
                </VStack>
                <VStack align="start" spacing={0}>
                  <Text fontSize="xs" color="gray.500" fontWeight="700" textTransform="uppercase">Email Verified</Text>
                  <Badge colorScheme={user.isEmailVerified ? "green" : "orange"} px={3} py={1} rounded="full">
                    {user.isEmailVerified ? "VERIFIED" : "PENDING"}
                  </Badge>
                </VStack>
              </SimpleGrid>
            </Box>

            <Divider />

            <Box>
              <Heading size="xs" mb={4} color="blue.600" textTransform="uppercase">KYC & Activity</Heading>
              <SimpleGrid columns={2} spacing={4}>
                <VStack align="start" spacing={0}>
                  <Text fontSize="xs" color="gray.500" fontWeight="700" textTransform="uppercase">KYC Status</Text>
                  <Badge 
                    colorScheme={user.kyc?.verificationStatus === "VERIFIED" ? "green" : user.kyc?.verificationStatus === "REJECTED" ? "red" : "orange"} 
                    px={3} py={1} rounded="full"
                  >
                    {user.kyc?.verificationStatus || "NOT STARTED"}
                  </Badge>
                </VStack>
                <InfoItem label="Total Transactions" value={user._count?.transfers || 0} />
              </SimpleGrid>
            </Box>
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

function AdminUsersContent() {
  const queryClient = useQueryClient();
  const toast = useToast();
  const { data: users, isLoading } = useQuery("allUsers", fetchAllUsers);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedUser, setSelectedUser] = useState(null);

  const statusMutation = useMutation(
    ({ id, status }) => updateUserStatus(id, status),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("allUsers");
        toast({ title: "User status updated", status: "success" });
      },
    }
  );

  const deleteMutation = useMutation(
    (id) => softDeleteUser(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("allUsers");
        toast({ title: "User soft deleted", status: "success" });
      },
      onError: (err) => {
        toast({ title: "Failed to delete user", status: "error", description: err.message });
      }
    }
  );

  const handleToggleStatus = (id, currentStatus) => {
    const newStatus = currentStatus === "ACTIVE" ? "SUSPENDED" : "ACTIVE";
    statusMutation.mutate({ id, status: newStatus });
  };

  const handleDeleteUser = (id) => {
    if (window.confirm("Are you sure you want to delete this user? They will no longer be able to log in.")) {
      deleteMutation.mutate(id);
    }
  };

  const handleViewDetails = (user) => {
    setSelectedUser(user);
    onOpen();
  };

  const exportToCSV = () => {
    if (!users || users.length === 0) return;
    
    const headers = ["ID", "First Name", "Last Name", "Email", "Phone", "Status", "Joined", "Total Transfers"];
    const csvContent = [
      headers.join(","),
      ...users.map(u => [
        u.id,
        u.firstName,
        u.lastName,
        u.email,
        u.phone || "",
        u.status,
        new Date(u.createdAt).toISOString(),
        u._count?.transfers || 0
      ].join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `ozone_users_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
            <Heading size="lg">Manage Users</Heading>
            <Text color="gray.500">View and manage all registered users.</Text>
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

        <Box bg="white" p={8} rounded="3xl" boxShadow="xl" border="1px" borderColor="gray.100">
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Email</Th>
                  <Th>Phone</Th>
                  <Th>Status</Th>
                  <Th>KYC</Th>
                  <Th>Joined</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {users?.map((user) => (
                  <Tr key={user.id}>
                    <Td>
                      <HStack spacing={3}>
                        <Avatar size="sm" name={`${user.firstName} ${user.lastName}`} />
                        <Text fontWeight="600">{user.firstName} {user.lastName}</Text>
                      </HStack>
                    </Td>
                    <Td>{user.email}</Td>
                    <Td>{user.phone || "N/A"}</Td>
                    <Td>
                      <Badge 
                        colorScheme={user.status === "ACTIVE" ? "green" : "red"} 
                        variant="subtle" 
                        rounded="full" 
                        px={2}
                      >
                        {user.status}
                      </Badge>
                    </Td>
                    <Td>
                      <Badge 
                        colorScheme={user.kyc?.verificationStatus === "VERIFIED" ? "green" : user.kyc?.verificationStatus === "REJECTED" ? "red" : "orange"} 
                        variant="soft" 
                        rounded="full" 
                        px={2}
                        fontSize="xs"
                      >
                        {user.kyc?.verificationStatus || "NONE"}
                      </Badge>
                    </Td>
                    <Td fontSize="sm" color="gray.500">{new Date(user.createdAt).toLocaleDateString()}</Td>
                    <Td>
                      <HStack spacing={2}>
                        <Tooltip label="View Details">
                           <IconButton
                             size="xs"
                             icon={<Eye size="16" variant="Bold" />}
                             colorScheme="blue"
                             variant="ghost"
                             aria-label="View Details"
                             onClick={() => handleViewDetails(user)}
                           />
                        </Tooltip>
                        <Button 
                          size="xs" 
                          colorScheme={user.status === "ACTIVE" ? "orange" : "green"}
                          onClick={() => handleToggleStatus(user.id, user.status)}
                          isLoading={statusMutation.isLoading}
                        >
                          {user.status === "ACTIVE" ? "Suspend" : "Activate"}
                        </Button>
                        <Tooltip label="Soft Delete User">
                          <IconButton
                            size="xs"
                            icon={<Trash size="16" variant="Bold" />}
                            colorScheme="red"
                            aria-label="Delete User"
                            onClick={() => handleDeleteUser(user.id)}
                            isLoading={deleteMutation.isLoading}
                          />
                        </Tooltip>
                      </HStack>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </VStack>

      <UserDetailModal 
        user={selectedUser} 
        isOpen={isOpen} 
        onClose={onClose} 
      />
    </Box>
  );
}

export default function AdminUsers() {
  return (
    <AdminGuard>
      <DashboardLayout>
        <AdminUsersContent />
      </DashboardLayout>
    </AdminGuard>
  );
}
