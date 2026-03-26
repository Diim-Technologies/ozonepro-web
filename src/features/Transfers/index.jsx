import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  VStack,
  HStack,
  Text,
  Heading,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  useColorModeValue,
  useToast,
  Divider,
  Alert,
  AlertIcon,
  SimpleGrid,
  Icon,
  Circle,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { MoneySend, Bank, User, DocumentText, ArrowRight, TickCircle } from "iconsax-react";
import { useMutation, useQuery } from "react-query";
import { initiateTransfer } from "../../services/authService";
import { fetchExchangeDetails } from "../../services/exchangeService";
import Link from "next/link";

const MotionBox = motion(Box);

const steps = [
  { title: 'Amount', description: 'Enter sum', icon: MoneySend },
  { title: 'Recipient', description: 'Bank details', icon: Bank },
  { title: 'Confirm', description: 'Review transfer', icon: DocumentText },
];

function CustomStepper({ activeStep }) {
    const activeColor = "primary.500";
    const inactiveColor = "gray.300";
    const connectorColor = "gray.200";

    return (
        <HStack w="full" spacing={0} mb={10} justify="space-between" position="relative">
            {steps.map((step, index) => {
                const isActive = index === activeStep;
                const isCompleted = index < activeStep;
                
                return (
                    <React.Fragment key={index}>
                        <VStack spacing={2} zIndex={1} flex={1}>
                            <Circle 
                                size="10" 
                                bg={isCompleted || isActive ? activeColor : "white"} 
                                border="2px" 
                                borderColor={isCompleted || isActive ? activeColor : inactiveColor}
                                color={isCompleted || isActive ? "white" : inactiveColor}
                            >
                                {isCompleted ? <TickCircle size="20" variant="Bold" /> : <Text fontWeight="bold">{index + 1}</Text>}
                            </Circle>
                            <VStack spacing={0} align="center" display={{ base: "none", md: "flex" }}>
                                <Text fontWeight="700" fontSize="sm" color={isActive ? "blue.900" : "gray.500"}>{step.title}</Text>
                                <Text fontSize="xs" color="gray.400">{step.description}</Text>
                            </VStack>
                        </VStack>
                        {index < steps.length - 1 && (
                            <Box 
                                flex={1} 
                                h="2px" 
                                bg={isCompleted ? activeColor : connectorColor} 
                                mt="-8"
                            />
                        )}
                    </React.Fragment>
                );
            })}
        </HStack>
    );
}

