import React from "react";
import {
  Box,
  Flex,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  CloseButton,
} from "@chakra-ui/react";
import { CloseCircle } from "iconsax-react";
import Sidebar from "../Sidebar";

export default function DashboardDrawer({ isOpen, onClose, btnRef }) {
  return (
    <Drawer
      isOpen={isOpen}
      placement="left"
      onClose={onClose}
      finalFocusRef={btnRef}
      size="xs"
    >
      <DrawerOverlay />

      <DrawerContent>
        <DrawerBody>
          <Flex w="full" justify="flex-end" onClick={onClose}>
            <CloseButton size="lg" textColor="#98989c" />
          </Flex>

          <Sidebar onClose={onClose} />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
