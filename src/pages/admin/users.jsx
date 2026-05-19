import React, { useState, useMemo } from "react";
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
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { fetchAllUsers, updateUserStatus, softDeleteUser, adminUpdateUserDetails } from "../../services/adminService";
import DashboardLayout from "../../components/DashboardLayout";
import AdminGuard from "../../components/AdminGuard";
import { Trash, ExportCurve, Eye, SearchNormal, Edit2 } from "iconsax-react";

function UserDetailModal({ user, isOpen, onClose }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});
  const queryClient = useQueryClient();
  const toast = useToast();

  React.useEffect(() => {
    if (user) {
      setEditForm({
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone || "",
        role: user.role || "USER",
      });
      setIsEditing(false);
    }
  }, [user]);

  const updateMutation = useMutation(
    (data) => adminUpdateUserDetails(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("allUsers");
        toast({ title: "User details updated", status: "success" });
        setIsEditing(false);
      },
      onError: (err) => {
        toast({ title: "Failed to update", status: "error", description: err.message });
      }
    }
  );

  const handleSave = () => {
    updateMutation.mutate({ id: user.id, ...editForm });
  };

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
    <Modal isOpen={isOpen} onClose={onClose} size="xl" scrollBehavior="inside">
      <ModalOverlay backdropFilter="blur(4px)" />
      <ModalContent rounded="2xl">
        <ModalHeader borderBottomWidth="1px">
          <HStack justify="space-between" align="center" mr={8}>
            <HStack spacing={4}>
              <Avatar size="md" name={`${user.firstName} ${user.lastName}`} />
              <VStack align="start" spacing={0}>
                <Text fontSize="xl" fontWeight="800">{user.firstName} {user.lastName}</Text>
                <Text fontSize="sm" color="gray.500">User ID: {user.id}</Text>
              </VStack>
            </HStack>
            <Button size="sm" leftIcon={<Edit2 size="16" />} onClick={() => setIsEditing(!isEditing)} variant={isEditing ? "solid" : "outline"} colorScheme="blue">
              {isEditing ? "Cancel Edit" : "Edit"}
            </Button>
          </HStack>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody py={6}>
          <VStack spacing={6} align="stretch">
            <Box>
              <Heading size="xs" mb={4} color="blue.600" textTransform="uppercase">Personal Information</Heading>
              {isEditing ? (
                <SimpleGrid columns={2} spacing={4}>
                  <FormControl>
                    <FormLabel fontSize="xs" color="gray.500" fontWeight="700" textTransform="uppercase">First Name</FormLabel>
                    <Input value={editForm.firstName} onChange={(e) => setEditForm({ ...editForm, firstName: e.target.value })} />
                  </FormControl>
                  <FormControl>
                    <FormLabel fontSize="xs" color="gray.500" fontWeight="700" textTransform="uppercase">Last Name</FormLabel>
                    <Input value={editForm.lastName} onChange={(e) => setEditForm({ ...editForm, lastName: e.target.value })} />
                  </FormControl>
                  <FormControl>
                    <FormLabel fontSize="xs" color="gray.500" fontWeight="700" textTransform="uppercase">Phone</FormLabel>
                    <Input value={editForm.phone} onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })} />
                  </FormControl>
                  <FormControl>
                    <FormLabel fontSize="xs" color="gray.500" fontWeight="700" textTransform="uppercase">Role</FormLabel>
                    <Select value={editForm.role} onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}>
                      <option value="USER">USER</option>
                      <option value="ADMIN">ADMIN</option>
                    </Select>
                  </FormControl>
                </SimpleGrid>
              ) : (
                <SimpleGrid columns={2} spacing={4}>
                  <InfoItem label="First Name" value={user.firstName} />
                  <InfoItem label="Last Name" value={user.lastName} />
                  <InfoItem label="Email Address" value={user.email} />
                  <InfoItem label="Phone Number" value={user.phone} />
                  <InfoItem label="Role" value={user.role} />
                  <InfoItem label="Joined On" value={new Date(user.createdAt).toLocaleString()} />
                </SimpleGrid>
              )}
            </Box>

            <Divider />

            <Box>
              <Heading size="xs" mb={4} color="blue.600" textTransform="uppercase">Account Status & KYC</Heading>
              <SimpleGrid columns={3} spacing={4}>
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
                <VStack align="start" spacing={0}>
                  <Text fontSize="xs" color="gray.500" fontWeight="700" textTransform="uppercase">KYC Status</Text>
                  <Badge
                    colorScheme={user.kyc?.verificationStatus === "VERIFIED" ? "green" : user.kyc?.verificationStatus === "REJECTED" ? "red" : "orange"}
                    px={3} py={1} rounded="full"
                  >
                    {user.kyc?.verificationStatus || "NOT STARTED"}
                  </Badge>
                </VStack>
              </SimpleGrid>
            </Box>

            <Divider />

            <Box>
              <Heading size="xs" mb={4} color="blue.600" textTransform="uppercase">Recent Transfers ({user._count?.transfers || 0} Total)</Heading>
              {user.transfers && user.transfers.length > 0 ? (
                <VStack align="stretch" spacing={3}>
                  {user.transfers.map(t => (
                    <Flex key={t.id} justify="space-between" align="center" bg="gray.50" p={3} rounded="lg">
                      <VStack align="start" spacing={0}>
                        <Text fontWeight="600" fontSize="sm">{t.amount} {t.senderCurrency} → {t.convertedAmount} {t.destinationCurrency}</Text>
                        <Text fontSize="xs" color="gray.500">{new Date(t.createdAt).toLocaleDateString()}</Text>
                      </VStack>
                      <Badge colorScheme={t.status === "COMPLETED" ? "green" : t.status === "FAILED" ? "red" : "orange"}>
                        {t.status}
                      </Badge>
                    </Flex>
                  ))}
                </VStack>
              ) : (
                <Text color="gray.500" fontSize="sm">No recent transfers.</Text>
              )}
            </Box>
          </VStack>
        </ModalBody>
        <ModalFooter borderTopWidth="1px">
          <Button variant="ghost" mr={3} onClick={onClose}>Close</Button>
          {isEditing && (
            <Button colorScheme="blue" onClick={handleSave} isLoading={updateMutation.isLoading}>Save Changes</Button>
          )}
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
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [filterKyc, setFilterKyc] = useState("ALL");

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

  const filteredUsers = useMemo(() => {
    if (!users) return [];
    return users.filter((u) => {
      const matchSearch = (u.firstName + " " + u.lastName + " " + u.email + " " + (u.phone||"")).toLowerCase().includes(search.toLowerCase());
      const matchStatus = filterStatus === "ALL" || u.status === filterStatus;
      const kycStatus = u.kyc?.verificationStatus || "NOT STARTED";
      const matchKyc = filterKyc === "ALL" || (filterKyc === "NONE" ? kycStatus === "NOT STARTED" : kycStatus === filterKyc);
      return matchSearch && matchStatus && matchKyc;
    });
  }, [users, search, filterStatus, filterKyc]);

  const exportToCSV = () => {
    if (!filteredUsers || filteredUsers.length === 0) return;

    const headers = ["ID", "First Name", "Last Name", "Email", "Phone", "Status", "Joined", "Total Transfers"];
    const csvContent = [
      headers.join(","),
      ...filteredUsers.map(u => [
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
        <Flex justify="space-between" align="center" flexWrap="wrap" gap={4}>
          <VStack align="start" spacing={1}>
            <Heading size="lg">Manage Users</Heading>
            <Text color="gray.500">Advanced user management and monitoring.</Text>
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

        <Box bg="white" p={6} rounded="3xl" boxShadow="sm" border="1px" borderColor="gray.100">
          <Flex gap={4} flexWrap="wrap" mb={6}>
            <InputGroup maxW="300px">
              <InputLeftElement pointerEvents="none">
                <SearchNormal size="20" color="gray" />
              </InputLeftElement>
              <Input 
                placeholder="Search name, email, phone..." 
                value={search} 
                onChange={(e) => setSearch(e.target.value)} 
                rounded="lg"
              />
            </InputGroup>
            
            <Select maxW="200px" rounded="lg" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
              <option value="ALL">All Statuses</option>
              <option value="ACTIVE">Active</option>
              <option value="SUSPENDED">Suspended</option>
            </Select>

            <Select maxW="200px" rounded="lg" value={filterKyc} onChange={(e) => setFilterKyc(e.target.value)}>
              <option value="ALL">All KYC</option>
              <option value="VERIFIED">Verified</option>
              <option value="PENDING">Pending</option>
              <option value="REJECTED">Rejected</option>
              <option value="NONE">Not Started</option>
            </Select>
          </Flex>

          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Email</Th>
                  <Th>Role</Th>
                  <Th>Status</Th>
                  <Th>KYC</Th>
                  <Th>Joined</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {filteredUsers?.map((user) => (
                  <Tr key={user.id}>
                    <Td>
                      <HStack spacing={3}>
                        <Avatar size="sm" name={`${user.firstName} ${user.lastName}`} />
                        <VStack align="start" spacing={0}>
                          <Text fontWeight="600">{user.firstName} {user.lastName}</Text>
                          <Text fontSize="xs" color="gray.500">{user.phone || "No Phone"}</Text>
                        </VStack>
                      </HStack>
                    </Td>
                    <Td fontSize="sm">{user.email}</Td>
                    <Td>
                      <Badge colorScheme={user.role === "ADMIN" ? "purple" : "gray"} variant="subtle" rounded="full" px={2}>
                        {user.role}
                      </Badge>
                    </Td>
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
