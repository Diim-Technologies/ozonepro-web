import React, { useState, useRef, useContext } from "react";
import Link from "next/link";
import {
  Box,
  Flex,
  Text,
  Stack,
  HStack,
  Divider,
  Image,
  Show,
  Hide,
  Button,
  useDisclosure,
  Avatar,
} from "@chakra-ui/react";
import { TextalignJustifyleft, ProfileCircle } from "iconsax-react";
import DashboardDrawer from "../DashboardDrawer";

export default function DashboardNavbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Stack>
      <HStack
        h={{ base: "80px", lg: "70px" }}
        justifyContent="space-between"
        alignItems={{ base: "flex-end", lg: "flex-start" }}
        // px={{ base: "10px", md: "30px", lg: "70px", xl: "100px" }}
        px="30px"
        pb={5}
        pt={5}
      >
        <HStack spacing={{ base: 2, md: 2, lg: 3, xl: 8 }}>
          <Show below="md">
            <Button onClick={onOpen} border="none" variant="ghost" p={0.5}>
              <TextalignJustifyleft />
            </Button>
          </Show>

          <DashboardDrawer onClose={onClose} isOpen={isOpen} />
        </HStack>

        <Stack position="relative" direction="row" spacing={{ base: 3, md: 8 }}>
          <HStack alignItems="center">
            <ProfileCircle size="34" color="#31658C" />
          </HStack>
        </Stack>
      </HStack>
    </Stack>
  );
}
