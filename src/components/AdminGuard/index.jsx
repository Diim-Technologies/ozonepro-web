import React, { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { UserContext } from "../../contexts/UserContext";
import { Spinner, Flex } from "@chakra-ui/react";

export default function AdminGuard({ children }) {
  const { user } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("ozone_access_token");
    const storedUser = localStorage.getItem("ozone_user");
    
    if (!token || !storedUser) {
      router.push("/login");
      return;
    }

    const parsedUser = JSON.parse(storedUser);
    if (parsedUser.role !== "ADMIN") {
      router.push("/dashboard");
    }
  }, [user, router]);

  if (!user || user.role !== "ADMIN") {
    return (
      <Flex h="100vh" align="center" justify="center" direction="column">
        <Spinner size="xl" color="primary.500" thickness="4px" />
      </Flex>
    );
  }

  return children;
}
