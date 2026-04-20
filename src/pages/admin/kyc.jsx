import React, { useState } from "react";
import {
  Box,
  Flex,
  Heading,
  VStack,
  HStack,
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
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  SmallCloseIcon,
  useDisclosure,
  Select,
  Divider,
  Grid,
  GridItem,
  useToast,
  Alert,
  AlertIcon,
  IconButton,
  Tooltip,
  Image,
} from "@chakra-ui/react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { fetchAllKyc, fetchKycById, adminUpdateKycStatus } from "../../services/adminService";
import DashboardLayout from "../../components/DashboardLayout";
import AdminGuard from "../../components/AdminGuard";
import { ExportCurve } from "iconsax-react";

const STATUS_COLORS = {
  PENDING: "orange",
  VERIFIED: "green",
  REJECTED: "red",
};

// ─── Detail Modal ──────────────────────────────────────────────────────────────
function KycDetailModal({ kycId, isOpen, onClose }) {
  const toast = useToast();
  const queryClient = useQueryClient();
  const [selectedStatus, setSelectedStatus] = useState("");

  const { data: kyc, isLoading: isDetailLoading } = useQuery(
    ["kycDetail", kycId],
    () => fetchKycById(kycId),
    {
      enabled: isOpen && !!kycId,
      onSuccess: (d) => setSelectedStatus(d?.verificationStatus || ""),
    }
  );

  const { mutate: updateStatus, isLoading: isUpdating } = useMutation(
    adminUpdateKycStatus,
    {
      onSuccess: () => {
        toast({
          title: "Status Updated",
          description: `KYC status changed to ${selectedStatus}.`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        queryClient.invalidateQueries("allKyc");
        queryClient.invalidateQueries(["kycDetail", kycId]);
        onClose();
      },
      onError: (err) => {
        toast({
          title: "Update Failed",
          description: err?.response?.data?.message || "Could not update status.",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      },
    }
  );

  const handleSave = () => {
    if (!selectedStatus) return;
    updateStatus({ id: kycId, status: selectedStatus });
  };

  const providerData = kyc?.providerResponse || {};

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl" scrollBehavior="inside">
      <ModalOverlay backdropFilter="blur(4px)" />
      <ModalContent rounded="2xl" mx={4}>
        <ModalHeader borderBottomWidth="1px">
          <HStack spacing={3}>
            <Avatar
              size="md"
              name={kyc ? `${kyc.user?.firstName} ${kyc.user?.lastName}` : ""}
            />
            <VStack align="start" spacing={0}>
              <Text fontWeight="700" fontSize="lg">
                {kyc?.user?.firstName} {kyc?.user?.lastName}
              </Text>
              <Text fontSize="sm" color="gray.500">
                {kyc?.user?.email}
              </Text>
            </VStack>
          </HStack>
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody py={6}>
          {isDetailLoading ? (
            <Flex h="200px" align="center" justify="center">
              <Spinner size="xl" color="blue.500" thickness="4px" />
            </Flex>
          ) : !kyc ? (
            <Alert status="error" rounded="lg">
              <AlertIcon />
              Could not load KYC details.
            </Alert>
          ) : (
            <VStack spacing={6} align="stretch">
              {/* Identity Details */}
              <Box>
                <Text fontWeight="700" fontSize="sm" color="gray.400" textTransform="uppercase" mb={3}>
                  Identity Details
                </Text>
                <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
                  <InfoRow label="Document Type" value={kyc.documentType} />
                  <InfoRow label="Document Number" value={kyc.documentNumber} />
                  <InfoRow
                    label="Current Status"
                    value={
                      <Badge
                        colorScheme={STATUS_COLORS[kyc.verificationStatus] || "gray"}
                        variant="subtle"
                        rounded="full"
                        px={3}
                        py={1}
                      >
                        {kyc.verificationStatus}
                      </Badge>
                    }
                  />
                  <InfoRow
                    label="Submitted At"
                    value={new Date(kyc.createdAt).toLocaleString()}
                  />
                  {kyc.updatedAt && (
                    <InfoRow
                      label="Last Updated"
                      value={new Date(kyc.updatedAt).toLocaleString()}
                    />
                  )}
                </Grid>
              </Box>

              <Divider />

              {/* User Details */}
              <Box>
                <Text fontWeight="700" fontSize="sm" color="gray.400" textTransform="uppercase" mb={3}>
                  User Details
                </Text>
                <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
                  <InfoRow label="Phone" value={kyc.user?.phone || "—"} />
                  <InfoRow label="User ID" value={kyc.userId} mono />
                  <InfoRow label="KYC Record ID" value={kyc.id} mono />
                </Grid>
              </Box>

              {/* Provider Session Data (if available) */}
              {providerData?.session_id && (
                <>
                  <Divider />
                  <Box>
                    <Text fontWeight="700" fontSize="sm" color="gray.400" textTransform="uppercase" mb={3}>
                      Didit Session Data
                    </Text>
                    <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
                      <InfoRow label="Session ID" value={providerData.session_id} mono />
                      {providerData.status && (
                        <InfoRow label="Provider Status" value={providerData.status} />
                      )}
                    </Grid>
                  </Box>
                </>
              )}

              {/* Document Image (if available) */}
              {kyc?.documentImage && (
                <>
                  <Divider />
                  <Box>
                    <Text fontWeight="700" fontSize="sm" color="gray.400" textTransform="uppercase" mb={3}>
                      Uploaded Document
                    </Text>
                    <Box
                      border="1px"
                      borderColor="gray.200"
                      rounded="xl"
                      overflow="hidden"
                      bg="gray.50"
                    >
                      <Image
                        src={`http://localhost:3000/${kyc.documentImage}`}
                        alt="KYC Document"
                        w="full"
                        objectFit="contain"
                        maxH="400px"
                        fallbackSrc="https://via.placeholder.com/400x200?text=Image+Not+Found"
                      />
                    </Box>
                    <Button
                      as="a"
                      href={`http://localhost:3000/${kyc.documentImage}`}
                      target="_blank"
                      size="sm"
                      mt={3}
                      variant="ghost"
                      colorScheme="blue"
                    >
                      Open in new tab
                    </Button>
                  </Box>
                </>
              )}

              <Divider />

              {/* Status Override */}
              <Box>
                <Text fontWeight="700" fontSize="sm" color="gray.400" textTransform="uppercase" mb={3}>
                  Override Status
                </Text>
                <Select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  rounded="lg"
                  borderColor="gray.200"
                  focusBorderColor="blue.400"
                >
                  <option value="PENDING">PENDING</option>
                  <option value="VERIFIED">VERIFIED</option>
                  <option value="REJECTED">REJECTED</option>
                </Select>
              </Box>
            </VStack>
          )}
        </ModalBody>

        <ModalFooter borderTopWidth="1px" gap={3}>
          <Button variant="ghost" onClick={onClose} isDisabled={isUpdating}>
            Cancel
          </Button>
          <Button
            colorScheme="blue"
            onClick={handleSave}
            isLoading={isUpdating}
            isDisabled={isDetailLoading || !selectedStatus || selectedStatus === kyc?.verificationStatus}
          >
            Save Changes
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

// ─── Info Row Helper ───────────────────────────────────────────────────────────
function InfoRow({ label, value, mono = false }) {
  return (
    <GridItem>
      <VStack align="start" spacing={0}>
        <Text fontSize="xs" color="gray.400" fontWeight="600" textTransform="uppercase">
          {label}
        </Text>
        {typeof value === "string" || typeof value === "number" ? (
          <Text fontSize="sm" fontWeight="500" fontFamily={mono ? "mono" : "inherit"} wordBreak="break-all">
            {value || "—"}
          </Text>
        ) : (
          value
        )}
      </VStack>
    </GridItem>
  );
}

// ─── Main Admin KYC Page ───────────────────────────────────────────────────────
function AdminKycContent() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedKycId, setSelectedKycId] = useState(null);

  const { data: kycRecords, isLoading, isError } = useQuery("allKyc", fetchAllKyc);

  const handleViewDetails = (id) => {
    setSelectedKycId(id);
    onOpen();
  };

  const handleClose = () => {
    onClose();
    setSelectedKycId(null);
  };

  const exportToCSV = () => {
    if (!kycRecords || kycRecords.length === 0) return;
    
    const headers = ["ID", "User Name", "User Email", "Document Type", "Document Number", "Status", "Submitted At"];
    const csvContent = [
      headers.join(","),
      ...kycRecords.map(r => [
        r.id,
        `"${r.user?.firstName} ${r.user?.lastName}"`,
        r.user?.email,
        r.documentType,
        r.documentNumber,
        r.verificationStatus,
        new Date(r.createdAt).toISOString()
      ].join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `ozone_kyc_records_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isLoading) {
    return (
      <Flex h="80vh" align="center" justify="center" direction="column" gap={4}>
        <Spinner size="xl" color="blue.500" thickness="4px" />
        <Text color="gray.500">Loading KYC records...</Text>
      </Flex>
    );
  }

  if (isError) {
    return (
      <Box p={8}>
        <Alert status="error" rounded="xl">
          <AlertIcon />
          Failed to load KYC records. Check that the backend is running.
        </Alert>
      </Box>
    );
  }

  return (
    <Box p={{ base: 4, md: 8 }} bg="gray.50" minH="100vh">
      <VStack spacing={8} align="stretch">
        <Flex justify="space-between" align="end" flexWrap="wrap" gap={3}>
          <VStack align="start" spacing={1}>
            <Heading size="lg">KYC Verifications</Heading>
            <Text color="gray.500">Monitor and manage user identity verifications.</Text>
          </VStack>
          <HStack spacing={3}>
            <Button 
              leftIcon={<ExportCurve />} 
              colorScheme="blue" 
              variant="outline" 
              rounded="xl"
              onClick={exportToCSV}
            >
              Export CSV
            </Button>
            <HStack spacing={3} display={{ base: "none", md: "flex" }}>
              <Badge colorScheme="orange" px={3} py={1} rounded="full" fontSize="sm">
                {kycRecords?.filter((r) => r.verificationStatus === "PENDING").length || 0} Pending
              </Badge>
              <Badge colorScheme="green" px={3} py={1} rounded="full" fontSize="sm">
                {kycRecords?.filter((r) => r.verificationStatus === "VERIFIED").length || 0} Verified
              </Badge>
              <Badge colorScheme="red" px={3} py={1} rounded="full" fontSize="sm">
                {kycRecords?.filter((r) => r.verificationStatus === "REJECTED").length || 0} Rejected
              </Badge>
            </HStack>
          </HStack>
        </Flex>

        {/* Table */}
        <Box bg="white" p={{ base: 4, md: 8 }} rounded="3xl" boxShadow="xl" border="1px" borderColor="gray.100" overflowX="auto">
          {!kycRecords || kycRecords.length === 0 ? (
            <Flex py={16} align="center" justify="center" direction="column" gap={3}>
              <Text fontSize="4xl">📋</Text>
              <Text fontWeight="600" color="gray.500">No KYC records found</Text>
              <Text fontSize="sm" color="gray.400">Users who initiate verification will appear here.</Text>
            </Flex>
          ) : (
            <TableContainer>
              <Table variant="simple" size="md">
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
                  {kycRecords.map((record) => (
                    <Tr key={record.id} _hover={{ bg: "gray.50" }} transition="background 0.15s">
                      <Td>
                        <HStack spacing={3}>
                          <Avatar
                            size="sm"
                            name={`${record.user?.firstName || ""} ${record.user?.lastName || ""}`}
                          />
                          <VStack align="start" spacing={0}>
                            <Text fontWeight="600" fontSize="sm">
                              {record.user?.firstName} {record.user?.lastName}
                            </Text>
                            <Text fontSize="xs" color="gray.500">
                              {record.user?.email}
                            </Text>
                          </VStack>
                        </HStack>
                      </Td>
                      <Td fontSize="sm">{record.documentType || "—"}</Td>
                      <Td fontSize="sm" fontFamily="mono">{record.documentNumber || "—"}</Td>
                      <Td>
                        <Badge
                          colorScheme={STATUS_COLORS[record.verificationStatus] || "gray"}
                          variant="subtle"
                          rounded="full"
                          px={3}
                          py={1}
                        >
                          {record.verificationStatus}
                        </Badge>
                      </Td>
                      <Td fontSize="sm" color="gray.500">
                        {new Date(record.createdAt).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </Td>
                      <Td>
                        <Button
                          size="sm"
                          colorScheme="blue"
                          variant="outline"
                          rounded="lg"
                          onClick={() => handleViewDetails(record.id)}
                        >
                          View Details
                        </Button>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          )}
        </Box>
      </VStack>

      <KycDetailModal
        kycId={selectedKycId}
        isOpen={isOpen}
        onClose={handleClose}
      />
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
