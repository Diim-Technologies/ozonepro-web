import React, { useRef } from "react";
import {
  Box,
  Flex,
  Text,
  Stack,
  HStack,
  Show,
  Hide,
  IconButton,
  useDisclosure,
  Avatar,
  VStack,
} from "@chakra-ui/react";
import { TextalignJustifyleft, ProfileCircle } from "iconsax-react";
import DashboardDrawer from "../DashboardDrawer";

export default function DashboardNavbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  return (
    <Box 
      w="full" 
      bg="white" 
      borderBottom="1px" 
      borderColor="gray.100" 
      position={{ base: "sticky", lg: "relative" }} 
      top={0} 
      zIndex={20}
    >
      <HStack
        h={{ base: "70px", lg: "80px" }}
        justifyContent="space-between"
        alignItems="center"
        px={{ base: 4, md: 8 }}
      >
        <HStack spacing={4}>
          <Show below="md">
            <IconButton
              ref={btnRef}
              onClick={onOpen}
              variant="ghost"
              icon={<TextalignJustifyleft size="24" />}
              aria-label="Open Menu"
              color="gray.600"
              _hover={{ bg: "gray.50" }}
            />
          </Show>
          
          <Hide below="md">
             <Text fontWeight="700" color="gray.400" fontSize="sm" textTransform="uppercase" letterSpacing="widest">
                Ozone Pro Dashboard
             </Text>
          </Hide>

          <DashboardDrawer onClose={onClose} isOpen={isOpen} btnRef={btnRef} />
        </HStack>

        <Stack position="relative" direction="row" spacing={{ base: 3, md: 8 }}>
          <HStack alignItems="center" spacing={4}>
            <Hide below="sm">
              <VStack align="end" spacing={0} mr={2}>
                <Text fontWeight="800" fontSize="sm" color="blue.900">User Account</Text>
                <Text fontSize="xs" color="gray.500">Premium Member</Text>
              </VStack>
            </Hide>
            <Avatar 
              size="md" 
              bg="blue.50" 
              icon={<ProfileCircle size="30" color="#31658C" variant="Bold" />} 
              cursor="pointer"
              border="2px solid"
              borderColor="blue.100"
            />
          </HStack>
        </Stack>
      </HStack>
    </Box>
  );
}