export default function TransfersPage() {
  const toast = useToast();
  const [activeStep, setActiveStep] = useState(0);

  const goToNext = () => setActiveStep((prev) => prev + 1);
  const goToPrevious = () => setActiveStep((prev) => prev - 1);

  const [formData, setFormData] = useState({
    amount: 100,
    senderCurrency: "USD",
    destinationCurrency: "NGN",
    recipientAccountName: "",
    recipientAccountNumber: "",
    recipientBankName: "",
    recipientBankCode: "",
    recipientCountry: "NG",
  });

  useEffect(() => {
    const pending = localStorage.getItem("pendingTransfer");
    if (pending) {
      try {
        const data = JSON.parse(pending);
        setFormData(prev => ({
          ...prev,
          amount: data.amount || prev.amount,
          senderCurrency: data.senderCurrency || prev.senderCurrency,
          destinationCurrency: data.destinationCurrency || prev.destinationCurrency,
        }));
      } catch (e) {
        console.error("Failed to parse pending transfer", e);
      }
    }
  }, []);

  const { data: calculateData } = useQuery(
    ["exchangeCalculate", formData.senderCurrency, formData.destinationCurrency, formData.amount],
    fetchExchangeDetails,
    {
      enabled: !!formData.amount && !!formData.senderCurrency && !!formData.destinationCurrency,
    }
  );

  const transferMutation = useMutation(initiateTransfer, {
    onSuccess: () => {
      localStorage.removeItem("pendingTransfer");
      goToNext();
      toast({
        title: "Transfer Initiated",
        status: "success",
        duration: 5000,
      });
    },
    onError: (error) => {
      toast({
        title: "Transfer Failed",
        description: error.response?.data?.message || "Something went wrong",
        status: "error",
        duration: 5000,
      });
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === "amount" ? parseFloat(value) : value });
  };

  const handleSubmit = () => {
    transferMutation.mutate(formData);
  };

  const cardBg = useColorModeValue("white", "gray.800");

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <VStack spacing={6} align="stretch" py={4}>
            <Heading size="md" color="blue.900">How much would you like to send?</Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
              <FormControl isRequired>
                <FormLabel>You Send</FormLabel>
                <HStack>
                  <Input 
                    name="amount" 
                    type="number" 
                    placeholder="0.00" 
                    h="60px" 
                    rounded="xl" 
                    value={formData.amount}
                    onChange={handleChange} 
                  />
                  <Select name="senderCurrency" value={formData.senderCurrency} w="120px" h="60px" rounded="xl" onChange={handleChange}>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                    <option value="NGN">NGN</option>
                  </Select>
                </HStack>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>They Receive</FormLabel>
                <HStack>
                  <Input 
                    placeholder="Calculated..." 
                    h="60px" 
                    rounded="xl" 
                    isReadOnly 
                    isDisabled 
                    value={calculateData?.convertedAmount?.toLocaleString() || "0.00"} 
                  />
                  <Select name="destinationCurrency" value={formData.destinationCurrency} w="120px" h="60px" rounded="xl" onChange={handleChange}>
                    <option value="NGN">NGN</option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                  </Select>
                </HStack>
              </FormControl>
            </SimpleGrid>
            <Alert status="info" rounded="xl" variant="subtle">
              <AlertIcon />
              <VStack align="start" spacing={0}>
                  <Text fontWeight="700">Exchange Rate: 1 {formData.senderCurrency} = {calculateData?.rate?.toFixed(4) || "0.00"} {formData.destinationCurrency}</Text>
                  <Text fontSize="sm">Fee: ${calculateData?.fee?.toFixed(2) || "0.00"}</Text>
              </VStack>
            </Alert>
            <Button 
                h="60px" 
                colorScheme="primary" 
                rounded="xl" 
                onClick={goToNext} 
                rightIcon={<ArrowRight />}
                isDisabled={!formData.amount || formData.amount <= 0}
            >
              Continue to Recipient
            </Button>
          </VStack>
        );
      case 1:
        return (
          <VStack spacing={6} align="stretch" py={4}>
            <Heading size="md" color="blue.900">Recipient Bank Details</Heading>
            <VStack spacing={5}>
                <FormControl isRequired>
                    <FormLabel>Account Name</FormLabel>
                    <Input name="recipientAccountName" placeholder="John Doe" h="55px" rounded="xl" onChange={handleChange} />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Account Number</FormLabel>
                    <Input name="recipientAccountNumber" placeholder="0123456789" h="55px" rounded="xl" onChange={handleChange} />
                </FormControl>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} w="full">
                    <FormControl isRequired>
                        <FormLabel>Bank Name</FormLabel>
                        <Input name="recipientBankName" placeholder="Zest Bank" h="55px" rounded="xl" onChange={handleChange} />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Bank Code / SWIFT</FormLabel>
                        <Input name="recipientBankCode" placeholder="058" h="55px" rounded="xl" onChange={handleChange} />
                    </FormControl>
                </SimpleGrid>
                <FormControl isRequired>
                    <FormLabel>Country</FormLabel>
                    <Select name="recipientCountry" h="55px" rounded="xl" onChange={handleChange} value={formData.recipientCountry}>
                        <option value="NG">Nigeria</option>
                        <option value="KE">Kenya</option>
                        <option value="GH">Ghana</option>
                        <option value="US">USA</option>
                        <option value="GB">UK</option>
                    </Select>
                </FormControl>
            </VStack>
            <HStack spacing={4}>
                <Button h="60px" w="full" variant="ghost" rounded="xl" onClick={goToPrevious}>Back</Button>
                <Button h="60px" w="full" colorScheme="primary" rounded="xl" onClick={goToNext} isDisabled={!formData.recipientAccountName || !formData.recipientAccountNumber}>Review Transfer</Button>
            </HStack>
          </VStack>
        );
      case 2:
        return (
            <VStack spacing={8} align="stretch" py={4}>
                <Heading size="md" color="blue.900">Confirm Transfer Details</Heading>
                <Box bg="gray.50" p={6} rounded="2xl" border="1px dashed" borderColor="gray.300">
                    <VStack align="stretch" spacing={4}>
                        <Flex justify="space-between">
                            <Text color="gray.500">You are sending</Text>
                            <Text fontWeight="800">{formData.amount} {formData.senderCurrency}</Text>
                        </Flex>
                        <Flex justify="space-between">
                            <Text color="gray.500">Recipient gets</Text>
                            <Text fontWeight="800">{calculateData?.convertedAmount?.toLocaleString()} {formData.destinationCurrency}</Text>
                        </Flex>
                        <Divider />
                        <Flex justify="space-between">
                            <Text color="gray.500">Recipient</Text>
                            <Text fontWeight="800">{formData.recipientAccountName}</Text>
                        </Flex>
                        <Flex justify="space-between">
                            <Text color="gray.500">Bank</Text>
                            <Text fontWeight="800">{formData.recipientBankName} ({formData.recipientAccountNumber})</Text>
                        </Flex>
                        <Flex justify="space-between">
                            <Text color="gray.500">Processing Fee</Text>
                            <Text fontWeight="800" color="red.500">${calculateData?.fee?.toFixed(2)}</Text>
                        </Flex>
                        <Divider />
                        <Flex justify="space-between">
                            <Text fontWeight="800">Total Amount</Text>
                            <Text fontWeight="800" fontSize="lg" color="blue.600">${calculateData?.totalAmount?.toFixed(2)}</Text>
                        </Flex>
                    </VStack>
                </Box>
                <HStack spacing={4}>
                    <Button h="60px" w="full" variant="ghost" rounded="xl" onClick={goToPrevious}>Back</Button>
                    <Button 
                        h="60px" 
                        w="full" 
                        colorScheme="primary" 
                        rounded="xl" 
                        onClick={handleSubmit} 
                        isLoading={transferMutation.isLoading}
                    >
                        Send Money Now
                    </Button>
                </HStack>
            </VStack>
        );
      case 3:
        return (
            <VStack spacing={8} py={10} textAlign="center">
                <Icon as={TickCircle} w={20} h={20} color="green.400" variant="Bold" />
                <VStack spacing={2}>
                    <Heading size="xl">Transfer Successful!</Heading>
                    <Text color="gray.500" fontSize="lg">
                        Your money is on its way to {formData.recipientAccountName}. 
                        Reference: #{Math.random().toString(36).substr(2, 9).toUpperCase()}
                    </Text>
                </VStack>
                <HStack spacing={4} w="full" pt={6}>
                    <Link href="/dashboard" style={{ width: "100%" }}>
                        <Button w="full" h="60px" variant="outline" rounded="xl">Dashboard</Button>
                    </Link>
                    <Button w="full" h="60px" colorScheme="primary" rounded="xl" onClick={() => window.location.reload()}>New Transfer</Button>
                </HStack>
            </VStack>
        )
      default:
        return null;
    }
  };

  return (
    <Box p={{ base: 4, md: 10 }} maxW="1000px" mx="auto">
      <VStack spacing={10} align="stretch">
        <VStack align="start" spacing={1}>
            <Heading size="lg" color="blue.900">Send Money Abroad</Heading>
            <Text color="gray.500">Fast, secure and low-cost international transfers.</Text>
        </VStack>

        {/* Custom Stepper */}
        <Box bg={cardBg} p={8} rounded="3xl" boxShadow="xl" border="1px" borderColor="gray.100" minH="500px">
            <CustomStepper activeStep={activeStep} />

            <MotionBox
                key={activeStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
            >
                {renderStepContent()}
            </MotionBox>
        </Box>
      </VStack>
    </Box>
  );
}
