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
  Spinner,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  useToast,
  Divider,
  SimpleGrid,
} from "@chakra-ui/react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { fetchAllExchangeRates, setExchangeRate } from "../../services/adminService";
import DashboardLayout from "../../components/DashboardLayout";
import AdminGuard from "../../components/AdminGuard";

function AdminRatesContent() {
  const queryClient = useQueryClient();
  const toast = useToast();
  const [formData, setFormData] = useState({
    base: "USD",
    target: "NGN",
    rate: "",
  });

  const { data: rates, isLoading } = useQuery("exchangeRates", fetchAllExchangeRates);

  const mutation = useMutation(setExchangeRate, {
    onSuccess: () => {
      queryClient.invalidateQueries("exchangeRates");
      toast({ title: "Exchange rate updated", status: "success" });
      setFormData({ ...formData, rate: "" });
    },
    onError: (err) => {
        toast({ title: "Update failed", status: "error", description: err.message });
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.rate || isNaN(formData.rate)) {
      return toast({ title: "Invalid rate", status: "warning" });
    }
    mutation.mutate({ 
        base: formData.base, 
        target: formData.target, 
        rate: parseFloat(formData.rate) 
    });
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
          <Heading size="lg">Currency & Exchange Rates</Heading>
          <Text color="gray.500">Configure global exchange rates for the platform.</Text>
        </VStack>

        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8}>
          <Box bg="white" p={8} rounded="3xl" boxShadow="xl" border="1px" borderColor="gray.100" h="fit-content">
            <VStack as="form" onSubmit={handleSubmit} spacing={4} align="stretch">
                <Heading size="sm" mb={2}>Update Exchange Rate</Heading>
                <SimpleGrid columns={2} spacing={4}>
                    <FormControl isRequired>
                        <FormLabel>Base Currency</FormLabel>
                        <Select name="base" value={formData.base} onChange={handleChange}>
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="GBP">GBP</option>
                        <option value="NGN">NGN</option>
                        </Select>
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Target Currency</FormLabel>
                        <Select name="target" value={formData.target} onChange={handleChange}>
                        <option value="NGN">NGN</option>
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="GBP">GBP</option>
                        </Select>
                    </FormControl>
                </SimpleGrid>
                <FormControl isRequired>
                    <FormLabel>New Rate (1 {formData.base} = ? {formData.target})</FormLabel>
                    <Input 
                        placeholder="e.g. 1500.50" 
                        name="rate" 
                        value={formData.rate} 
                        onChange={handleChange}
                        type="number"
                        step="any"
                    />
                </FormControl>
                <Button 
                    type="submit" 
                    colorScheme="blue" 
                    size="lg" 
                    rounded="full"
                    isLoading={mutation.isLoading}
                >
                    Update Rate
                </Button>
            </VStack>
          </Box>

          <Box bg="white" p={8} rounded="3xl" boxShadow="xl" border="1px" borderColor="gray.100">
            <Heading size="sm" mb={6}>Current Exchange Rates</Heading>
            <TableContainer>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Pair</Th>
                    <Th isNumeric>Rate</Th>
                    <Th>Updated At</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {rates?.map((rate) => (
                    <Tr key={rate.id}>
                      <Td fontWeight="600">{rate.baseCurrency} / {rate.targetCurrency}</Td>
                      <Td isNumeric fontWeight="700" color="blue.600">{rate.rate.toFixed(4)}</Td>
                      <Td fontSize="sm" color="gray.500">{new Date(rate.updatedAt).toLocaleTimeString()}</Td>
                    </Tr>
                  ))}
                  {rates?.length === 0 && (
                      <Tr><Td colSpan={3} textAlign="center" color="gray.400">No rates configured.</Td></Tr>
                  )}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
        </SimpleGrid>
      </VStack>
    </Box>
  );
}

export default function AdminRates() {
  return (
    <AdminGuard>
      <DashboardLayout>
        <AdminRatesContent />
      </DashboardLayout>
    </AdminGuard>
  );
}
