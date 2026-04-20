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
  Stack,
  Container,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Edit2,
  Verify,
  Sms,
  Call,
  User as UserIcon,
  ShieldTick,
  Lock,
  Notification,
  Trash,
  ArrowRight,
  Setting2,
  ProfileCircle,
  Danger
} from "iconsax-react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import Link from "next/link";
import { fetchProfile, updateProfile } from "../../services/authService";

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

const GlassCard = ({ children, ...props }) => {
  const bg = useColorModeValue("rgba(255, 255, 255, 0.8)", "rgba(26, 32, 44, 0.8)");
  const borderColor = useColorModeValue("whiteAlpha.900", "whiteAlpha.200");

  return (
    <MotionBox
      p={{ base: 6, md: 8 }}
      bg={bg}
      backdropFilter="blur(20px)"
      rounded="3xl"
      border="1px solid"
      borderColor={borderColor}
      boxShadow="0 8px 32px 0 rgba(31, 38, 135, 0.07)"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      {...props}
    >
      {children}
    </MotionBox>
  );
};

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
        description: "Your details have been successfully saved.",
        status: "success",
        duration: 3000,
        position: "top",
        isClosable: true,
      });
    },
    onError: (error) => {
      toast({
        title: "Update Failed",
        description: error.message || "Something went wrong.",
        status: "error",
        duration: 3000,
        position: "top",
      });
    },
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    updateMutation.mutate(formData);
  };

  const pageBg = useColorModeValue("gray.50", "gray.950");
  const headingColor = useColorModeValue("gray.900", "white");
  const subTextColor = useColorModeValue("gray.500", "gray.400");
  const primaryBrand = "blue.500";

  if (isLoading) {
    return (
      <Flex h="100vh" align="center" justify="center" direction="column">
        <Spinner size="xl" color="primary.500" thickness="4px" mb={4} />
        <Text fontWeight="600" color="gray.500">Curating your experience...</Text>
      </Flex>
    );
  }

  return (
    <Box bg={pageBg} minH="100vh">
      {/* Background Decor */}
      <Box
        position="absolute"
        top="0"
        left="0"
        w="full"
        h="400px"
        bgGradient={`linear(to-b, ${useColorModeValue("blue.50", "blue.900")}, transparent)`}
        zIndex={0}
      />

      <Container maxW="1200px" py={{ base: 6, md: 10 }} position="relative" zIndex={1}>
        <VStack spacing={10} align="stretch">

          {/* Header Section */}
          <MotionBox
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Box 
              h={{ base: "200px", md: "260px" }} 
              bgGradient="linear(135deg, blue.600 0%, primary.500 100%)" 
              rounded="4xl" 
              position="relative"
              mb={24}
              boxShadow="0 20px 40px -10px rgba(49, 130, 206, 0.3)"
              overflow="hidden"
            >
              {/* Abstract Patterns */}
              <Box position="absolute" top="-10%" right="-5%" w="300px" h="300px" bg="whiteAlpha.100" rounded="full" filter="blur(60px)" />
              <Box position="absolute" bottom="-15%" left="5%" w="200px" h="200px" bg="blackAlpha.200" rounded="full" filter="blur(40px)" />

              <Flex 
                position="absolute" 
                bottom="-70px" 
                left={{ base: "24px", md: "60px" }} 
                align="end"
                direction={{ base: "column", md: "row" }}
                gap={6}
                w="full"
              >
                <Box position="relative">
                  <Avatar 
                    size="2xl" 
                    name={`${user?.firstName} ${user?.lastName}`} 
                    border="8px solid"
                    borderColor={useColorModeValue("white", "gray.950")}
                    boxShadow="2xl"
                    bg="primary.500"
                    transition="transform 0.3s"
                    _hover={{ transform: "scale(1.05)" }}
                  />
                  <IconButton
                    icon={<Edit2 size="20" variant="Bold" />}
                    position="absolute"
                    bottom="5px"
                    right="5px"
                    rounded="full"
                    colorScheme="whiteAlpha"
                    bg="white"
                    color="primary.500"
                    boxShadow="lg"
                    size="sm"
                    aria-label="Change Avatar"
                  />
                </Box>
                
                <VStack align="start" spacing={1} pb={4} flex={1}>
                  <HStack spacing={3}>
                    <Heading size="xl" fontWeight="900" letterSpacing="tight" color={headingColor}>
                      {user?.firstName} {user?.lastName}
                    </Heading>
                    {user?.kycStatus === "VERIFIED" && (
                      <Icon as={Verify} color="blue.500" variant="Bold" w={8} h={8} />
                    )}
                  </HStack>
                  <HStack spacing={2}>
                    <Icon as={Sms} size="16" color={subTextColor} />
                    <Text color={subTextColor} fontWeight="600" fontSize="lg">{user?.email}</Text>
                  </HStack>
                </VStack>

                <HStack spacing={4} pr={{ base: 4, md: 10 }} pb={4}>
                  <Button
                    leftIcon={<Edit2 variant="Bold" size="20" />}
                    rounded="2xl"
                    size="lg"
                    px={8}
                    bg={useColorModeValue("white", "whiteAlpha.200")}
                    color={useColorModeValue("primary.500", "white")}
                    boxShadow="xl"
                    onClick={() => setIsEditing(!isEditing)}
                    _hover={{ transform: "translateY(-2px)", boxShadow: "2xl" }}
                    _active={{ transform: "translateY(0)" }}
                  >
                    {isEditing ? "Cancel" : "Edit Profile"}
                  </Button>
                </HStack>
              </Flex>
            </Box>
          </MotionBox>

          <SimpleGrid columns={{ base: 1, lg: 12 }} spacing={10} w="full">
            {/* Left Sidebar: Detailed Info */}
            <Stack spacing={8} gridColumn={{ lg: "span 4" }}>
              <GlassCard>
                <VStack align="start" spacing={6}>
                  <HStack w="full" justify="space-between">
                    <Heading size="md" color={headingColor}>Personal Details</Heading>
                    <Icon as={ProfileCircle} color="primary.500" variant="Bold" size="24" />
                  </HStack>

                  <VStack align="stretch" w="full" spacing={6}>
                    <AnimatePresence mode="wait">
                      <MotionBox
                        key={isEditing ? "editing" : "viewing"}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Stack spacing={5}>
                          <FormControl>
                            <FormLabel fontSize="xs" fontWeight="800" textTransform="uppercase" color="gray.400" letterSpacing="wider">First Name</FormLabel>
                            {isEditing ? (
                              <Input
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                h="55px"
                                rounded="2xl"
                                border="2px solid"
                                borderColor="blue.50"
                                _focus={{ borderColor: "primary.500", boxShadow: "none" }}
                              />
                            ) : (
                              <HStack spacing={3} p={3} bg="blue.50" rounded="2xl" w="full">
                                <Icon as={UserIcon} color="primary.500" />
                                <Text fontWeight="700" fontSize="lg">{user?.firstName}</Text>
                              </HStack>
                            )}
                          </FormControl>

                          <FormControl>
                            <FormLabel fontSize="xs" fontWeight="800" textTransform="uppercase" color="gray.400" letterSpacing="wider">Last Name</FormLabel>
                            {isEditing ? (
                              <Input
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                h="55px"
                                rounded="2xl"
                                border="2px solid"
                                borderColor="blue.50"
                                _focus={{ borderColor: "primary.500", boxShadow: "none" }}
                              />
                            ) : (
                              <HStack spacing={3} p={3} bg="blue.50" rounded="2xl" w="full">
                                <Icon as={UserIcon} color="primary.500" />
                                <Text fontWeight="700" fontSize="lg">{user?.lastName}</Text>
                              </HStack>
                            )}
                          </FormControl>

                          <FormControl>
                            <FormLabel fontSize="xs" fontWeight="800" textTransform="uppercase" color="gray.400" letterSpacing="wider">Phone Number</FormLabel>
                            {isEditing ? (
                              <Input
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                h="55px"
                                rounded="2xl"
                                border="2px solid"
                                borderColor="blue.50"
                                _focus={{ borderColor: "primary.500", boxShadow: "none" }}
                              />
                            ) : (
                              <HStack spacing={3} p={3} bg="blue.50" rounded="2xl" w="full">
                                <Icon as={Call} color="primary.500" />
                                <Text fontWeight="700" fontSize="lg">{user?.phone || "Not set"}</Text>
                              </HStack>
                            )}
                          </FormControl>
                        </Stack>
                      </MotionBox>
                    </AnimatePresence>

                    {isEditing && (
                      <Button
                        w="full"
                        size="xl"
                        h="65px"
                        bgGradient="linear(to-r, blue.500, blue.600)"
                        color="white"
                        rounded="2xl"
                        onClick={handleSave}
                        isLoading={updateMutation.isLoading}
                        _hover={{ transform: "translateY(-2px)", boxShadow: "0 10px 20px -5px rgba(49, 130, 206, 0.4)" }}
                        rightIcon={<ArrowRight variant="Bold" />}
                      >
                        Update Profile
                      </Button>
                    )}
                  </VStack>
                </VStack>
              </GlassCard>

              {/* Security Alert Card */}
              <MotionBox
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Box p={6} bg="orange.50" rounded="3xl" border="1px" borderColor="orange.100">
                  <HStack spacing={4} mb={3}>
                    <Flex bg="white" p={2} rounded="xl" boxShadow="sm">
                      <Icon as={Danger} color="orange.500" variant="Bold" size="20" />
                    </Flex>
                    <Text fontWeight="800" color="orange.900">Security Recommendation</Text>
                  </HStack>
                  <Text fontSize="sm" color="orange.700" lineHeight="tall">
                    Enable Two-Factor Authentication to add an extra layer of security to your account.
                  </Text>
                  <Button size="sm" mt={4} colorScheme="orange" variant="ghost" rounded="full">Configure Now</Button>
                </Box>
              </MotionBox>
            </Stack>

            {/* Right: Stats, KYC & Settings */}
            <Stack spacing={8} gridColumn={{ lg: "span 8" }}>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
                <GlassCard bgGradient="linear(to-br, blue.50, white)">
                  <VStack align="start" spacing={4}>
                    <Flex w="full" justify="space-between" align="center">
                      <Flex bg="blue.500" p={3} rounded="2xl" boxShadow="lg">
                        <Icon as={ShieldTick} color="white" size="28" variant="Bold" />
                      </Flex>
                      <Badge colorScheme="blue" variant="subtle" rounded="full" px={3}>Active</Badge>
                    </Flex>
                    <Box>
                      <Text fontWeight="800" color="gray.400" fontSize="sm" textTransform="uppercase">Account Level</Text>
                      <Heading size="lg" color="blue.600" mt={1}>Tier 1 Verified</Heading>
                    </Box>
                    <Divider borderColor="blue.100" />
                    <HStack w="full" justify="space-between">
                      <Text fontSize="sm" color="gray.500">Daily Limit</Text>
                      <Text fontWeight="800" color="gray.700">$5,000.00</Text>
                    </HStack>
                  </VStack>
                </GlassCard>

                <GlassCard bgGradient="linear(to-br, primary.50, white)">
                  <VStack align="start" spacing={4}>
                    <Flex w="full" justify="space-between" align="center">
                      <Flex bg="primary.500" p={3} rounded="2xl" boxShadow="lg">
                        <Icon as={Verify} color="white" size="28" variant="Bold" />
                      </Flex>
                      <Badge
                        colorScheme={user?.kycStatus === "VERIFIED" ? "green" : "orange"}
                        variant="solid"
                        rounded="full"
                        px={3}
                      >
                        {user?.kycStatus || "PENDING"}
                      </Badge>
                    </Flex>
                    <Box>
                      <Text fontWeight="800" color="gray.400" fontSize="sm" textTransform="uppercase">Identity Verification</Text>
                      <Heading size="lg" color="primary.600" mt={1}>
                        {user?.kycStatus === "VERIFIED" ? "Fully Verified" : "Review Pending"}
                      </Heading>
                    </Box>
                    {user?.kycStatus !== "VERIFIED" ? (
                      <Link href="/kyc" style={{ width: "100%" }}>
                        <Button w="full" size="md" colorScheme="primary" rounded="xl" rightIcon={<ArrowRight />}>
                          Finish KYC
                        </Button>
                      </Link>
                    ) : (
                      <Text fontSize="sm" color="primary.500" fontWeight="600">Verification complete. You have full access.</Text>
                    )}
                  </VStack>
                </GlassCard>
              </SimpleGrid>

              {/* Main Settings Panel */}
              <GlassCard p={0} overflow="hidden">
                <Box p={8} borderBottom="1px solid" borderColor={useColorModeValue("gray.100", "whiteAlpha.100")}>
                  <HStack spacing={4}>
                    <Icon as={Setting2} color="primary.500" variant="Bold" size="24" />
                    <Heading size="md" color={headingColor}>Account Settings</Heading>
                  </HStack>
                </Box>

                <VStack align="stretch" spacing={0} p={4}>
                  <SettingItem
                    icon={Lock}
                    title="Password & Security"
                    description="Change your password and manage security keys"
                    action={<Button size="sm" variant="outline" rounded="xl">Update</Button>}
                  />
                  <Divider />
                  <SettingItem
                    icon={ShieldTick}
                    title="Two-Factor Authentication"
                    description="Add an extra layer of security with mobile verification"
                    action={<Badge colorScheme="blue" rounded="full" p={1} px={3}>Recommended</Badge>}
                  />
                  <Divider />
                  <SettingItem
                    icon={Notification}
                    title="Push Notifications"
                    description="Get real-time updates on your transactions"
                    action={<Badge colorScheme="green" rounded="full" p={1} px={3}>Enabled</Badge>}
                  />
                  <Divider />
                  <SettingItem
                    icon={Trash}
                    title="Deactivate Account"
                    description="Permanently delete your account and all data"
                    titleColor="red.500"
                    action={<Button colorScheme="red" variant="ghost" size="sm" rounded="xl">Deactivate</Button>}
                  />
                </VStack>
              </GlassCard>
            </Stack>
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
}

const SettingItem = ({ icon, title, description, action, titleColor = "inherit" }) => {
  return (
    <Flex
      p={6}
      align="center"
      justify="space-between"
      transition="all 0.2s"
      rounded="2xl"
      _hover={{ bg: useColorModeValue("blue.50", "whiteAlpha.50") }}
    >
      <HStack spacing={5}>
        <Flex bg={useColorModeValue("white", "whiteAlpha.200")} p={3} rounded="2xl" boxShadow="sm" border="1px solid" borderColor={useColorModeValue("gray.100", "whiteAlpha.100")}>
          <Icon as={icon} size="22" color={titleColor === "red.500" ? "red.400" : "blue.500"} />
        </Flex>
        <VStack align="start" spacing={0}>
          <Text fontWeight="800" color={titleColor} fontSize="md">{title}</Text>
          <Text fontSize="sm" color="gray.500">{description}</Text>
        </VStack>
      </HStack>
      {action}
    </Flex>
  );
};


