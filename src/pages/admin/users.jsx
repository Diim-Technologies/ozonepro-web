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
  Avatar,
  HStack,
  IconButton,
  Tooltip,
} from "@chakra-ui/react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { fetchAllUsers, updateUserStatus, softDeleteUser } from "../../services/adminService";
import DashboardLayout from "../../components/DashboardLayout";
import AdminGuard from "../../components/AdminGuard";
import { Trash } from "iconsax-react";

function AdminUsersContent() {
  const queryClient = useQueryClient();
  const toast = useToast();
  const { data: users, isLoading } = useQuery("allUsers", fetchAllUsers);

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
          <Heading size="lg">Manage Users</Heading>
          <Text color="gray.500">View and manage all registered users.</Text>
        </VStack>

        <Box bg="white" p={8} rounded="3xl" boxShadow="xl" border="1px" borderColor="gray.100">
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Email</Th>
                  <Th>Phone</Th>
                  <Th>Status</Th>
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
                    <Td fontSize="sm" color="gray.500">{new Date(user.createdAt).toLocaleDateString()}</Td>
                    <Td>
                      <HStack spacing={2}>
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
