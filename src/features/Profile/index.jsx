import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  VStack,
  HStack,
  Text,
  Heading,
  Avatar,
  Button,
  FormControl,
  FormLabel,
  Input,
  SimpleGrid,
  useColorModeValue,
  Badge,
  IconButton,
  Divider,
  useToast,
  Spinner,
  Icon,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Edit2, Verify, Sms, Call, User as UserIcon, ShieldTick } from "iconsax-react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import Link from "next/link";
import { fetchProfile, updateProfile } from "../../services/authService";

const MotionBox = motion(Box);

export default function ProfilePage() {
  const toast = useToast();
  const queryClient = useQueryClient();
  const { data: user, isLoading } = useQuery("userProfile", fetchProfile);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
      });
    }
  }, [user]);

  const updateMutation = useMutation(updateProfile, {
    onSuccess: () => {
      queryClient.invalidateQueries("userProfile");
      setIsEditing(false);
      toast({
        title: "Profile Updated",
        status: "success",
        duration: 3000,
      });
    },
    onError: () => {
      toast({
        title: "Update Failed",
        status: "error",
        duration: 3000,
      });
    },
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    updateMutation.mutate(formData);
  };

  const cardBg = useColorModeValue("white", "gray.800");

  if (isLoading) {
    return (
      <Flex h="80vh" align="center" justify="center">
        <Spinner size="xl" color="primary.500" />
      </Flex>
    );
  }

  return (
    <Box p={{ base: 4, md: 10 }} maxW="1200px" mx="auto">
      <VStack spacing={10} align="stretch">
        {/* Header / Cover Area */}
        <Box 
          h="200px" 
          bgGradient="linear(to-r, blue.600, primary.500)" 
          rounded="3xl" 
          position="relative"
          mb={20}
        >
          <Flex 
            position="absolute" 
            bottom="-60px" 
            left={{ base: "40px", md: "60px" }} 
            align="end"
            direction={{ base: "column", md: "row" }}
            gap={6}
          >
            <Avatar 
              size="2xl" 
              name={`${user?.firstName} ${user?.lastName}`} 
              border="6px solid white" 
              boxShadow="xl"
              bg="blue.500"
            />
            <VStack align="start" spacing={1} pb={4} pt={{ base: 4, md: 0 }}>
              <HStack>
                <Heading size="xl" color="gray.900">{user?.firstName} {user?.lastName}</Heading>
                {user?.kycStatus === "VERIFIED" && (
                  <Icon as={Verify} color="blue.500" variant="Bold" size="24" />
                )}
              </HStack>
              <Text color="gray.500" fontWeight="600">{user?.email}</Text>
            </VStack>
          </Flex>
          
          <Button
            position="absolute"
            bottom="20px"
            right="20px"
            bg="whiteAlpha.300"
            color="white"
            _hover={{ bg: "whiteAlpha.400" }}
            backdropFilter="blur(10px)"
            leftIcon={<Edit2 size="20" />}
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? "Cancel Editing" : "Edit Profile"}
          </Button>
        </Box>

        <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={10}>
          {/* Left: General Info */}
          <VStack spacing={6} align="stretch">
            <MotionBox
              p={8}
              bg={cardBg}
              rounded="3xl"
              boxShadow="xl"
              border="1px"
              borderColor="gray.100"
            >
              <VStack align="start" spacing={6}>
                <Heading size="md" color="blue.900">Personal Information</Heading>
                
                <VStack align="stretch" w="full" spacing={5}>
                  <FormControl>
                    <FormLabel color="gray.400" fontSize="xs" fontWeight="800" textTransform="uppercase">First Name</FormLabel>
                    {isEditing ? (
                      <Input name="firstName" value={formData.firstName} onChange={handleChange} h="50px" rounded="xl" />
                    ) : (
                      <HStack spacing={3}>
                        <Icon as={UserIcon} color="blue.400" />
                        <Text fontWeight="700">{user?.firstName}</Text>
                      </HStack>
                    )}
                  </FormControl>

                  <FormControl>
                    <FormLabel color="gray.400" fontSize="xs" fontWeight="800" textTransform="uppercase">Last Name</FormLabel>
                    {isEditing ? (
                      <Input name="lastName" value={formData.lastName} onChange={handleChange} h="50px" rounded="xl" />
                    ) : (
                      <HStack spacing={3}>
                        <Icon as={UserIcon} color="blue.400" />
                        <Text fontWeight="700">{user?.lastName}</Text>
                      </HStack>
                    )}
                  </FormControl>

                  <FormControl>
                    <FormLabel color="gray.400" fontSize="xs" fontWeight="800" textTransform="uppercase">Email Address</FormLabel>
                    <HStack spacing={3}>
                      <Icon as={Sms} color="blue.400" />
                      <Text fontWeight="700">{user?.email}</Text>
                      <Badge colorScheme="green" rounded="full">Primary</Badge>
                    </HStack>
                  </FormControl>

                  <FormControl>
                    <FormLabel color="gray.400" fontSize="xs" fontWeight="800" textTransform="uppercase">Phone Number</FormLabel>
                    {isEditing ? (
                      <Input name="phone" value={formData.phone} onChange={handleChange} h="50px" rounded="xl" />
                    ) : (
                      <HStack spacing={3}>
                        <Icon as={Call} color="blue.400" />
                        <Text fontWeight="700">{user?.phone || "Not set"}</Text>
                      </HStack>
                    )}
                  </FormControl>
                </VStack>

                {isEditing && (
                  <Button 
                    w="full" 
                    bg="primary.500" 
                    color="white" 
                    h="55px" 
                    rounded="xl" 
                    onClick={handleSave}
                    isLoading={updateMutation.isLoading}
                  >
                    Save Changes
                  </Button>
                )}
              </VStack>
            </MotionBox>
          </VStack>

          {/* Center/Right: Account Stats & Security */}
          <VStack spacing={6} align="stretch" gridColumn={{ lg: "span 2" }}>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
               <Box p={6} bg="blue.50" rounded="3xl" border="1px" borderColor="blue.100">
                  <HStack spacing={4} mb={2}>
                    <Icon as={ShieldTick} color="blue.600" size="24" variant="Bold" />
                    <Text fontWeight="800" color="blue.900">Account Status</Text>
                  </HStack>
                  <Text fontSize="2xl" fontWeight="900" color="blue.600">Level 1 Verified</Text>
                  <Text mt={2} fontSize="sm" color="blue.400">Your daily limit is $5,000.00</Text>
               </Box>

               <Box p={6} bg="primary.50" rounded="3xl" border="1px" borderColor="primary.100">
                  <HStack spacing={4} mb={2}>
                    <Icon as={Verify} color="primary.600" size="24" variant="Bold" />
                    <Text fontWeight="800" color="primary.900">KYC Status</Text>
                  </HStack>
                  <HStack>
                    <Text fontSize="2xl" fontWeight="900" color="primary.600">
                        {user?.kycStatus || "Not Started"}
                    </Text>
                    {user?.kycStatus !== "VERIFIED" && (
                        <Link href="/kyc">
                            <Button size="xs" colorScheme="primary" rounded="full">Finish</Button>
                        </Link>
                    )}
                  </HStack>
                  <Text mt={2} fontSize="sm" color="primary.400">Complete KYC to unlock $50,000 limits</Text>
               </Box>
            </SimpleGrid>

            {/* Account Settings Placeholder Section */}
            <Box p={8} bg={cardBg} rounded="3xl" boxShadow="xl" border="1px" borderColor="gray.100">
                <Heading size="md" color="blue.900" mb={6}>Security Settings</Heading>
                <VStack align="stretch" spacing={4}>
                    <Flex justify="space-between" align="center">
                        <VStack align="start" spacing={0}>
                            <Text fontWeight="700">Two-Factor Authentication</Text>
                            <Text fontSize="sm" color="gray.500">Secure your account with 2FA codes</Text>
                        </VStack>
                        <Button variant="outline" size="sm" rounded="full">Enable</Button>
                    </Flex>
                    <Divider />
                    <Flex justify="space-between" align="center">
                        <VStack align="start" spacing={0}>
                            <Text fontWeight="700">Login Notifications</Text>
                            <Text fontSize="sm" color="gray.500">Get notified of new login attempts</Text>
                        </VStack>
                        <Badge colorScheme="green" rounded="full">Active</Badge>
                    </Flex>
                    <Divider />
                    <Flex justify="space-between" align="center" color="red.500">
                        <VStack align="start" spacing={0}>
                            <Text fontWeight="700">Deactivate Account</Text>
                            <Text fontSize="sm" color="red.300">This action cannot be undone</Text>
                        </VStack>
                        <Button colorScheme="red" variant="ghost" size="sm" rounded="full">Delete</Button>
                    </Flex>
                </VStack>
            </Box>
          </VStack>
        </SimpleGrid>
      </VStack>
    </Box>
  );
}


