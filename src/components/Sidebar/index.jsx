import React, { useContext } from "react";
import Link from "next/link";
import {
  VStack,
  Text,
  HStack,
  Icon,
  Flex,
  Image,
  Box,
  Divider,
} from "@chakra-ui/react";
import {
  Element3,
  User,
  Logout,
  Receipt21,
  MoneySend,
  Verify,
  People,
  ChartSquare,
} from "iconsax-react";
import { useRouter } from "next/router";
import { UserContext } from "../../contexts/UserContext";

export default function Sidebar({ onClose }) {
  const router = useRouter();
  const { user, handleUser } = useContext(UserContext);

  const handleLogout = () => {
    localStorage.removeItem("ozone_access_token");
    localStorage.removeItem("user_id");
    localStorage.removeItem("ozone_user");
    handleUser(null);
    router.push("/login");
  };

  const isAdmin = user?.role === "ADMIN";

  const userNavItems = [
    {
      label: "Dashboard",
      icon: ChartSquare,
      path: "/dashboard",
    },
    {
      label: "Transfers",
      icon: MoneySend,
      path: "/dashboard/transfers",
    },
    {
      label: "Transactions",
      icon: Receipt21,
      path: "/dashboard/history",
    },
    {
      label: "My Profile",
      icon: User,
      path: "/dashboard/profile",
    },
  ];

  const adminNavItems = [
    {
      label: "Admin Overview",
      icon: Element3,
      path: "/admin",
    },
    {
      label: "Manage Users",
      icon: People,
      path: "/admin/users",
    },
    {
      label: "All Transfers",
      icon: MoneySend,
      path: "/admin/transfers",
    },
    {
      label: "Exchange Rates",
      icon: Receipt21,
      path: "/admin/rates",
    },
    {
      label: "KYC Verifications",
      icon: Verify,
      path: "/admin/kyc",
    },
  ];

  const navItems = isAdmin ? adminNavItems : userNavItems;

  const secondaryItems = !isAdmin ? [
    {
      label: "KYC Verification",
      icon: Verify,
      path: "/kyc",
    },
  ] : [];

  const activeBg = "primary.50";
  const activeColor = "primary.500";
  const inactiveColor = "gray.500";

  const NavItem = ({ item }) => {
    const isActive = router.pathname === item.path || (item.path !== "/" && router.pathname.startsWith(item.path));
    return (
      <Link href={item.path} style={{ width: "100%" }}>
        <HStack
          w="full"
          h="54px"
          px={4}
          rounded="xl"
          bg={isActive ? activeBg : "transparent"}
          color={isActive ? activeColor : inactiveColor}
          spacing={4}
          transition="all 0.2s"
          cursor="pointer"
          _hover={{ bg: isActive ? activeBg : "gray.50", color: isActive ? activeColor : "blue.900" }}
          onClick={onClose}
        >
          <Icon as={item.icon} variant={isActive ? "Bold" : "Linear"} size="22" />
          <Text fontWeight={isActive ? "700" : "600"} fontSize="sm">
            {item.label}
          </Text>
          {isActive && (
            <Box w="6px" h="6px" rounded="full" bg="primary.500" position="absolute" right="20px" />
          )}
        </HStack>
      </Link>
    );
  };

  return (
    <VStack
      h="100vh"
      w={{ base: "full", lg: "280px" }}
      bg="white"
      borderRight="1px"
      borderColor="gray.100"
      py={10}
      px={6}
      spacing={8}
      align="stretch"
      position="sticky"
      top={0}
    >
      <Flex px={2} mb={4}>
        <Image src="/images/ozone-pro-logo.png" h="50px" />
      </Flex>

      <VStack spacing={2} align="stretch" flex={1}>
        <Text px={4} fontSize="xs" fontWeight="800" color="gray.400" textTransform="uppercase" letterSpacing="wider" mb={2}>
          {isAdmin ? "Admin Panel" : "Main Menu"}
        </Text>
        {navItems.map((item) => (
          <NavItem key={item.path} item={item} />
        ))}

        {secondaryItems.length > 0 && (
          <>
            <Box h={4} />
            <Text px={4} fontSize="xs" fontWeight="800" color="gray.400" textTransform="uppercase" letterSpacing="wider" mb={2}>
              Account
            </Text>
            {secondaryItems.map((item) => (
              <NavItem key={item.path} item={item} />
            ))}
          </>
        )}
      </VStack>

      <Box pt={8}>
        <Divider mb={8} />
        <HStack
          w="full"
          h="54px"
          px={4}
          rounded="xl"
          color="red.500"
          spacing={4}
          transition="all 0.2s"
          cursor="pointer"
          _hover={{ bg: "red.50" }}
          onClick={handleLogout}
        >
          <Icon as={Logout} size="22" />
          <Text fontWeight="700" fontSize="sm">
            Logout
          </Text>
        </HStack>
      </Box>
    </VStack>
  );
}
