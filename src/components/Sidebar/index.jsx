import React from "react";
import Link from "next/link";
import { VStack, Text, HStack, Icon, Flex, Image } from "@chakra-ui/react";
import { Category, User, Logout } from "react-iconly";
import { useRouter } from "next/router";

export default function Sidebar({ onClose }) {
  const router = useRouter();

  const handleLogout = () => {
    router.push("/");
    localStorage.removeItem("OZONE_KEY");
  };

  const routes = [
    // {
    //   id: 1,
    //   route: "Dashboard",
    //   icon: Category,
    //   url: ["/dashboard"],
    //   isVisible: true,
    // },
    // {
    //   id: 1,
    //   route: "Transaction History",
    //   icon: Category,
    //   url: ["/dashboard/history"],
    //   isVisible: true,
    // },
    {
      id: 2,
      route: "Profile",
      icon: User,
      url: ["/dashboard/profile"],
      isVisible: true,
    },
    // {
    //   id: 3,
    //   route: "Logout",
    //   icon: Logout,
    //   url: ["/dashboard/logout"],
    //   isVisible: true,
    // },
    // {
    //   id: 5,
    //   route: "Recently Viewed",
    //   icon: Eye,
    //   url: ["/dashboard/recently-viewed"],
    //   isVisible: true,
    // },
    // {
    //   id: 6,
    //   route: "Settings",
    //   icon: Setting2,
    //   url: ["/dashboard/settings"],
    //   isVisible: true,
    // },
  ];

  return (
    <VStack
      h={{ base: "70vh", lg: "100vh" }}
      w={{ base: "100%", lg: "25%", xl: "20%" }}
      position="sticky"
      top={0}
      py="40px"
      px="30px"
      gap="24px"
    >
      <Link href="/">
        <Image src="/images/ozone-pro-logo.png" h="100px" w="135px" mb="20px" />
      </Link>

      {routes.map(({ id, route, url, isVisible, icon }) => (
        <Link key={id} href={url[0]}>
          {isVisible && (
            <HStack
              h="20px"
              px="20px"
              w="214px"
              py="8px"
              justifyContent="center"
              alignItems="center"
              gap="2px"
              textColor={
                url.includes(router.pathname) ? "primary.500" : "blue.700"
              }
              onClick={onClose}
            >
              <Flex w="10%" alignItems="center">
                <Icon
                  as={icon}
                  w={5}
                  h={5}
                  color={
                    url.includes(router.pathname) ? "primary.500" : "blue.700"
                  }
                />
              </Flex>

              <Text
                fontSize="14px"
                w="90%"
                textColor={
                  url.includes(router.pathname) ? "primary.500" : "blue.900"
                }
              >
                {route}
              </Text>
            </HStack>
          )}
        </Link>
      ))}
      <HStack
        h="20px"
        px="20px"
        w="214px"
        py="8px"
        justifyContent="center"
        alignItems="center"
        gap="2px"
        cursor="pointer"
        textColor="blue.700"
        onClick={handleLogout}
      >
        <Flex w="10%" alignItems="center">
          <Icon
            as={Logout}
            w={5}
            h={5}
            transform="rotate(180deg)"
            color="blue.700"
          />
        </Flex>

        <Text color="blue.700" fontSize="14px" w="90%">
          Logout
        </Text>
      </HStack>
    </VStack>
  );
}
